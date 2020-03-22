import React from 'react'

import { Collection, User } from '../models'

export interface IAppContext {
  capturedPictureUrl: string | null
  collections?: Collection[] | null
  setCapturedPictureUrl: (url: string | null) => void
  updateCollections: (collections: Collection[]) => void
  updateCurrentUser: (user: User | null) => void
  user?: User | null
}

export const INITIAL_CONTEXT: IAppContext = {
  capturedPictureUrl: null,
  collections: undefined,
  setCapturedPictureUrl: () => {},
  updateCollections: () => {},
  updateCurrentUser: () => {},
  user: undefined,
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
