/**
 * Simple validation utilities
 */

export interface SimpleValidationResult {
  isValid: boolean
  errorMessage?: string
}

/**
 * Validate a required field
 */
export function validateRequired(value: unknown, fieldName: string): SimpleValidationResult {
  if (value === null || value === undefined || value === '') {
    return {
      isValid: false,
      errorMessage: `${fieldName} is required`
    }
  }
  
  return { isValid: true }
}

/**
 * Validate string max length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string): SimpleValidationResult {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `${fieldName} exceeds maximum length of ${maxLength}`
    }
  }
  
  return { isValid: true }
}

/**
 * Validate number range
 */
export function validateNumberRange(
  value: number, 
  min?: number, 
  max?: number, 
  fieldName: string = 'Field'
): SimpleValidationResult {
  if (min !== undefined && value < min) {
    return {
      isValid: false,
      errorMessage: `${fieldName} must be at least ${min}`
    }
  }
  
  if (max !== undefined && value > max) {
    return {
      isValid: false,
      errorMessage: `${fieldName} must not exceed ${max}`
    }
  }
  
  return { isValid: true }
}