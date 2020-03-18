import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../../app/context'
import Screens from '../../app/screens'
import { Collection } from '../../models'

import CollectionForm from './components/form'

function NewCollectionScreen() {
  const { replace } = useNavigation()
  const { collections, updateCollections } = useContext(AppContext)

  function handleAdd(collection: Collection) {
    const { uuid, title } = collection

    updateCollections([...collections, collection])
    replace(Screens.COLLECTION, { uuid, title })
  }

  return <CollectionForm onAdd={handleAdd} />
}

export default NewCollectionScreen
