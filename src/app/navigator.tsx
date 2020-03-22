import React, { useContext } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import { CollectionItem } from '../models'
import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'
import CollectionScreen from '../screens/collection'
import CollectionFormScreen from '../screens/collection-form'
import ItemFormScreen from '../screens/item-form'
import CameraScreen from '../screens/camera'
import ProfileScreen from '../screens/profile'
import AccountButton from '../components/account-button'

import AppContext from './context'
import Screens from './screens'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const { user } = useContext(AppContext)
  const { t } = useTranslation()

  // FIXME: get real type
  function headerProps(navigation: any) {
    return {
      headerBackTitle: t('commons.actions.back'),
      headerRight: () => <AccountButton navigation={navigation} />,
    }
  }

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
                ...headerProps(navigation),
                headerTitle: (params as any).title,
              })}
            />
            <Stack.Screen
              component={CollectionFormScreen}
              name={Screens.COLLECTION_FORM}
              options={({ navigation }) => ({
                ...headerProps(navigation),
                headerTitle: t('navigator.new_collection'),
              })}
            />
            <Stack.Screen
              component={ProfileScreen}
              name={Screens.PROFILE}
              options={({ navigation }) => ({
                ...headerProps(navigation),
                headerTitle: `${user.username}`,
              })}
            />
            <Stack.Screen
              component={ItemFormScreen}
              name={Screens.ITEM_FORM}
              options={({ navigation, route: { params } }) => {
                const { item } = params as { item: CollectionItem | undefined }

                return {
                  ...headerProps(navigation),
                  headerTitle: item ? item.title : t('navigator.new_item'),
                }
              }}
            />
            <Stack.Screen
              component={CameraScreen}
              name={Screens.CAMERA}
              options={({ navigation }) => ({
                ...headerProps(navigation),
                headerTitle: t('navigator.new_item_camera'),
              })}
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
