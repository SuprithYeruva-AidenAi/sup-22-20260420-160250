export class ApiError extends Error {
  public readonly productCode: string
  public readonly status: number | null
  public readonly url: string

  constructor({
    productCode,
    status,
    url,
    message,
  }: {
    productCode: string
    status: number | null
    url: string
    message: string
  }) {
    super(message)
    this.name = 'ApiError'
    this.productCode = productCode
    this.status = status
    this.url = url
  }
}
