import React, { useContext } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import { Collection, CollectionItem } from '../models'
import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'
import HomeHeaderActions from '../screens/home/components/header-actions'
import CollectionScreen from '../screens/collection'
import CollectionHeaderActions from '../screens/collection/components/header-actions'
import CollectionFormScreen from '../screens/collection-form'
import ItemFormScreen from '../screens/item-form'
import ItemFormHeaderActions from '../screens/item-form/components/header-actions'
import CameraScreen from '../screens/camera'
import ProfileScreen from '../screens/profile'

import AppContext from './context'
import Screens from './screens'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const { user } = useContext(AppContext)
  const { t } = useTranslation()

  function headerProps() {
    return {
      headerBackTitle: t('commons.actions.back'),
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
                headerRight: () => <HomeHeaderActions navigation={navigation} />,
                headerTitle: t('navigator.home'),
              })}
            />
            <Stack.Screen
              component={CollectionScreen}
              name={Screens.COLLECTION}
              options={({ navigation, route: { params } }) => {
                const { collection } = params as { collection: Collection }

                return {
                  ...headerProps(),
                  headerTitle: collection.title,
                  headerRight: () => <CollectionHeaderActions collection={collection} navigation={navigation} />,
                }
              }}
            />
            <Stack.Screen
              component={CollectionFormScreen}
              name={Screens.COLLECTION_FORM}
              options={({ route: { params } }) => {
                const { collection } = params as {
                  collection: Collection | undefined
                }

                return {
                  ...headerProps(),
                  headerTitle: collection ? collection.title : t('navigator.new_collection'),
                }
              }}
            />
            <Stack.Screen
              component={ProfileScreen}
              name={Screens.PROFILE}
              options={() => ({
                ...headerProps(),
                headerTitle: `${user.username}`,
              })}
            />
            <Stack.Screen
              component={ItemFormScreen}
              name={Screens.ITEM_FORM}
              options={({ navigation, route: { params } }) => {
                const { collection, item } = params as { collection: Collection; item: CollectionItem | undefined }

                return {
                  ...headerProps(),
                  headerTitle: item ? item.title : t('navigator.new_item'),
                  headerRight: () => (
                    <ItemFormHeaderActions collection={collection} item={item} navigation={navigation} />
                  ),
                }
              }}
            />
            <Stack.Screen
              component={CameraScreen}
              name={Screens.CAMERA}
              options={() => ({
                ...headerProps(),
                headerTitle: t('navigator.new_item_camera'),
              })}
            />
          </>
        ) : (
          <Stack.Screen component={LoginScreen} name={Screens.LOGIN} options={{ headerTitle: t('navigator.login') }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
