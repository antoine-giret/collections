import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-elements'

import Screens from '../../../../app/screens'
import { Collection } from '../../../../models'
import Fab from '../../../../components/fab'

import CollectionActions, { OrderBy } from './actions'
import CollectionItem from './item'

interface IProps {
  collections: Collection[]
}

function CollectionList({ collections }: IProps) {
  const [sortedCollections, sortCollections] = useState<Collection[]>([])
  const [orderBy, setOrderBy] = useState(OrderBy.UPDATED_AT)
  const { navigate } = useNavigation()

  useEffect(() => {
    if (orderBy === OrderBy.UPDATED_AT) {
      collections.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    } else if (orderBy === OrderBy.CREATED_AT) {
      collections.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (orderBy === OrderBy.TITLE) {
      collections.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    }

    sortCollections([...collections])
  }, [orderBy])

  function handleAddPress() {
    navigate(Screens.COLLECTION_FORM)
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <CollectionActions onSortChange={setOrderBy} />
          <Divider style={styles.divider} />
          {sortedCollections.map(collection => (
            <CollectionItem collection={collection} key={collection.uuid} />
          ))}
        </ScrollView>
        <Fab color="primary" containerStyle={styles.fab} icon="add" onPress={handleAddPress} />
      </View>
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
  content: {
    paddingBottom: 80,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  divider: {
    backgroundColor: '#212121',
    marginVertical: 16,
  },
  fab: {
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
})

export default CollectionList
