/**
 * Environment setup for tests
 * Loads .env file before running tests
 */

import { readFileSync } from 'fs'
import { join } from 'path'

// Load .env file manually since we don't want to add dotenv as a dependency
try {
  const envPath = join(process.cwd(), '.env')
  const envContent = readFileSync(envPath, 'utf8')
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=')
      const value = valueParts.join('=')
      
      // Only set if not already set (allow override)
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
  
  console.log('✅ Loaded environment variables from .env file')
} catch (error) {
  console.log('⚠️  No .env file found, using existing environment variables')
}