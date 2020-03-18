import React from 'react'

import { Collection, User } from '../models'

export interface IAppContext {
  collections?: Collection[] | null
  updateCollections: (collections: Collection[]) => void
  updateCurrentUser: (user: User | null) => void
  user?: User | null
}

export const INITIAL_CONTEXT: IAppContext = {
  collections: undefined,
  updateCollections: () => {},
  updateCurrentUser: () => {},
  user: undefined,
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
