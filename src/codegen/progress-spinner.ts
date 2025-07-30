/**
 * Simple progress spinner for code generation
 */
export class ProgressSpinner {
  private spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  private currentIndex = 0
  private interval: NodeJS.Timeout | null = null
  private message = ''

  start(message: string): void {
    this.message = message
    this.currentIndex = 0
    
    // Clear any existing interval
    if (this.interval) {
      clearInterval(this.interval)
    }

    // Show initial message
    process.stdout.write(`${this.spinnerChars[0]} ${message}`)

    // Start spinning
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.spinnerChars.length
      process.stdout.write(`\r${this.spinnerChars[this.currentIndex]} ${this.message}`)
    }, 80)
  }

  update(message: string): void {
    this.message = message
  }

  stop(finalMessage?: string): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    
    // Clear the spinner line and show final message
    process.stdout.write('\r' + ' '.repeat(this.message.length + 2) + '\r')
    if (finalMessage) {
      console.log(finalMessage)
    }
  }
}