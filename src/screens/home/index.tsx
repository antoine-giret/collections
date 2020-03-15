import React, { useContext, useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import { Trans } from 'react-i18next'

import AppContext from '../../app/context'
import { Collection } from '../../models'
import CollectionService from '../../services/collection'
import Loader from '../../components/loader'
import Error from '../../components/error'

import CollectionList from './components/collection-list'

function HomeScreen() {
  const [collections, setCollections] = useState<
    Collection[] | null | undefined
  >()
  const { user } = useContext(AppContext)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      getCollections()
    })
  }, [])

  async function getCollections() {
    setCollections(await CollectionService.getCollections(user.uuid))
  }

  if (collections === undefined) {
    return (
      <Loader
        text={
          <Trans i18nKey="collection.list.loading">
            Inventory of your collections
          </Trans>
        }
      />
    )
  }

  if (collections === null) {
    return (
      <Error
        text={
          <Trans i18nKey="collection.list.error">Inventory in progress</Trans>
        }
      />
    )
  }

  return <CollectionList collections={collections} />
}

export default HomeScreen
