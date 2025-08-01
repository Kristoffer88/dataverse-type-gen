import { Project, ScriptTarget, ModuleKind } from 'ts-morph'
import { generateImports } from '../generators/index.js'
import type { GeneratedCode } from '../generators/index.js'

/**
 * Combine generated code parts into final content
 */
export function combineGeneratedCode(code: GeneratedCode): string {
  const parts: string[] = []

  // Add imports
  if (code.imports.length > 0) {
    parts.push(generateImports(code.imports))
  }

  // Add constants (option sets)
  if (code.constants.trim()) {
    parts.push(code.constants)
    parts.push('')
  }

  // Add interfaces
  if (code.interfaces.trim()) {
    parts.push(code.interfaces)
    parts.push('')
  }

  // Add utility types
  if (code.types.trim()) {
    parts.push(code.types)
    parts.push('')
  }

  // Add metadata
  if (code.metadata?.trim()) {
    parts.push(code.metadata)
    parts.push('')
  }

  // Add validation
  if (code.validation?.trim()) {
    parts.push(code.validation)
  }

  return parts.join('\n').trim() + '\n'
}

// Track formatting progress globally
let formattingProgress = { 
  current: 0, 
  total: 0, 
  onProgress: null as ((current: number, total: number, item?: string) => void) | null 
}

/**
 * Format TypeScript code using ts-morph for proper TypeScript formatting
 */
export async function formatCode(code: string, showProgress: boolean = false): Promise<string> {
  try {
    // Track formatting progress if requested - only update every 50 files to avoid spam
    if (showProgress && formattingProgress.onProgress) {
      formattingProgress.current++
      // Only update progress every 50 files or on the last file
      if (formattingProgress.current % 50 === 0 || formattingProgress.current === formattingProgress.total) {
        formattingProgress.onProgress(formattingProgress.current, formattingProgress.total, 'formatting')
      }
    }

    // Create a temporary ts-morph project for formatting
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ScriptTarget.ES2020,
        module: ModuleKind.ES2020,
        declaration: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        skipLibCheck: true
      }
    })

    // Create a temporary source file with the code
    const sourceFile = project.createSourceFile('temp.ts', code)
    
    // Format the code using ts-morph's formatting capabilities
    sourceFile.formatText({
      ensureNewLineAtEndOfFile: true,
      insertSpaceAfterCommaDelimiter: true,
      insertSpaceAfterSemicolonInForStatements: true,
      insertSpaceBeforeAndAfterBinaryOperators: true,
      insertSpaceAfterConstructor: false,
      insertSpaceAfterKeywordsInControlFlowStatements: true,
      insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
      insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
      insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
      insertSpaceBeforeFunctionParenthesis: false,
      placeOpenBraceOnNewLineForFunctions: false,
      placeOpenBraceOnNewLineForControlBlocks: false,
      insertSpaceBeforeTypeAnnotation: false,
      insertSpaceAfterTypeAssertion: true
    })

    // Get the formatted text
    const formattedCode = sourceFile.getFullText()
    
    // Clean up the project
    project.removeSourceFile(sourceFile)

    return formattedCode
  } catch (error) {
    // Fallback to basic formatting if ts-morph formatting fails
    console.warn('ts-morph formatting failed, falling back to basic formatting:', error)
    return code
      .replace(/\n\n\n+/g, '\n\n') // Remove excessive newlines
      .replace(/^\s*\n/gm, '\n') // Remove empty lines with whitespace
      .replace(/\s+$/gm, '') // Remove trailing whitespace
      .trim() + '\n'
  }
}

/**
 * Initialize formatting progress tracking
 */
export function initializeFormattingProgress(totalFiles: number, onProgress?: (current: number, total: number, item?: string) => void): void {
  formattingProgress = { current: 0, total: totalFiles, onProgress: onProgress || null }
}

/**
 * Complete formatting progress tracking
 */
export function completeFormattingProgress(): void {
  formattingProgress.onProgress = null
}

/**
 * Validate generated TypeScript code using ts-morph compiler integration
 */
export async function validateGeneratedCode(
  filePath: string
): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }> {
  try {
    const { promises: fs } = await import('fs')
    const content = await fs.readFile(filePath, 'utf8')
    const errors: string[] = []
    const warnings: string[] = []

    // Basic content validation
    if (!content.trim()) {
      errors.push('File is empty')
      return { isValid: false, errors, warnings }
    }

    // Use ts-morph for comprehensive TypeScript validation
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ScriptTarget.ES2020,
        module: ModuleKind.ES2020,
        declaration: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        skipLibCheck: true,
        noUnusedLocals: false, // Don't warn about unused variables in generated code
        noUnusedParameters: false,
        noResolve: true, // Don't try to resolve imports - we're just validating syntax
        moduleResolution: undefined // Skip module resolution
      }
    })

    try {
      // Create source file and get diagnostics
      const sourceFile = project.createSourceFile(filePath, content)
      
      // Get semantic and syntactic diagnostics
      const diagnostics = sourceFile.getPreEmitDiagnostics()
      
      for (const diagnostic of diagnostics) {
        const message = diagnostic.getMessageText()
        const messageText = typeof message === 'string' ? message : message.getMessageText()
        const line = diagnostic.getLineNumber()
        const formattedMessage = line ? `Line ${line}: ${messageText}` : messageText

        // Skip module resolution errors in generated code
        if (messageText.includes("Cannot find module") || 
            messageText.includes("Module resolution") ||
            messageText.includes("moduleResolution")) {
          continue
        }

        // Categorize by severity
        const category = diagnostic.getCategory()
        if (category === 1) { // Error
          errors.push(formattedMessage)
        } else if (category === 0) { // Warning
          warnings.push(formattedMessage)
        }
      }

      // Additional validation checks
      const exports = sourceFile.getExportedDeclarations()
      if (exports.size === 0) {
        warnings.push('No exports found - file may not be usable as a module')
      }

      // Check for common issues in generated code
      const text = sourceFile.getFullText()
      if (text.includes('undefined')) {
        warnings.push('Contains "undefined" - may indicate incomplete generation')
      }

      project.removeSourceFile(sourceFile)
    } catch (compilerError) {
      errors.push(`TypeScript compilation error: ${compilerError instanceof Error ? compilerError.message : String(compilerError)}`)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }

  } catch (error) {
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : String(error)],
      warnings: []
    }
  }
}