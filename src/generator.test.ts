import { describe, it, expect } from 'vitest'
import { generateEntityTypeScript } from './generator.js'

// Generator tests - validates the function exists and has correct signature
// Note: Full integration tests are in the integration package since this requires real API calls

describe('generateEntityTypeScript', () => {
  it('should export the generateEntityTypeScript function', () => {
    expect(typeof generateEntityTypeScript).toBe('function')
  })

  it('should have correct function signature', () => {
    // Verify the function has the expected parameter count
    // Note: JavaScript function.length returns the number of parameters without default values
    expect(generateEntityTypeScript.length).toBe(1) // entityName parameter (options has default value)
  })

  it('should return a promise', () => {
    // Test that the function returns a promise
    // Note: This will fail in unit tests without API access, which is expected
    const result = generateEntityTypeScript('test_entity', { includeMetadata: false })
    expect(result).toBeInstanceOf(Promise)
    
    // Handle the expected failure
    result.catch(() => {
      // Expected to fail in test environment without API access
    })
  })
})