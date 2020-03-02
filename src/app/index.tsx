import React, { useState } from 'react'
import { AppLoading } from 'expo'

import User from '../models/user'
import FirebaseService from '../services/firebase'
import UserService from '../services/user'

import './i18n'
import AppContext, { IAppContext, INITIAL_CONTEXT } from './context'
import AppNavigator from './navigator'

export default function App() {
  const [context, setContext] = useState<IAppContext>(INITIAL_CONTEXT)
  const [isReady, setReady] = useState(false)

  function updateCurrentUser(user: User | null) {
    setContext({ ...context, user })
  }

  async function init() {
    const { auth } = FirebaseService.getInstance()
    await new Promise(resolve => {
      auth.onAuthStateChanged(() => resolve())
    })

    const [user] = await Promise.all([
      UserService.getInstance().getCurrentUser(),
    ])

    setContext({ ...context, user })
  }

  if (!isReady) {
    return (
      <AppLoading
        onError={console.warn}
        onFinish={() => setReady(true)}
        startAsync={init}
      />
    )
  }

  return (
    <AppContext.Provider value={{ ...context, updateCurrentUser }}>
      <AppNavigator />
    </AppContext.Provider>
  )
}
