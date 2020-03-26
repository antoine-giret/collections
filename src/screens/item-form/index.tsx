import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import AppContext from '../../app/context'
import Screens from '../../app/screens'
import { Collection, CollectionItem } from '../../models'

import ItemForm from './components/form'

function ItemFormScreen() {
  const { navigate, replace } = useNavigation()
  const {
    params: { collection, item },
  } = useRoute<{
    key: string
    name: string
    params: { collection: Collection; item: CollectionItem | undefined }
  }>()
  const { collections, updateCollections } = useContext(AppContext)

  function handleCameraShowed() {
    navigate(Screens.CAMERA)
  }

  function handleSubmit(collectionUpdated: Collection) {
    const index = collections.findIndex(({ uuid }) => uuid === collectionUpdated.uuid)
    const collectionsUpdated = [...collections]
    collectionsUpdated.splice(index, 1, collectionUpdated)

    updateCollections(collectionsUpdated)
    replace(Screens.COLLECTION, { collection: collectionUpdated })
  }

  return <ItemForm collection={collection} item={item} onCameraShowed={handleCameraShowed} onSubmit={handleSubmit} />
}

export default ItemFormScreen
