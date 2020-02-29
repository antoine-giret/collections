import React from 'react'

interface IAppContext {
  user: null
}

const context: IAppContext = {
  user: null,
}

const AppContext = React.createContext(context)

export default AppContext
