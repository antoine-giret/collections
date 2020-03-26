import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Trans } from 'react-i18next'

import AppContext from '../../app/context'
import Screens from '../../app/screens'
import { Collection, CollectionItem } from '../../models'
import Loader from '../../components/loader'
import Error from '../../components/error'
import Fab from '../../components/fab'

import ItemList from './components/item-list'

function CollectionScreen() {
  const [collection, setCollection] = useState<Collection | null | undefined>()
  const { navigate } = useNavigation()
  const { params } = useRoute<{
    key: string
    name: string
    params: { collection: Collection }
  }>()
  const { collections } = useContext(AppContext)

  useEffect(() => {
    setCollection(collections.find(({ uuid }) => uuid === params.collection.uuid) || null)
  }, [])

  function handleAddPress() {
    navigate(Screens.ITEM_FORM, { collection })
  }

  function handleItemPress(item: CollectionItem) {
    navigate(Screens.ITEM_FORM, { collection, item })
  }

  if (collection === undefined) {
    return <Loader text={<Trans i18nKey="collection.loading">Inventory of your collection</Trans>} />
  }

  if (collection === null) {
    return <Error text={<Trans i18nKey="collection.error">Inventory in progress</Trans>} />
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ItemList items={collection.items} onItemPress={handleItemPress} />
      </View>
      <Fab color="primary" containerStyle={styles.fab} icon="add" onPress={handleAddPress} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
})

export default CollectionScreen
