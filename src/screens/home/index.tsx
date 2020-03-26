import React, { useContext } from 'react'
import { Trans } from 'react-i18next'

import AppContext from '../../app/context'
import Loader from '../../components/loader'
import Error from '../../components/error'

import CollectionList from './components/collection-list'

function HomeScreen() {
  const { collections } = useContext(AppContext)

  if (collections === undefined) {
    return <Loader text={<Trans i18nKey="collection.list.loading">Inventory of your collections</Trans>} />
  }

  if (collections === null) {
    return <Error text={<Trans i18nKey="collection.list.error">Inventory in progress</Trans>} />
  }

  return <CollectionList collections={collections} />
}

export default HomeScreen
