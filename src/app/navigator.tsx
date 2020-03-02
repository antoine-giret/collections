import React, { useContext } from 'react'
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'
import ProfileScreen from '../screens/profile'

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
          <>
            <Stack.Screen
              component={HomeScreen}
              name={Screens.HOME}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Icon
                    containerStyle={{ marginHorizontal: 16 }}
                    name="account-circle"
                    onPress={() => navigation.navigate(Screens.PROFILE)}
                    type="material"
                  />
                ),
                headerTitle: t('navigator.home'),
              })}
            />
            <Stack.Screen
              component={ProfileScreen}
              name={Screens.PROFILE}
              options={{ headerTitle: `${user.username}` }}
            />
          </>
        ) : (
          <Stack.Screen
            component={LoginScreen}
            name={Screens.LOGIN}
            options={{ headerTitle: t('navigator.login') }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
