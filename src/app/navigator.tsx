import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'

import AppContext from './context'
import Screens from './screens'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const { user } = useContext(AppContext)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            component={HomeScreen}
            name={Screens.HOME}
            options={{ title: 'Collections' }}
          />
        ) : (
          <Stack.Screen
            component={LoginScreen}
            name={Screens.LOGIN}
            options={{ title: 'Login' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
