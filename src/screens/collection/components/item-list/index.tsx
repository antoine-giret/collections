import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { CollectionItem } from '../../../../models'

import Item from './item'

interface IProps {
  items: CollectionItem[]
  onItemPress: (item: CollectionItem) => void
}

function ItemList({ items, onItemPress }: IProps) {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        {items.map(item => (
          <Item item={item} key={item.uuid} onPress={onItemPress} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default ItemList
