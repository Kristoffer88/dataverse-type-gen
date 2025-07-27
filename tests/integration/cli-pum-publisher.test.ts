/**
 * End-to-end CLI test for generating all PUM publisher entities
 * Tests the built CLI executable with real Dataverse data
 */

import { describe, test, expect, beforeAll } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import '../setup-integration.js'

describe('CLI End-to-End: PUM Publisher Generation', () => {
  const outputDir = './test-output/pum-publisher'
  const cliPath = './dist/cli/index.cjs'

  beforeAll(() => {
    // Ensure CLI is built
    if (!existsSync(cliPath)) {
      throw new Error('CLI not built. Run `pnpm build` first.')
    }
  })

  test('should generate TypeScript definitions for all PUM publisher entities using built CLI', async () => {
    console.log('🚀 Testing CLI with PUM publisher entities...')
    
    // Run the CLI command to generate types for PUM publisher
    const command = `node ${cliPath} generate --publisher pum --output-dir ${outputDir} --debug`
    
    console.log(`Executing: ${command}`)
    
    let output: string
    try {
      output = execSync(command, { 
        encoding: 'utf8',
        cwd: process.cwd(),
        env: {
          ...process.env,
          // Ensure environment is loaded
          NODE_ENV: 'test'
        }
      })
    } catch (error: any) {
      console.error('CLI execution failed:', error.stdout || error.message)
      throw error
    }

    console.log('CLI Output:', output)

    // Verify the output directory was created
    expect(existsSync(outputDir)).toBe(true)

    // Get list of generated files
    const generatedFiles = readdirSync(outputDir).filter(file => file.endsWith('.ts'))
    console.log(`📁 Generated ${generatedFiles.length} TypeScript files:`)
    
    generatedFiles.forEach(file => {
      console.log(`   - ${file}`)
    })

    // Verify we have generated files
    expect(generatedFiles.length).toBeGreaterThan(0)

    // Test a few specific files that should exist for PUM entities
    const expectedPumEntities = [
      'pum_initiative.ts',
      'pum_program.ts', 
      'pum_project.ts'
    ]

    const foundExpectedEntities = expectedPumEntities.filter(entity => 
      generatedFiles.includes(entity)
    )

    console.log(`✅ Found ${foundExpectedEntities.length}/${expectedPumEntities.length} expected PUM entities:`)
    foundExpectedEntities.forEach(entity => {
      console.log(`   ✓ ${entity}`)
    })

    // At least some expected entities should be found
    expect(foundExpectedEntities.length).toBeGreaterThan(0)

    // Validate the content of one generated file
    if (generatedFiles.length > 0) {
      const sampleFile = generatedFiles[0]
      const samplePath = join(outputDir, sampleFile)
      const content = readFileSync(samplePath, 'utf8')
      
      console.log(`📄 Validating content of ${sampleFile}:`)
      
      // Basic TypeScript file validation
      expect(content).toContain('export interface')
      expect(content).toContain('export const')
      expect(content).toMatch(/Generated: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)
      
      // Should contain entity name in PascalCase
      const entityName = sampleFile.replace('.ts', '').split('_')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
      
      expect(content).toContain(entityName)
      
      console.log(`   ✓ Valid TypeScript interface structure`)
      console.log(`   ✓ Contains entity name: ${entityName}`)
      console.log(`   ✓ Has generation timestamp`)
      
      // Log first few lines for inspection
      const lines = content.split('\n').slice(0, 10)
      console.log(`   📝 First 10 lines:`)
      lines.forEach((line, index) => {
        console.log(`      ${index + 1}: ${line}`)
      })
    }

    // Check total size of generated files
    const totalSize = generatedFiles.reduce((sum, file) => {
      const filePath = join(outputDir, file)
      return sum + statSync(filePath).size
    }, 0)

    console.log(`📊 Generation Summary:`)
    console.log(`   Files generated: ${generatedFiles.length}`)
    console.log(`   Total size: ${(totalSize / 1024).toFixed(2)} KB`)
    console.log(`   Average file size: ${(totalSize / generatedFiles.length / 1024).toFixed(2)} KB`)

    // Verify reasonable file sizes (each should be at least 1KB, not empty)
    generatedFiles.forEach(file => {
      const filePath = join(outputDir, file)
      const size = statSync(filePath).size
      expect(size).toBeGreaterThan(1000) // At least 1KB per file
    })

    console.log('✅ All validations passed!')
  }, 60000) // 60 second timeout for this comprehensive test

  test('should handle CLI errors gracefully', async () => {
    console.log('🧪 Testing CLI error handling...')
    
    // Test with invalid publisher
    const command = `node ${cliPath} generate --publisher nonexistent_publisher_12345 --output-dir ./test-output/error-test`
    
    try {
      execSync(command, { 
        encoding: 'utf8',
        stdio: 'pipe' // Capture output
      })
      // If we get here, the command unexpectedly succeeded
      expect.fail('Expected CLI to fail with non-existent publisher')
    } catch (error: any) {
      // Verify it's the expected error type
      expect(error.status).toBeGreaterThan(0)
      console.log('✅ CLI properly handled invalid publisher error')
    }
  })

  test('should display help information', () => {
    console.log('📖 Testing CLI help...')
    
    const output = execSync(`node ${cliPath} --help`, { encoding: 'utf8' })
    
    expect(output).toContain('dataverse-type-gen')
    expect(output).toContain('generate')
    expect(output).toContain('--publisher')
    expect(output).toContain('--entities')
    
    console.log('✅ CLI help information displayed correctly')
  })
})