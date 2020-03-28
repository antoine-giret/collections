import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Trans } from 'react-i18next'
import { Divider } from 'react-native-elements'

import { CollectionItem } from '../../../../models'

import Item from './item'
import CollectionItemListActions, { OrderBy } from './actions'

interface IProps {
  items: CollectionItem[]
  onItemPress: (item: CollectionItem) => void
}

function ItemList({ items, onItemPress }: IProps) {
  const [sortedItems, sortItems] = useState<CollectionItem[]>([])
  const [orderBy, setOrderBy] = useState(OrderBy.TITLE)

  useEffect(() => {
    if (orderBy === OrderBy.CREATED_AT) {
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (orderBy === OrderBy.TITLE) {
      items.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    }

    sortItems([...items])
  }, [orderBy])

  if (sortedItems.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          <Trans i18nKey="collection.empty_state">Click below to start your collection</Trans>
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.wrapper}>
      <CollectionItemListActions onSortChange={setOrderBy} />
      <Divider style={styles.divider} />
      <View style={styles.container}>
        {sortedItems.map(item => (
          <Item item={item} key={item.uuid} onPress={onItemPress} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  emptyStateText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  wrapper: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  divider: {
    backgroundColor: '#212121',
    marginVertical: 16,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default ItemList
