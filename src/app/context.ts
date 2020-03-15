import React from 'react'

import { User } from '../models'

export interface IAppContext {
  updateCurrentUser: (user: User | null) => void
  user: User | null | undefined
}

export const INITIAL_CONTEXT: IAppContext = {
  updateCurrentUser: () => {},
  user: undefined,
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
