import type { ProcessedOptionSet } from '../processors/index.js'
import type { TypeGenerationOptions } from './index.js'
import { sanitizeOptionName, generateOptionSetConstantName, generateOptionSetTypeName, escapeString } from './utils.js'

/**
 * Generate TypeScript constants for an option set
 */
export function generateOptionSetConstants(
  optionSet: ProcessedOptionSet,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  const constantName = generateOptionSetConstantName(optionSet.name)
  const typeName = generateOptionSetTypeName(optionSet.name)

  // Option set header comment
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * ${optionSet.displayName}`)
    if (optionSet.description) {
      lines.push(` * ${optionSet.description}`)
    }
    lines.push(` * LogicalName: ${optionSet.name}`)
    lines.push(` * Global: ${optionSet.isGlobal}`)
    lines.push(` * Custom: ${optionSet.isCustom}`)
    lines.push(` */`)
  }

  // Generate constant object
  lines.push(`export const ${constantName} = {`)

  // Generate options
  optionSet.options.forEach((option, index) => {
    const isLast = index === optionSet.options.length - 1
    const optionName = sanitizeOptionName(option.label)
    
    if (includeComments && option.description) {
      lines.push(`  /** ${escapeString(option.description)} */`)
    }
    
    lines.push(`  ${optionName}: { Value: ${option.value}, Label: "${escapeString(option.label)}" }${isLast ? '' : ','}`)
  })

  lines.push(`} as const;`)
  lines.push('')

  // Generate type definition
  if (includeComments) {
    lines.push(`/** ${optionSet.displayName} option values */`)
  }
  lines.push(`export type ${typeName}Value = (typeof ${constantName})[keyof typeof ${constantName}]["Value"];`)

  return lines.join('\n')
}

/**
 * Generate TypeScript file for a global option set
 */
export function generateGlobalOptionSetFile(
  optionSet: ProcessedOptionSet,
  options: TypeGenerationOptions = {}
): string {
  if (!optionSet.isGlobal) {
    throw new Error(`Option set ${optionSet.name} is not global`)
  }

  const lines: string[] = []

  // File header
  lines.push(`// Generated TypeScript definitions for global option set: ${optionSet.name}`)
  lines.push(`// Display Name: ${optionSet.displayName}`)
  lines.push(`// Global: ${optionSet.isGlobal}`)
  lines.push(`// Custom: ${optionSet.isCustom}`)
  lines.push(`// Generated: ${new Date().toISOString()}`)
  lines.push('')

  // Generate the option set constants and types
  lines.push(generateOptionSetConstants(optionSet, options))

  return lines.join('\n')
}