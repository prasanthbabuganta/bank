import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Text, SegmentedButtons } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchAccounts } from '../store/slices/accountSlice'
import { transactionApi } from '../services/api'

export default function TransferScreen() {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.account)
  const [formData, setFormData] = useState({
    fromAccountNumber: '',
    toAccountNumber: '',
    amount: '',
    type: 'TRANSFER',
    description: '',
  })

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch])

  const handleTransfer = async () => {
    try {
      await transactionApi.transfer({
        ...formData,
        amount: parseFloat(formData.amount),
      })
      alert('Transfer successful!')
    } catch (error) {
      alert('Transfer failed')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Transfer Funds</Text>

      <TextInput
        label="From Account"
        value={formData.fromAccountNumber}
        onChangeText={(text) => setFormData({ ...formData, fromAccountNumber: text })}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="To Account Number"
        value={formData.toAccountNumber}
        onChangeText={(text) => setFormData({ ...formData, toAccountNumber: text })}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Amount"
        value={formData.amount}
        onChangeText={(text) => setFormData({ ...formData, amount: text })}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        label="Description (Optional)"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        mode="outlined"
        style={styles.input}
        multiline
      />

      <Button
        mode="contained"
        onPress={handleTransfer}
        style={styles.button}
      >
        Transfer Now
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
})
