import { promises as fs } from 'fs'
import { join } from 'path'
import type { CodeGenConfig } from './index.js'

/**
 * Helper function to determine if an entity is a primary entity
 */
export function isPrimaryEntity(entityLogicalName: string, primaryEntities: string[] = []): boolean {
  return primaryEntities.includes(entityLogicalName)
}

/**
 * Helper function to get the correct directory path for an entity
 */
export function getEntityDirectory(entityLogicalName: string, config: CodeGenConfig): string {
  // Check if directory organization should be enabled
  const shouldOrganizeDirectories = config.relatedEntitiesDir && 
    (config.typeGenerationOptions.nestedExpand || config.primaryEntities?.length);
  
  if (!shouldOrganizeDirectories || isPrimaryEntity(entityLogicalName, config.primaryEntities)) {
    return config.outputDir // Primary entities go in root
  }
  return join(config.outputDir, config.relatedEntitiesDir!) // Related entities go in subdirectory
}

/**
 * Create output directory structure
 */
export async function createOutputDirectory(
  outputDir: string,
  subdirectories: string[] = []
): Promise<{ created: string[]; errors: string[] }> {
  const created: string[] = []
  const errors: string[] = []

  try {
    // Create main output directory
    await fs.mkdir(outputDir, { recursive: true })
    created.push(outputDir)

    // Create subdirectories
    for (const subdir of subdirectories) {
      try {
        const subdirPath = join(outputDir, subdir)
        await fs.mkdir(subdirPath, { recursive: true })
        created.push(subdirPath)
      } catch (error) {
        errors.push(`Failed to create subdirectory ${subdir}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

  } catch (error) {
    errors.push(`Failed to create output directory ${outputDir}: ${error instanceof Error ? error.message : String(error)}`)
  }

  return { created, errors }
}

/**
 * Clean generated files
 */
export async function cleanGeneratedFiles(
  outputDir: string,
  pattern: string = '*.ts'
): Promise<{ deletedFiles: string[]; errors: string[] }> {
  const deletedFiles: string[] = []
  const errors: string[] = []

  try {
    // Read directory
    const files = await fs.readdir(outputDir)
    
    // Filter files by pattern (basic glob support)
    const targetFiles = files.filter(file => {
      if (pattern === '*.ts') {
        return file.endsWith('.ts')
      }
      if (pattern === '*.d.ts') {
        return file.endsWith('.d.ts')
      }
      return file.includes(pattern.replace('*', ''))
    })

    // Delete files
    for (const file of targetFiles) {
      try {
        const filePath = join(outputDir, file)
        await fs.unlink(filePath)
        deletedFiles.push(filePath)
      } catch (error) {
        errors.push(`Failed to delete ${file}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

  } catch (error) {
    errors.push(`Failed to read directory ${outputDir}: ${error instanceof Error ? error.message : String(error)}`)
  }

  return { deletedFiles, errors }
}

/**
 * Get statistics about generated files
 */
export async function getGeneratedFileStats(
  outputDir: string
): Promise<{
  totalFiles: number
  totalSize: number
  averageSize: number
  largestFile: { path: string; size: number } | null
  smallestFile: { path: string; size: number } | null
}> {
  try {
    const files = await fs.readdir(outputDir)
    const tsFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.d.ts'))
    
    if (tsFiles.length === 0) {
      return {
        totalFiles: 0,
        totalSize: 0,
        averageSize: 0,
        largestFile: null,
        smallestFile: null
      }
    }

    const fileStats: Array<{ path: string; size: number }> = []
    let totalSize = 0

    for (const file of tsFiles) {
      const filePath = join(outputDir, file)
      const stat = await fs.stat(filePath)
      const size = stat.size
      
      fileStats.push({ path: filePath, size })
      totalSize += size
    }

    fileStats.sort((a, b) => a.size - b.size)

    return {
      totalFiles: tsFiles.length,
      totalSize,
      averageSize: Math.round(totalSize / tsFiles.length),
      largestFile: fileStats[fileStats.length - 1] || null,
      smallestFile: fileStats[0] || null
    }

  } catch {
    return {
      totalFiles: 0,
      totalSize: 0,
      averageSize: 0,
      largestFile: null,
      smallestFile: null
    }
  }
}