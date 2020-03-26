import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import AppContext from '../../app/context'
import Screens from '../../app/screens'
import { Collection } from '../../models'

import CollectionForm from './components/form'

function CollectionFormScreen() {
  const { replace, reset } = useNavigation()
  const {
    params: { collection },
  } = useRoute<{
    key: string
    name: string
    params: { collection: Collection | undefined }
  }>()
  const { collections, updateCollections } = useContext(AppContext)

  function handleSubmit(collectionSubmitted: Collection) {
    if (collection) {
      const index = collections.findIndex(
        ({ uuid }) => uuid === collectionSubmitted.uuid,
      )
      const collectionsUpdated = [...collections]
      collectionsUpdated.splice(index, 1, collectionSubmitted)

      updateCollections(collectionsUpdated)
      reset({
        index: 1,
        routes: [
          { name: Screens.HOME },
          {
            name: Screens.COLLECTION,
            params: { collection: collectionSubmitted },
          },
        ],
      })
    } else {
      updateCollections([...collections, collectionSubmitted])
      replace(Screens.COLLECTION, { collection: collectionSubmitted })
    }
  }

  return <CollectionForm collection={collection} onSubmit={handleSubmit} />
}

export default CollectionFormScreen
