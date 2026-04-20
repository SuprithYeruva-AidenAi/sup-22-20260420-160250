import apiClient from '@/api/apiClient'
import { mapPolicyResponse, type PolicyData, type ProductCode, type RawPolicyRecord } from '@/api/mappers/policyMapper'
import { ApiError } from '@/api/errors/ApiError'
import { isAxiosError } from 'axios'

const PAGE_SIZE = 4
const PAGE_NO = 1

interface FetchOrderDataResponse {
  Data?: {
    Data?: RawPolicyRecord[]
  } | null
}

export async function fetchPoliciesByProduct(productCode: ProductCode): Promise<PolicyData> {
  const url = '/api/policies/fetchOrderData'
  try {
    const response = await apiClient.post<FetchOrderDataResponse>(url, {
      ProductCode: productCode,
      PageSize: PAGE_SIZE,
      PageNo: PAGE_NO,
    })

    const rawRecords: RawPolicyRecord[] = response.data?.Data?.Data ?? []
    return mapPolicyResponse(rawRecords, productCode)
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? null
      const message =
        err.code === 'ECONNABORTED'
          ? `Request timed out for product ${productCode}`
          : err.response?.statusText ?? err.message ?? 'Unknown error'
      throw new ApiError({ productCode, status, url, message })
    }
    const message = err instanceof Error ? err.message : 'Unknown error'
    throw new ApiError({ productCode, status: null, url, message })
  }
}
