import React, { useContext, useRef } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { ParamListBase } from '@react-navigation/routers'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Trans, useTranslation } from 'react-i18next'
import Menu, { MenuItem } from 'react-native-material-menu'

import AppContext from '../../../app/context'
import Screens from '../../../app/screens'
import { Collection } from '../../../models'
import { CollectionService } from '../../../services'

interface IProps {
  collection: Collection
  navigation: NavigationProp<ParamListBase>
}

function CollectionHeaderActions({ collection, navigation }: IProps) {
  const menuRef = useRef<Menu>()
  const { collections, updateCollections } = useContext(AppContext)
  const { t } = useTranslation()

  function handleMenuOpen() {
    if (menuRef.current) menuRef.current.show()
  }

  function closeMenu() {
    if (menuRef.current) menuRef.current.hide()
  }

  function handleEdit() {
    closeMenu()
    navigation.navigate(Screens.COLLECTION_FORM, { collection })
  }

  async function handleRemove() {
    const succeeded = await CollectionService.removeCollection(collection.uuid)
    if (succeeded) {
      const index = collections.findIndex(({ uuid }) => uuid === collection.uuid)
      const collectionsUpdated = [...collections]
      collectionsUpdated.splice(index, 1)

      updateCollections(collectionsUpdated)
      navigation.reset({
        index: 0,
        routes: [{ name: Screens.HOME }],
      })
    }
  }

  function handleRemoveConfirm() {
    closeMenu()

    Alert.alert(t('collection.remove_alert.title'), '', [
      { text: t('commons.actions.cancel') },
      { text: t('commons.actions.remove'), onPress: handleRemove },
    ])
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleMenuOpen} style={styles.icon}>
        <Icon color="#fff" name="settings" type="material" />
      </TouchableOpacity>
      <Menu ref={menuRef}>
        <MenuItem onPress={handleEdit}>
          <Trans i18nKey="commons.actions.edit">Edit</Trans>
        </MenuItem>
        <MenuItem onPress={handleRemoveConfirm}>
          <Trans i18nKey="commons.actions.remove">Remove</Trans>
        </MenuItem>
      </Menu>
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

export default CollectionHeaderActions
