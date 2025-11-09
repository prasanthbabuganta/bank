import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  address?: string
  panNumber?: string
  aadharNumber?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
    user: any
  }
}

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),
}

export const accountApi = {
  getAccounts: () => api.get('/accounts'),
  getAccountByNumber: (accountNumber: string) => api.get(`/accounts/${accountNumber}`),
  createAccount: (data: any) => api.post('/accounts', data),
}

export const transactionApi = {
  getTransactions: (accountNumber: string, page = 0, size = 10) =>
    api.get(`/transactions?accountNumber=${accountNumber}&page=${page}&size=${size}`),
  transfer: (data: any) => api.post('/transactions/transfer', data),
}

export default api
