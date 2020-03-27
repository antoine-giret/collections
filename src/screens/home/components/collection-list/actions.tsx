import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-elements'
import Menu, { MenuItem } from 'react-native-material-menu'

export enum OrderBy {
  TITLE,
  CREATED_AT,
  UPDATED_AT,
}

interface IProps {
  onSortChange: (orderBy: OrderBy) => void
}

function CollectionActions({ onSortChange }: IProps) {
  const sortMenuRef = useRef<Menu>()
  const { t } = useTranslation()

  function handleSortMenuOpen() {
    if (sortMenuRef.current) sortMenuRef.current.show()
  }

  function closeSortMenu() {
    if (sortMenuRef.current) sortMenuRef.current.hide()
  }

  function handleSortChange(orderBy: OrderBy) {
    return () => {
      closeSortMenu()
      onSortChange(orderBy)
    }
  }

  const orders = [
    { key: OrderBy.TITLE, title: t('collection.orders.title') },
    { key: OrderBy.CREATED_AT, title: t('collection.orders.created_at') },
    { key: OrderBy.UPDATED_AT, title: t('collection.orders.updated_at') },
  ]

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleSortMenuOpen} style={styles.button}>
        <Icon color="#fff" name="sort-by-alpha" type="material" />
      </TouchableOpacity>
      <Menu ref={sortMenuRef}>
        {orders.map(({ key, title }) => (
          <MenuItem key={key} onPress={handleSortChange(key)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  button: {
    marginLeft: 16,
  },
})

export default CollectionActions
