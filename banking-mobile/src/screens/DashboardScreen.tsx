import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'
import { logout } from '../store/slices/authSlice'

export default function DashboardScreen() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { accounts } = useAppSelector((state) => state.account)

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  const totalBalance = accounts.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Welcome, {user?.firstName}!</Text>
        <Button mode="text" onPress={() => dispatch(logout())}>Logout</Button>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="labelLarge">Total Balance</Text>
          <Text variant="headlineLarge" style={styles.balance}>
            ₹{totalBalance.toLocaleString('en-IN')}
          </Text>
        </Card.Content>
      </Card>

      <Text variant="titleLarge" style={styles.sectionTitle}>Your Accounts</Text>

      {accounts.map((account) => (
        <Card key={account.id} style={styles.accountCard}>
          <Card.Content>
            <Text variant="titleMedium">{account.accountType} Account</Text>
            <Text variant="bodyMedium">{account.accountNumber}</Text>
            <Text variant="headlineSmall" style={styles.accountBalance}>
              ₹{parseFloat(account.balance).toLocaleString('en-IN')}
            </Text>
            <Text variant="bodySmall">Status: {account.status}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1976d2',
  },
  balance: {
    color: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    marginVertical: 15,
  },
  accountCard: {
    marginBottom: 15,
  },
  accountBalance: {
    marginTop: 10,
    color: '#1976d2',
  },
})
