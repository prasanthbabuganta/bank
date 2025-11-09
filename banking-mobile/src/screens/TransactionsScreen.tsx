import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, Text, Chip, TextInput, Menu, Button } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'
import { fetchTransactions } from '../store/slices/transactionSlice'

export default function TransactionsScreen() {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.account)
  const { transactions } = useAppSelector((state) => state.transaction)
  const [selectedAccount, setSelectedAccount] = useState('')
  const [menuVisible, setMenuVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  useEffect(() => {
    if (selectedAccount) {
      dispatch(fetchTransactions(selectedAccount))
    }
  }, [selectedAccount, dispatch])

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Transactions</Text>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)}>
            {selectedAccount || 'Select Account'}
          </Button>
        }
      >
        {accounts.map((account) => (
          <Menu.Item
            key={account.id}
            onPress={() => {
              setSelectedAccount(account.accountNumber)
              setMenuVisible(false)
            }}
            title={`${account.accountNumber} - ${account.accountType}`}
          />
        ))}
      </Menu>

      {transactions.map((transaction) => (
        <Card key={transaction.id} style={styles.card}>
          <Card.Content>
            <View style={styles.row}>
              <Text variant="titleMedium">{transaction.type}</Text>
              <Chip>{transaction.status}</Chip>
            </View>
            <Text variant="bodyMedium">Ref: {transaction.transactionReference}</Text>
            <Text variant="headlineSmall" style={styles.amount}>
              ₹{parseFloat(transaction.amount).toLocaleString('en-IN')}
            </Text>
            <Text variant="bodySmall">
              {new Date(transaction.createdAt).toLocaleString()}
            </Text>
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
  title: {
    marginVertical: 20,
  },
  card: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  amount: {
    color: '#1976d2',
    marginVertical: 5,
  },
})
