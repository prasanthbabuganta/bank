import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts, createAccount } from '../store/slices/accountSlice'

export default function Accounts() {
  const dispatch = useAppDispatch()
  const { accounts, loading } = useAppSelector((state) => state.account)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    accountType: 'SAVINGS',
    initialDeposit: '',
    branchCode: 'BR001',
  })

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(createAccount({
      ...formData,
      initialDeposit: parseFloat(formData.initialDeposit) || 0,
    }))
    handleClose()
    dispatch(fetchAccounts())
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Accounts</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Create New Account
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>IFSC Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.accountNumber}</TableCell>
                <TableCell>{account.accountType}</TableCell>
                <TableCell>₹{parseFloat(account.balance).toLocaleString('en-IN')}</TableCell>
                <TableCell>{account.status}</TableCell>
                <TableCell>{account.ifscCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Account</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Account Type"
              value={formData.accountType}
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
              sx={{ mb: 2 }}
            >
              <MenuItem value="SAVINGS">Savings</MenuItem>
              <MenuItem value="CHECKING">Checking</MenuItem>
              <MenuItem value="CURRENT">Current</MenuItem>
              <MenuItem value="FIXED_DEPOSIT">Fixed Deposit</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Initial Deposit"
              value={formData.initialDeposit}
              onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
