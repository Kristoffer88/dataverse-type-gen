import { createInterface } from 'readline'
import { SimpleLogger } from '../output/formatters.js'
import { validateDataverseUrl } from '../validation/url-validator.js'

/**
 * Prompt user for input
 */
export async function promptUser(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

/**
 * Interactively prompt for Dataverse URL
 */
export async function promptForDataverseUrl(logger: SimpleLogger): Promise<string> {
  logger.info('Dataverse URL is required but not configured.')
  logger.info('You can set it via:')
  logger.info('  • Environment variable: DATAVERSE_INSTANCE=https://yourorg.crm.dynamics.com')
  logger.info('  • Command line option: --dataverse-url https://yourorg.crm.dynamics.com')
  logger.info('  • Configuration file')
  console.log()

  let url = ''
  let attempts = 0
  const maxAttempts = 3

  while (attempts < maxAttempts) {
    url = await promptUser('Please enter your Dataverse instance URL: ')
    
    if (url.toLowerCase() === 'exit' || url.toLowerCase() === 'quit') {
      logger.info('Cancelled by user')
      process.exit(0)
    }

    const validation = validateDataverseUrl(url)
    if (validation.isValid) {
      logger.success(`Valid Dataverse URL: ${url}`)
      return url
    }

    attempts++
    logger.error(`Invalid URL: ${validation.message}`)
    
    if (attempts < maxAttempts) {
      logger.info(`Please try again (${maxAttempts - attempts} attempts remaining, or type 'exit' to cancel)`)
    }
  }

  logger.error('Too many invalid attempts. Please check your Dataverse URL and try again.')
  process.exit(1)
}

/**
 * Confirm full metadata operation with user
 */
export async function confirmFullMetadata(logger: SimpleLogger): Promise<boolean> {
  logger.warning('Full metadata mode will fetch ALL entities from Dataverse (800+ entities)')
  logger.info('This operation will:')
  logger.info('  • Take several minutes to complete')
  logger.info('  • Make thousands of API requests (2,000-5,000+)')
  logger.info('  • Generate types for system and custom entities')
  logger.info('  • Only needed for complete cross-entity type safety')
  console.log()
  logger.info('Most users should use specific entities instead:')
  logger.info('  --entities account,contact,opportunity')
  logger.info('  --publisher your_prefix')
  logger.info('  --solution "Your Solution"')
  console.log()
  
  const answer = await promptUser('Continue with full metadata generation? (y/N): ')
  
  const confirmed = answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes'
  if (!confirmed) {
    logger.info('Operation cancelled. Use specific entities for faster generation.')
    return false
  }
  
  return true
}