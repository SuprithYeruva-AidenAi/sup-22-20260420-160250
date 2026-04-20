import { useQueries } from '@tanstack/react-query'
import { fetchPoliciesByProduct } from '@/services/policyService'
import { useAuthStore } from '@/store/authStore'
import type { ProductCode } from '@/api/mappers/policyMapper'

const PRODUCT_CODES: ProductCode[] = ['TR01', 'HM01', 'MO01', 'PA01']

export function useDashboardPolicies() {
  const token = useAuthStore((s) => s.token)

  const results = useQueries({
    queries: PRODUCT_CODES.map((productCode) => ({
      queryKey: ['policies', productCode] as const,
      queryFn: () => fetchPoliciesByProduct(productCode),
      enabled: !!token,
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    })),
  })

  return PRODUCT_CODES.map((code, i) => ({
    productCode: code,
    data: results[i].data,
    isLoading: results[i].isLoading,
    isError: results[i].isError,
    refetch: results[i].refetch,
  }))
}
