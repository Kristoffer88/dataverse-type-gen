#!/usr/bin/env node

/**
 * Dedicated CLI entry point
 * This file is ONLY for CLI execution and is never imported as a module
 */

import { setupCLI } from '../cli/index.js'

// Always run the CLI when this file is executed
const program = setupCLI()
program.parse()