/**
 * Error Detail
 * @description Error details are specific details about the error,
 * usually used for validation errors
 */
export interface ErrorDetail {
  Field: string
  Message: string
}

/**
 * Roboflow Error
 * @description Roboflow errors are structured errors from our backend API
 * with specific error codes and details for client-side handling
 */
export class RoboflowError extends Error {
  status: number
  errorCode: string
  details?: ErrorDetail[]

  constructor(message: string, status: number, errorCode: string, details?: ErrorDetail[]) {
    super(message)
    this.status = status
    this.errorCode = errorCode
    this.details = details
  }
}

/**
 * HTTP Error
 * @description HTTP errors are unexpected errors like network issues or
 * server errors (500+) that don't follow the Raybot error structure
 */
export class HTTPError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
