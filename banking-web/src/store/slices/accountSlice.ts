import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { accountApi } from '../../services/api'

interface AccountState {
  accounts: any[]
  loading: boolean
  error: string | null
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
}

export const fetchAccounts = createAsyncThunk(
  'account/fetchAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountApi.getAccounts()
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch accounts')
    }
  }
)

export const createAccount = createAsyncThunk(
  'account/createAccount',
  async (accountData: any, { rejectWithValue }) => {
    try {
      const response = await accountApi.createAccount(accountData)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create account')
    }
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false
        state.accounts = action.payload
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload)
      })
  },
})

export const { clearError } = accountSlice.actions
export default accountSlice.reducer
