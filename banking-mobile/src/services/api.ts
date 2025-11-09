import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL = 'http://localhost:8080/api' // Change this for production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
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
}

export const authApi = {
  login: (data: LoginRequest) => api.post('/auth/login', data),
  register: (data: RegisterRequest) => api.post('/auth/register', data),
}

export const accountApi = {
  getAccounts: () => api.get('/accounts'),
  getAccountByNumber: (accountNumber: string) => api.get(`/accounts/${accountNumber}`),
}

export const transactionApi = {
  getTransactions: (accountNumber: string, page = 0, size = 10) =>
    api.get(`/transactions?accountNumber=${accountNumber}&page=${page}&size=${size}`),
  transfer: (data: any) => api.post('/transactions/transfer', data),
}

export default api
