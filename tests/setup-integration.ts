/**
 * Integration test setup - validates required environment variables
 * This ensures integration tests fail fast when not properly configured
 */

// Required environment variables for integration tests
// Azure Identity handles authentication automatically (Azure CLI, Managed Identity, etc.)
const REQUIRED_ENV_VARS = [
  'DATAVERSE_INSTANCE'
] as const

/**
 * Validate that all required environment variables are set
 */
export function validateIntegrationEnvironment(): void {
  const missing: string[] = []
  const values: Record<string, string> = {}
  
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = process.env[envVar]
    if (!value || value.trim() === '' || value.includes('your-') || value.includes('example.')) {
      missing.push(envVar)
    } else {
      values[envVar] = value
    }
  }
  
  if (missing.length > 0) {
    const errorMessage = [
      '❌ Integration tests require proper environment configuration',
      '',
      'Missing or invalid environment variables:',
      ...missing.map(v => `  - ${v}`),
      '',
      'Setup instructions:',
      '1. Set DATAVERSE_INSTANCE to your Dataverse environment URL',
      '2. Ensure you are authenticated with Azure CLI: `az login`',  
      '3. Or set up other Azure Identity credentials (Managed Identity, etc.)',
      '',
      'Authentication is handled automatically by Azure Identity.',
      'Integration tests MUST have real environment configuration to run.',
      'This prevents false confidence from silently skipped tests.'
    ].join('\n')
    
    throw new Error(errorMessage)
  }
  
  // Log successful configuration
  console.log('✅ Integration test environment validated')
  console.log(`   Dataverse: ${values.DATAVERSE_INSTANCE}`)
  console.log(`   Authentication: Azure Identity (automatic)`)
}

/**
 * Setup function that tests can call to ensure environment is ready
 */
export async function setupDataverse(): Promise<void> {
  // Environment is already validated when this module is imported
  // This function exists for backward compatibility with tests
  return Promise.resolve()
}

// Note: File-based cache has been removed for performance reasons
// Only in-memory cache is used during test execution

// Auto-validate when this module is imported
validateIntegrationEnvironment()