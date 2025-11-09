import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { register } from '../store/slices/authSlice'

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  })
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auth)

  const handleRegister = async () => {
    await dispatch(register(formData))
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Create Account</Text>

      <TextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        label="Address"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        mode="outlined"
        style={styles.input}
        multiline
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Register
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Login' as never)}
      >
        Already have an account? Login
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
})
