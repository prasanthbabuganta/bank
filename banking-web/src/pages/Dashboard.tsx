import { useEffect } from 'react'
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material'
import {
  AccountBalance as AccountIcon,
  TrendingUp as TrendingIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.account)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  const totalBalance = accounts.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.firstName}!
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Total Balance
                  </Typography>
                  <Typography variant="h5">
                    ₹{totalBalance.toLocaleString('en-IN')}
                  </Typography>
                </div>
                <AccountIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Active Accounts
                  </Typography>
                  <Typography variant="h5">{accounts.length}</Typography>
                </div>
                <TrendingIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Recent Transactions
                  </Typography>
                  <Typography variant="h5">0</Typography>
                </div>
                <ReceiptIcon color="info" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Your Accounts
        </Typography>
        {accounts.length > 0 ? (
          <Grid container spacing={2}>
            {accounts.map((account) => (
              <Grid item xs={12} md={6} key={account.id}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {account.accountType} Account
                  </Typography>
                  <Typography color="textSecondary">
                    {account.accountNumber}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    ₹{parseFloat(account.balance).toLocaleString('en-IN')}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Status: {account.status}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="textSecondary">No accounts found</Typography>
        )}
      </Paper>
    </Box>
  )
}
