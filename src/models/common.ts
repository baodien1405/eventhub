export interface SuccessResponse<Data> {
  statusCode: number
  message: string
  metadata: Data
  status?: 'success' | 'error'
}

export interface ErrorResponse<Data> {
  status: string
  message: string
  statusCode: number
  metadata?: Data
}
