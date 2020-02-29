import 'expo/build/Expo.fx'
import registerRootComponent from 'expo/build/launch/registerRootComponent'
import { activateKeepAwake } from 'expo-keep-awake'
import 'react-native-gesture-handler'

import App from './src/app'

if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(App)
