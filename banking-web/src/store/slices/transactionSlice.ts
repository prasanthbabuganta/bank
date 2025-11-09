import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { transactionApi } from '../../services/api'

interface TransactionState {
  transactions: any[]
  loading: boolean
  error: string | null
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
}

export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async (accountNumber: string, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getTransactions(accountNumber)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions')
    }
  }
)

export const transfer = createAsyncThunk(
  'transaction/transfer',
  async (transferData: any, { rejectWithValue }) => {
    try {
      const response = await transactionApi.transfer(transferData)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Transfer failed')
    }
  }
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload.content || []
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(transfer.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload)
      })
  },
})

export const { clearError } = transactionSlice.actions
export default transactionSlice.reducer
