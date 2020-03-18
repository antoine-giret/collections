import 'expo/build/Expo.fx'
import registerRootComponent from 'expo/build/launch/registerRootComponent'
import { activateKeepAwake } from 'expo-keep-awake'
import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/en'

import App from './src/app'

if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(App)
