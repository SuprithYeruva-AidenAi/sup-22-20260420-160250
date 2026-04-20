import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useAuthStore } from '@/store/authStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.uoi.com.sg'

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
})

// Request interceptor: inject Bearer token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error)
)

// Shared in-flight promise for token refresh (deduped)
let refreshPromise: Promise<string> | null = null

async function acquireNewToken(): Promise<string> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const clientId = import.meta.env.VITE_API_CLIENT_ID ?? ''
    const clientSecret = import.meta.env.VITE_API_CLIENT_SECRET ?? ''
    // Acquire token from env credentials
    const resp = await axios.post<{ access_token: string }>(
      `${BASE_URL}/auth/token`,
      { client_id: clientId, client_secret: clientSecret },
      { timeout: 10_000 }
    )
    const newToken = resp.data.access_token
    useAuthStore.getState().setToken(newToken)
    return newToken
  })()
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

// Response interceptor: handle 401 with one retry
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retried?: boolean }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retried) {
      originalRequest._retried = true
      try {
        const newToken = await acquireNewToken()
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        }
        return apiClient(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
