import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, Text, DataTable } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'

export default function AccountsScreen() {
  const dispatch = useAppDispatch()
  const { accounts, loading } = useAppSelector((state) => state.account)

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>My Accounts</Text>

      {accounts.map((account) => (
        <Card key={account.id} style={styles.card}>
          <Card.Content>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Account Number</DataTable.Cell>
                <DataTable.Cell>{account.accountNumber}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Type</DataTable.Cell>
                <DataTable.Cell>{account.accountType}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Balance</DataTable.Cell>
                <DataTable.Cell>₹{parseFloat(account.balance).toLocaleString('en-IN')}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Status</DataTable.Cell>
                <DataTable.Cell>{account.status}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>IFSC Code</DataTable.Cell>
                <DataTable.Cell>{account.ifscCode}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
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
})
