import { advancedLog } from '../error-logger.js'

/**
 * Request with retry capability
 */
interface QueuedRequest<T> {
  execute: () => Promise<void>
  resolve: (value: T) => void
  reject: (error: unknown) => void
  retryCount: number
  maxRetries: number
  priority: number
}

/**
 * Rate limit information from API response headers
 */
export interface RateLimitInfo {
  remainingRequests?: number
  remainingDuration?: number
  retryAfter?: number
}

/**
 * Concurrent request queue that respects Dataverse API limits
 * 
 * Limits (per user, per web server):
 * - 6,000 requests within 5-minute sliding window
 * - 52+ concurrent requests maximum
 * - 20 minutes combined execution time
 */
export class ConcurrentRequestQueue {
  private activeRequests = 0
  private readonly maxConcurrent: number
  private readonly queue: Array<QueuedRequest<any>> = []
  private rateLimitInfo: RateLimitInfo = {}
  private readonly requestHistory: number[] = []

  constructor(maxConcurrent = 50) {
    // Stay under the 52 concurrent request limit with some buffer
    this.maxConcurrent = Math.min(maxConcurrent, 50)
  }

  /**
   * Execute a request with automatic queuing and retry
   */
  async execute<T>(
    request: () => Promise<Response>, 
    options: {
      maxRetries?: number
      priority?: number
      url?: string
      method?: string
    } = {}
  ): Promise<T> {
    const { maxRetries = 3, priority = 0 } = options

    return new Promise<T>((resolve, reject) => {
      const queuedRequest: QueuedRequest<T> = {
        execute: async () => {
          try {
            this.activeRequests++
            this.recordRequest()
            
            const response = await request()
            this.updateRateLimitInfo(response)
            
            // Handle rate limiting
            if (response.status === 429) {
              const retryAfter = this.parseRetryAfter(response)
              if (queuedRequest.retryCount < queuedRequest.maxRetries) {
                console.warn(`Rate limited (429), retrying after ${retryAfter}ms...`)
                await this.delay(retryAfter)
                queuedRequest.retryCount++
                this.queue.unshift(queuedRequest) // Priority retry
                return
              } else {
                throw new Error(`Rate limit exceeded after ${maxRetries} retries`)
              }
            }

            if (!response.ok) {
              // Log error details for non-rate-limit errors
              if (options.url) {
                await advancedLog(response, options.url, options.method || 'GET')
              }
              throw new Error(`Request failed: ${response.status} ${response.statusText}`)
            }

            const result = await response.json() as T
            resolve(result)
          } catch (error) {
            if (queuedRequest.retryCount < queuedRequest.maxRetries && this.isRetryableError(error)) {
              console.warn(`Request failed, retrying (${queuedRequest.retryCount + 1}/${queuedRequest.maxRetries})...`, error)
              queuedRequest.retryCount++
              await this.delay(Math.pow(2, queuedRequest.retryCount) * 1000) // Exponential backoff
              this.queue.unshift(queuedRequest) // Priority retry
            } else {
              reject(error)
            }
          } finally {
            this.activeRequests--
            this.processNext()
          }
        },
        resolve,
        reject,
        retryCount: 0,
        maxRetries,
        priority
      }

      // Insert based on priority (higher priority first)
      const insertIndex = this.queue.findIndex(req => req.priority < priority)
      if (insertIndex === -1) {
        this.queue.push(queuedRequest)
      } else {
        this.queue.splice(insertIndex, 0, queuedRequest)
      }

      this.processNext()
    })
  }

  /**
   * Process the next request in the queue if capacity allows
   */
  private async processNext(): Promise<void> {
    // Check if we're hitting request rate limits
    if (this.shouldThrottle()) {
      const delay = this.calculateThrottleDelay()
      if (delay > 0) {
        setTimeout(() => this.processNext(), delay)
        return
      }
    }

    if (this.activeRequests >= this.maxConcurrent || this.queue.length === 0) {
      return
    }

    const request = this.queue.shift()
    if (request) {
      // Don't await - let it run concurrently
      request.execute().catch(error => {
        console.error('Queue request execution failed:', error)
      })
    }
  }

  /**
   * Update rate limit information from response headers
   */
  private updateRateLimitInfo(response: Response): void {
    const remainingRequests = response.headers.get('x-ms-ratelimit-burst-remaining-xrm-requests')
    const remainingDuration = response.headers.get('x-ms-ratelimit-time-remaining-xrm-requests')
    const retryAfter = response.headers.get('Retry-After')

    if (remainingRequests) {
      this.rateLimitInfo.remainingRequests = parseInt(remainingRequests, 10)
    }
    if (remainingDuration) {
      this.rateLimitInfo.remainingDuration = parseInt(remainingDuration, 10)
    }
    if (retryAfter) {
      this.rateLimitInfo.retryAfter = parseInt(retryAfter, 10)
    }
  }

  /**
   * Parse Retry-After header value
   */
  private parseRetryAfter(response: Response): number {
    const retryAfter = response.headers.get('Retry-After')
    if (!retryAfter) return 1000 // Default 1 second

    const seconds = parseInt(retryAfter, 10)
    return isNaN(seconds) ? 1000 : seconds * 1000 // Convert to milliseconds
  }

  /**
   * Record request timestamp for rate limiting
   */
  private recordRequest(): void {
    const now = Date.now()
    this.requestHistory.push(now)
    
    // Clean old requests (older than 5 minutes)
    const fiveMinutesAgo = now - 5 * 60 * 1000
    while (this.requestHistory.length > 0 && this.requestHistory[0] < fiveMinutesAgo) {
      this.requestHistory.shift()
    }
  }

  /**
   * Check if we should throttle requests based on rate limits
   */
  private shouldThrottle(): boolean {
    // If we have explicit rate limit info, use it
    if (this.rateLimitInfo.remainingRequests !== undefined) {
      return this.rateLimitInfo.remainingRequests < 100 // Throttle when under 100 requests remaining
    }

    // Otherwise, use our request history
    const requestsInLast5Minutes = this.requestHistory.length
    return requestsInLast5Minutes > 5000 // Throttle when approaching 6000 limit
  }

  /**
   * Calculate delay for throttling
   */
  private calculateThrottleDelay(): number {
    if (this.rateLimitInfo.retryAfter) {
      return this.rateLimitInfo.retryAfter * 1000
    }

    // If we have remaining duration info, calculate based on that
    if (this.rateLimitInfo.remainingDuration && this.rateLimitInfo.remainingRequests) {
      const averageDelay = this.rateLimitInfo.remainingDuration / this.rateLimitInfo.remainingRequests
      return Math.max(averageDelay * 1000, 100) // At least 100ms between requests
    }

    // Default throttling based on request history
    const requestsInLast5Minutes = this.requestHistory.length
    if (requestsInLast5Minutes > 5000) {
      return Math.min((requestsInLast5Minutes - 5000) * 10, 5000) // Increase delay as we approach limit
    }

    return 0
  }

  /**
   * Check if an error is retryable
   */
  private isRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase()
      return message.includes('timeout') || 
             message.includes('network') || 
             message.includes('connection') ||
             message.includes('429') // Rate limit
    }
    return false
  }

  /**
   * Delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get current queue status
   */
  getStatus(): {
    activeRequests: number
    queuedRequests: number
    rateLimitInfo: RateLimitInfo
    requestsInLast5Minutes: number
  } {
    return {
      activeRequests: this.activeRequests,
      queuedRequests: this.queue.length,
      rateLimitInfo: { ...this.rateLimitInfo },
      requestsInLast5Minutes: this.requestHistory.length
    }
  }

  /**
   * Wait for all active requests to complete
   */
  async waitForCompletion(): Promise<void> {
    while (this.activeRequests > 0 || this.queue.length > 0) {
      await this.delay(100)
    }
  }
}

// Singleton instance for the entire application
export const globalRequestQueue = new ConcurrentRequestQueue()