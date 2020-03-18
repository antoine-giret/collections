import React, { useContext } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'
import CollectionScreen from '../screens/collection'
import NewCollectionScreen from '../screens/new-collection'
import ProfileScreen from '../screens/profile'
import AccountButton from '../components/account-button'

import AppContext from './context'
import Screens from './screens'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const { user } = useContext(AppContext)
  const { t } = useTranslation()

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              component={HomeScreen}
              name={Screens.HOME}
              options={({ navigation }) => ({
                headerRight: () => <AccountButton navigation={navigation} />,
                headerTitle: t('navigator.home'),
              })}
            />
            <Stack.Screen
              component={CollectionScreen}
              name={Screens.COLLECTION}
              options={({ navigation, route: { params } }) => ({
                headerBackTitle: t('commons.actions.back'),
                headerRight: () => <AccountButton navigation={navigation} />,
                headerTitle: (params as any).title,
              })}
            />
            <Stack.Screen
              component={NewCollectionScreen}
              name={Screens.NEW_COLLECTION}
              options={({ navigation }) => ({
                headerBackTitle: t('commons.actions.back'),
                headerRight: () => <AccountButton navigation={navigation} />,
                headerTitle: t('navigator.new_collection'),
              })}
            />
            <Stack.Screen
              component={ProfileScreen}
              name={Screens.PROFILE}
              options={{
                headerBackTitle: t('commons.actions.back'),
                headerTitle: `${user.username}`,
              }}
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
