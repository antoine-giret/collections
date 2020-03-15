import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { Collection } from '../../../../models'

import CollectionItem from './item'

interface IProps {
  collections: Collection[]
}

function CollectionList({ collections }: IProps) {
  return (
    <ScrollView style={styles.wrapper}>
      {collections.map(collection => (
        <CollectionItem collection={collection} key={collection.uuid} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
})

export default CollectionList
