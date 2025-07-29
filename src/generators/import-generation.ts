/**
 * Generate imports for the generated code
 */
export function generateImports(requiredImports: string[]): string {
  if (requiredImports.length === 0) return ''
  
  const lines: string[] = []
  lines.push(`// Required imports`)
  
  for (const importStatement of requiredImports) {
    lines.push(importStatement)
  }
  
  lines.push('')
  
  return lines.join('\n')
}