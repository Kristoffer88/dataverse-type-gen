import type { DataverseErrorResponse, DataverseErrorDetails } from './types.js'

export async function advancedLog(response: Response, requestUrl?: string, requestMethod?: string, requestBody?: string): Promise<DataverseErrorDetails> {
  const timestamp = new Date().toISOString()
  
  // Extract headers
  const headers: Record<string, string> = {}
  response.headers.forEach((value, key) => {
    headers[key] = value
  })
  
  // Extract request ID if available (common in Dataverse responses)
  const requestId = headers['request-id'] || headers['x-ms-request-id'] || headers['activityid']
  
  let errorDetails: DataverseErrorDetails = {
    status: response.status,
    statusText: response.statusText,
    url: requestUrl || response.url,
    method: requestMethod || 'GET',
    headers,
    timestamp,
    requestId
  }
  
  // Try to parse error response body
  try {
    // Clone the response to avoid "body already read" errors
    const responseClone = response.clone()
    const responseText = await responseClone.text()
    errorDetails.body = responseText
    
    if (responseText) {
      try {
        const errorResponse: DataverseErrorResponse = JSON.parse(responseText)
        if (errorResponse.error) {
          errorDetails.error = errorResponse.error
        }
      } catch (parseError) {
        console.warn('Failed to parse error response as JSON:', parseError)
      }
    }
  } catch (textError) {
    console.warn('Failed to read response body:', textError)
  }
  
  // Log detailed error information
  console.error('🚨 Dataverse API Error Details:')
  console.error('━'.repeat(60))
  console.error(`⏰ Timestamp: ${errorDetails.timestamp}`)
  console.error(`🌐 URL: ${errorDetails.url}`)
  console.error(`📡 Method: ${errorDetails.method}`)
  console.error(`💥 Status: ${errorDetails.status} ${errorDetails.statusText}`)
  
  if (errorDetails.requestId) {
    console.error(`🔍 Request ID: ${errorDetails.requestId}`)
  }
  
  if (errorDetails.error) {
    console.error('📋 Error Details:')
    console.error(`   Code: ${errorDetails.error.code}`)
    console.error(`   Message: ${errorDetails.error.message}`)
    
    if (errorDetails.error['@Microsoft.PowerApps.CDS.ErrorDetails.OperationStatus']) {
      console.error(`   Operation Status: ${errorDetails.error['@Microsoft.PowerApps.CDS.ErrorDetails.OperationStatus']}`)
    }
    
    if (errorDetails.error['@Microsoft.PowerApps.CDS.ErrorDetails.SubErrorCode']) {
      console.error(`   Sub Error Code: ${errorDetails.error['@Microsoft.PowerApps.CDS.ErrorDetails.SubErrorCode']}`)
    }
    
    if (errorDetails.error['@Microsoft.PowerApps.CDS.HelpLink']) {
      console.error(`   Help Link: ${errorDetails.error['@Microsoft.PowerApps.CDS.HelpLink']}`)
    }
    
    if (errorDetails.error['@Microsoft.PowerApps.CDS.TraceText']) {
      console.error(`   Trace Text:`)
      console.error(`   ${errorDetails.error['@Microsoft.PowerApps.CDS.TraceText']}`)
    }
    
    if (errorDetails.error['@Microsoft.PowerApps.CDS.InnerError.Message']) {
      console.error(`   Inner Error: ${errorDetails.error['@Microsoft.PowerApps.CDS.InnerError.Message']}`)
    }
  } else if (errorDetails.body) {
    console.error('📄 Raw Response Body:')
    console.error(errorDetails.body)
  }
  
  console.error('🗂️  Request Headers:')
  Object.entries(headers).forEach(([key, value]) => {
    // Don't log sensitive headers
    if (key.toLowerCase().includes('authorization') || key.toLowerCase().includes('cookie')) {
      console.error(`   ${key}: [REDACTED]`)
    } else {
      console.error(`   ${key}: ${value}`)
    }
  })
  
  if (requestBody) {
    console.error('📤 Request Body:')
    console.error(requestBody)
  }
  
  console.error('━'.repeat(60))
  
  return errorDetails
}

export function getErrorCodeDescription(code: string): string {
  // Common Dataverse error codes based on documentation
  const errorDescriptions: Record<string, string> = {
    '0x80040265': 'Generic custom business logic error',
    '0x80040333': 'SQL timeout expired',
    '0x80040888': 'Invalid query parameter',
    '0x8004431A': 'Cannot add or act on behalf of another user privilege',
    '0x80044150': 'Principal privilege denied',  
    '0x80040220': 'Cannot assign to disabled user',
    '0x80040225': 'Cannot assign to inactive business unit',
    '0x80040237': 'Cannot delete due to association',
    '0x80040216': 'Cannot create activity for inactive campaign',
    '0x80040274': 'Duplicate record',
    '0x80040264': 'Invalid argument',
    '0x80040217': 'Invalid operation',
    '0x80040266': 'Not supported',
    '0x80040313': 'Concurrency version mismatch',
    '0x80040201': 'Access denied',
    '0x80040277': 'Attribute permission read is missing',
    '0x80040278': 'Attribute permission update is missing during update',
    '0x80040234': 'Attribute privilege create is missing',
    '0x80040231': 'Cannot act on behalf of another user',
    '0x80040230': 'CRM security error',
    '0x80040200': 'Invalid access rights',
    '0x80040276': 'Privilege create is disabled for organization',
    '0x80040221': 'Privilege denied'
  }
  
  return errorDescriptions[code] || 'Unknown error code'
}

export function getStatusCodeDescription(status: number): string {
  const statusDescriptions: Record<number, string> = {
    400: 'Bad Request - Invalid request syntax or unsupported query parameters',
    401: 'Unauthorized - Authentication failed or insufficient permissions',
    403: 'Forbidden - Access denied or insufficient privileges',
    404: 'Not Found - Resource does not exist',
    405: 'Method Not Allowed - HTTP method not supported for this resource',
    412: 'Precondition Failed - Concurrency or duplicate record issues',
    413: 'Payload Too Large - Request size exceeds limits',
    429: 'Too Many Requests - API rate limits exceeded',
    501: 'Not Implemented - Operation not supported',
    503: 'Service Unavailable - Dataverse service temporarily unavailable'
  }
  
  return statusDescriptions[status] || 'Unknown status code'
}