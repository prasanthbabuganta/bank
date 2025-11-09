import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'
import { transfer } from '../store/slices/transactionSlice'

export default function Transfer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { accounts } = useAppSelector((state) => state.account)
  const { error } = useAppSelector((state) => state.transaction)

  const [formData, setFormData] = useState({
    fromAccountNumber: '',
    toAccountNumber: '',
    amount: '',
    type: 'TRANSFER',
    description: '',
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(transfer({
      ...formData,
      amount: parseFloat(formData.amount),
    }))
    if (transfer.fulfilled.match(result)) {
      setSuccess(true)
      setTimeout(() => navigate('/transactions'), 2000)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transfer Funds
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Transfer successful! Redirecting...
          </Alert>
        )}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            required
            label="From Account"
            value={formData.fromAccountNumber}
            onChange={(e) => setFormData({ ...formData, fromAccountNumber: e.target.value })}
            sx={{ mb: 2 }}
          >
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.accountNumber}>
                {account.accountNumber} - ₹{parseFloat(account.balance).toLocaleString('en-IN')}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            required
            label="To Account Number"
            value={formData.toAccountNumber}
            onChange={(e) => setFormData({ ...formData, toAccountNumber: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            type="number"
            label="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            required
            label="Transfer Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="TRANSFER">Internal Transfer</MenuItem>
            <MenuItem value="NEFT">NEFT</MenuItem>
            <MenuItem value="RTGS">RTGS</MenuItem>
            <MenuItem value="IMPS">IMPS</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth size="large">
            Transfer Now
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
