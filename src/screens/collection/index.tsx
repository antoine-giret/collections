import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Trans } from 'react-i18next'

import { Collection } from '../../models'
import CollectionService from '../../services/collection'
import Loader from '../../components/loader'
import Error from '../../components/error'

import ItemList from './components/item-list'

function CollectionScreen() {
  const [collection, setCollection] = useState<Collection | null | undefined>()
  const {
    params: { uuid },
  } = useRoute<{
    key: string
    name: string
    params: { uuid: string; title: string }
  }>()

  useEffect(() => {
    getCollection()
  }, [])

  async function getCollection() {
    setCollection(await CollectionService.getCollection(uuid))
  }

  if (collection === undefined) {
    return (
      <Loader
        text={
          <Trans i18nKey="collection.loading">
            Inventory of your collection
          </Trans>
        }
      />
    )
  }

  if (collection === null) {
    return (
      <Error
        text={<Trans i18nKey="collection.error">Inventory in progress</Trans>}
      />
    )
  }

  return <ItemList items={collection.items} />
}

export default CollectionScreen
