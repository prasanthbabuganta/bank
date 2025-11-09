import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAppSelector } from '../hooks/redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import DashboardScreen from '../screens/DashboardScreen'
import AccountsScreen from '../screens/AccountsScreen'
import TransactionsScreen from '../screens/TransactionsScreen'
import TransferScreen from '../screens/TransferScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'dashboard'
          if (route.name === 'Dashboard') iconName = 'dashboard'
          else if (route.name === 'Accounts') iconName = 'account-balance'
          else if (route.name === 'Transfer') iconName = 'swap-horiz'
          else if (route.name === 'Transactions') iconName = 'receipt'
          return <Icon name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Accounts" component={AccountsScreen} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  const { token } = useAppSelector((state) => state.auth)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainTabs} />
      )}
    </Stack.Navigator>
  )
}
