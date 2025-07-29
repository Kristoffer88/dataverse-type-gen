/**
 * Utility functions for TypeScript generation
 */

/**
 * Sanitize a property name to be a valid JavaScript identifier
 */
export function sanitizePropertyName(name: string): string {
  // Ensure property name is a valid JavaScript identifier
  let sanitized = name.replace(/[^a-zA-Z0-9_$]/g, '_')
  
  // Ensure it doesn't start with a number
  if (/^[0-9]/.test(sanitized)) {
    sanitized = `_${sanitized}`
  }
  
  // Handle reserved keywords by prefixing with underscore
  if (isReservedKeyword(sanitized)) {
    sanitized = `_${sanitized}`
  }
  
  return sanitized
}

/**
 * Sanitize an interface name to be a valid TypeScript interface identifier
 */
export function sanitizeInterfaceName(name: string): string {
  // Ensure interface name is a valid JavaScript identifier
  let sanitized = name.replace(/[^a-zA-Z0-9_$]/g, '_')
  
  // Ensure it doesn't start with a number
  if (/^[0-9]/.test(sanitized)) {
    sanitized = `_${sanitized}`
  }
  
  // Handle reserved keywords by capitalizing the first letter
  if (isReservedKeyword(sanitized)) {
    sanitized = sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
  }
  
  return sanitized
}

/**
 * Check if a name is a reserved keyword
 */
function isReservedKeyword(name: string): boolean {
  const reservedKeywords = [
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
    'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import',
    'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true',
    'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'implements',
    'interface', 'package', 'private', 'protected', 'public', 'abstract', 'as', 'any', 'boolean',
    'number', 'string', 'symbol', 'type', 'from', 'of', 'readonly', 'keyof', 'infer', 'never',
    'unknown', 'object', 'undefined'
  ]
  
  return reservedKeywords.includes(name.toLowerCase())
}

/**
 * Sanitize option label to be a valid identifier
 */
export function sanitizeOptionName(label: string): string {
  // Convert label to PascalCase identifier
  let sanitized = label
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]/, '_$&') // Handle leading numbers
  
  // If the sanitized name is empty (e.g., emoji-only labels), generate a fallback
  if (!sanitized || sanitized.trim() === '') {
    // Create a fallback name using the original label's character codes
    const fallback = 'Option' + Array.from(label)
      .map(char => char.charCodeAt(0))
      .join('')
    return fallback
  }
  
  return sanitized
}

/**
 * Generate option set constant name from option set name
 */
export function generateOptionSetConstantName(optionSetName: string): string {
  // Convert to PascalCase
  return optionSetName
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

/**
 * Generate option set type name from option set name
 */
export function generateOptionSetTypeName(optionSetName: string): string {
  return generateOptionSetConstantName(optionSetName)
}

/**
 * Escape string for safe inclusion in generated code
 */
export function escapeString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')
}