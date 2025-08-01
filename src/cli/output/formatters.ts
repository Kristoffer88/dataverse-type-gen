/**
 * Simple CLI logging
 */
export class SimpleLogger {
  private verbose: boolean
  private debug: boolean
  private quiet: boolean
  private outputFormat: 'text' | 'json'
  private jsonOutput: Array<{
    level: string
    message?: string
    timestamp: string
    [key: string]: unknown
  }> = []

  constructor(options: { verbose?: boolean; debug?: boolean; quiet?: boolean; outputFormat?: 'text' | 'json' } = {}) {
    this.verbose = options.verbose || false
    this.debug = options.debug || false
    this.quiet = options.quiet || false
    this.outputFormat = options.outputFormat || 'text'
    
  }

  info(message: string): void {
    if (this.quiet && this.outputFormat === 'text') return
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'info', message, timestamp: new Date().toISOString() })
    } else {
      console.log(message)
    }
  }

  success(message: string): void {
    if (this.quiet && this.outputFormat === 'text') return
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'success', message, timestamp: new Date().toISOString() })
    } else {
      console.log(`✅ ${message}`)
    }
  }

  warning(message: string): void {
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'warning', message, timestamp: new Date().toISOString() })
    } else {
      console.log(`⚠️ ${message}`)
    }
  }

  error(message: string, actionableHint?: string): void {
    const fullMessage = actionableHint ? `${message}\n💡 ${actionableHint}` : message
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'error', message: fullMessage, timestamp: new Date().toISOString() })
    } else {
      console.error(`❌ ${fullMessage}`)
    }
  }

  debugLog(message: string): void {
    if (this.debug) {
      if (this.outputFormat === 'json') {
        this.jsonOutput.push({ level: 'debug', message, timestamp: new Date().toISOString() })
      } else {
        console.log(`🔍 ${message}`)
      }
    }
  }

  verboseDebug(message: string): void {
    if (this.verbose) {
      this.debugLog(message)
    }
  }

  getJsonOutput(): Array<{ level: string; message?: string; timestamp: string; [key: string]: unknown }> {
    return this.jsonOutput
  }

  outputJson(): void {
    if (this.outputFormat === 'json') {
      console.log(JSON.stringify(this.jsonOutput, null, 2))
    }
  }

  progress(current: number, total: number, item?: string): void {
    if (this.quiet && this.outputFormat === 'text') return
    
    const percentage = Math.round((current / total) * 100)
    const itemText = item ? ` - ${item}` : ''
    const progressBar = this.createProgressBar(percentage)
    
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({
        level: 'progress',
        current,
        total,
        percentage,
        item,
        timestamp: new Date().toISOString()
      })
    } else {
      console.log(`${progressBar} ${current}/${total} (${percentage}%)${itemText}`)
    }
  }
  
  private createProgressBar(percentage: number): string {
    const width = 20
    const filled = Math.round((percentage / 100) * width)
    const empty = width - filled
    return `[${'\u2588'.repeat(filled)}${'\u2591'.repeat(empty)}]`
  }
}