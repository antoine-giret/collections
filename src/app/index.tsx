import React, { useState } from 'react'
import { InteractionManager } from 'react-native'
import { AppLoading } from 'expo'

import { Collection, User } from '../models'
import { CollectionService, FirebaseService, UserService } from '../services'

import './i18n'
import AppContext, { IAppContext, INITIAL_CONTEXT } from './context'
import AppNavigator from './navigator'

export default function App() {
  const [context, setContext] = useState<IAppContext>(INITIAL_CONTEXT)
  const [isReady, setReady] = useState(false)

  function updateCurrentUser(user: User | null) {
    setContext({ ...context, user, collections: undefined })

    if (user) {
      InteractionManager.runAfterInteractions(async () => {
        const collections = await CollectionService.getCollections(user.uuid)

        setContext({ ...context, user, collections })
      })
    }
  }

  function updateCollections(collections: Collection[]) {
    setContext({ ...context, collections })
  }

  function setCapturedPictureUrl(capturedPictureUrl: string | null) {
    setContext({ ...context, capturedPictureUrl })
  }

  async function init() {
    const { auth } = FirebaseService.getInstance()
    await new Promise(resolve => {
      auth.onAuthStateChanged(() => resolve())
    })

    const user = await UserService.getInstance().getCurrentUser()

    const collections = user
      ? await CollectionService.getCollections(user.uuid)
      : undefined

    setContext({ ...context, user, collections })
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
    <AppContext.Provider
      value={{
        ...context,
        updateCurrentUser,
        updateCollections,
        setCapturedPictureUrl,
      }}
    >
      <AppNavigator />
    </AppContext.Provider>
  )
}
