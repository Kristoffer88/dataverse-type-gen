import { promises as fs } from 'fs'
import { join, relative } from 'path'
import type { CodeGenConfig, GeneratedFileResult } from './index.js'
import { formatCode } from './formatter.js'

/**
 * Generate barrel export index file
 */
export async function generateIndexFile(
  successfulFiles: GeneratedFileResult[],
  config: CodeGenConfig
): Promise<GeneratedFileResult> {
  try {
    const lines: string[] = []
    
    // Add file header
    lines.push('// Generated barrel exports')
    lines.push(`// Generated: ${new Date().toISOString()}`)
    lines.push(`// Files: ${successfulFiles.length}`)
    lines.push('')

    // Add exports for each successful file
    for (const file of successfulFiles) {
      // Get relative path from output directory
      const relativePath = relative(config.outputDir, file.filePath)
      const exportPath = relativePath.replace(/\.(ts|d\.ts)$/, '')
      lines.push(`export * from './${exportPath.replaceAll('\\', '/')}'`)
    }

    const content = lines.join('\n') + '\n'
    const formattedContent = config.prettier 
      ? await formatCode(content, true)
      : content

    const indexPath = join(config.outputDir, `index${config.fileExtension}`)
    
    await fs.writeFile(indexPath, formattedContent, 'utf8')

    return {
      filePath: indexPath,
      content: formattedContent,
      size: Buffer.byteLength(formattedContent, 'utf8'),
      success: true
    }

  } catch (error) {
    return {
      filePath: join(config.outputDir, `index${config.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Calculate and return final code generation results
 */
export function calculateGenerationResults(
  files: GeneratedFileResult[],
  indexFile: GeneratedFileResult | undefined,
  startTime: number
): {
  files: GeneratedFileResult[]
  indexFile?: GeneratedFileResult
  totalFiles: number
  successfulFiles: number
  failedFiles: number
  totalSize: number
  duration: number
} {
  const duration = Date.now() - startTime
  const successfulFiles = files.filter(r => r.success).length
  const failedFiles = files.length - successfulFiles
  const totalSize = files.reduce((sum, r) => sum + r.size, 0)

  return {
    files,
    indexFile,
    totalFiles: files.length,
    successfulFiles,
    failedFiles,
    totalSize,
    duration
  }
}