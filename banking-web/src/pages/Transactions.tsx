import { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'
import { fetchTransactions } from '../store/slices/transactionSlice'

export default function Transactions() {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.account)
  const { transactions } = useAppSelector((state) => state.transaction)
  const [selectedAccount, setSelectedAccount] = useState('')

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  useEffect(() => {
    if (selectedAccount) {
      dispatch(fetchTransactions(selectedAccount))
    }
  }, [selectedAccount, dispatch])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success'
      case 'PENDING':
        return 'warning'
      case 'FAILED':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          select
          fullWidth
          label="Select Account"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.accountNumber}>
              {account.accountNumber} - {account.accountType}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      {selectedAccount && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.createdAt), 'dd MMM yyyy HH:mm')}
                  </TableCell>
                  <TableCell>{transaction.transactionReference}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.fromAccountNumber || '-'}</TableCell>
                  <TableCell>{transaction.toAccountNumber || '-'}</TableCell>
                  <TableCell>₹{parseFloat(transaction.amount).toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
