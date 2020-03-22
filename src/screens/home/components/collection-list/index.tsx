import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

import Screens from '../../../../app/screens'
import { Collection } from '../../../../models'
import Fab from '../../../../components/fab'

import CollectionItem from './item'

interface IProps {
  collections: Collection[]
}

function CollectionList({ collections }: IProps) {
  const { navigate } = useNavigation()

  function handleAddPress() {
    navigate(Screens.COLLECTION_FORM)
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          {collections.map(collection => (
            <CollectionItem collection={collection} key={collection.uuid} />
          ))}
        </ScrollView>
        <Fab
          color="primary"
          containerStyle={styles.fab}
          icon="add"
          onPress={handleAddPress}
        />
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
  fab: {
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
})

export default CollectionList
