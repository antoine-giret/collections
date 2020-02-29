import React from 'react'

import AppContext from './context'
import AppNavigator from './navigator'

export default function App() {
  return (
    <AppContext.Provider value={{ user: null }}>
      <AppNavigator />
    </AppContext.Provider>
  )
}
