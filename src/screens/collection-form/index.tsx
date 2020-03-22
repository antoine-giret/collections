import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../../app/context'
import Screens from '../../app/screens'
import { Collection } from '../../models'

import CollectionForm from './components/form'

function CollectionFormScreen() {
  const { replace } = useNavigation()
  const { collections, updateCollections } = useContext(AppContext)

  function handleAdd(collection: Collection) {
    updateCollections([...collections, collection])
    replace(Screens.COLLECTION, collection)
  }

  return <CollectionForm onAdd={handleAdd} />
}

export default CollectionFormScreen
