import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'

import AppContext from './context'
import Screens from './screens'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const { user } = useContext(AppContext)
  const { t } = useTranslation()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            component={HomeScreen}
            name={Screens.HOME}
            options={{ title: t('navigator.home') }}
          />
        ) : (
          <Stack.Screen
            component={LoginScreen}
            name={Screens.LOGIN}
            options={{ title: t('navigator.login') }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
