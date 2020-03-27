import React, { useContext } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { ParamListBase } from '@react-navigation/routers'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'

import AppContext from '../../../app/context'
import Screens from '../../../app/screens'
import { Collection, CollectionItem } from '../../../models'
import { CollectionService } from '../../../services'

interface IProps {
  collection: Collection
  item: CollectionItem | undefined
  navigation: NavigationProp<ParamListBase>
}

function ItemFormHeaderActions({ collection, item, navigation }: IProps) {
  const { collections, updateCollections } = useContext(AppContext)
  const { t } = useTranslation()

  async function handleRemove() {
    if (!item) return

    const collectionUpdated = await CollectionService.removeCollectionItem({
      collectionUuid: collection.uuid,
      uuid: item.uuid,
    })
    if (collectionUpdated) {
      const index = collections.findIndex(({ uuid }) => uuid === collection.uuid)
      const collectionsUpdated = [...collections]
      collectionsUpdated.splice(index, 1, collectionUpdated)

      updateCollections(collectionsUpdated)
      navigation.reset({
        index: 1,
        routes: [{ name: Screens.HOME }, { name: Screens.COLLECTION, params: { collection } }],
      })
    }
  }

  function handleRemoveConfirm() {
    Alert.alert(t('collection_item.form.remove_alert.title'), '', [
      { text: t('commons.actions.cancel') },
      { text: t('commons.actions.remove'), onPress: handleRemove },
    ])
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleRemoveConfirm} style={styles.icon}>
        <Icon color="#fff" name="delete" type="material" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginRight: 16,
  },
  icon: {
    marginLeft: 16,
  },
})

export default ItemFormHeaderActions
