import 'expo/build/Expo.fx'
import registerRootComponent from 'expo/build/launch/registerRootComponent'
import { activateKeepAwake } from 'expo-keep-awake'

import App from './src/app'

if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(App)
