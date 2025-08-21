#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { generateCommand } from './commands/generate.js'
import { initCommand } from './commands/init.js'
import { validateCommand } from './commands/validate.js'
import { cacheStatusCommand, cacheClearCommand } from './commands/cache.js'



/**
 * Main CLI setup
 */
export function setupCLI(): Command {
  const program = new Command()
  
  program
    .name('dataverse-type-gen')
    .description('Generate TypeScript types from Dataverse metadata')
    .version('1.2.0')
  
  // Generate command
  program
    .command('generate')
    .description('Generate TypeScript types from Dataverse entities')
    .option('-o, --output-dir <dir>', 'Output directory for generated files')
    .option('-e, --entities <entities>', 'Comma-separated entity logical names (e.g. account,contact,opportunity)')
    .option('-p, --publisher <prefix>', 'Publisher prefix to filter entities (naming convention based)')
    .option('-s, --solution <name>', 'Solution name to filter entities (actual solution membership)')
    .option('--dataverse-url <url>', 'Dataverse instance URL (e.g. https://yourorg.crm.dynamics.com)')
    .option('--no-hooks', 'Exclude React Query hooks generation (default behavior)')
    .option('-c, --config <path>', 'Configuration file path')
    .option('-v, --verbose', 'Verbose output')
    .option('--dry-run', 'Preview what would be generated without creating files')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen generate --entities account,contact,opportunity
  $ dataverse-type-gen generate --publisher your_prefix --dry-run
  $ dataverse-type-gen generate --solution MySolution --verbose
  $ dataverse-type-gen generate --entities account --output-dir ./src/types --verbose
  $ dataverse-type-gen generate --dataverse-url https://yourorg.crm.dynamics.com --publisher prefix
  $ dataverse-type-gen generate --solution "My Custom Solution" --no-hooks
  $ dataverse-type-gen generate --config ./custom-config.json --verbose
  $ dataverse-type-gen generate --entities pum_initiative
  $ dataverse-type-gen generate --publisher pum`)
    .action(generateCommand)
  
  // Init command
  program
    .command('init')
    .description('Initialize Dataverse type generator configuration')
    .option('-o, --output-dir <dir>', 'Output directory for generated files')
    .option('-c, --config <path>', 'Configuration file path', 'dataverse.config.json')
    .option('-v, --verbose', 'Verbose output')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen init
  $ dataverse-type-gen init --config ./my-config.json
  $ dataverse-type-gen init --output-dir ./src/generated`)
    .action(initCommand)
  
  // Validate command
  program
    .command('validate')
    .description('Validate Dataverse connection and configuration')
    .option('-c, --config <path>', 'Configuration file path')
    .option('-v, --verbose', 'Verbose output')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen validate
  $ dataverse-type-gen validate --config ./dataverse.config.json
  $ dataverse-type-gen validate --verbose`)
    .action(validateCommand)
  
  // Cache command group - internal development tool
  const cacheCommand = program
    .command('cache')
    .description('[Development] Manage in-memory cache')
  
  cacheCommand
    .command('status')
    .description('Show cache status and statistics')
    .option('-v, --verbose', 'Verbose output')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen cache status
  $ dataverse-type-gen cache status --verbose`)
    .action(cacheStatusCommand)
  
  cacheCommand
    .command('clear')
    .description('Clear in-memory cache')
    .option('-v, --verbose', 'Verbose output')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen cache clear`)
    .action(cacheClearCommand)
  
  // Info command
  program
    .command('info')
    .description('Show information about the type generator')
    .action(() => {
      console.log(chalk.blue('Dataverse Type Generator'))
      console.log('')
      console.log('[ENV] Environment Variables:')
      console.log(`   DATAVERSE_INSTANCE: ${process.env.DATAVERSE_INSTANCE || 'Not set'}`)
      console.log('')
      console.log('[DIR] Current Directory:', process.cwd())
      console.log('📦 Node Version:', process.version)
      console.log('')
      console.log('📚 For more information:')
      console.log('   - Run: dataverse-type-gen --help')
      console.log('   - Run: dataverse-type-gen init')
      console.log('   - Run: dataverse-type-gen validate')
    })
  
  return program
}

// CLI setup is now handled by src/bin/cli.ts
// This file only exports the setupCLI function for testing and reuse