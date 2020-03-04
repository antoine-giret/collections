import React, { useContext, useEffect, useState } from 'react'
import {
  InteractionManager,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { Trans, useTranslation } from 'react-i18next'
import moment from 'moment'

import theme from '../../app/theme'
import AppContext from '../../app/context'
import Collection from '../../models/collection'
import CollectionService from '../../services/collection'
import Loader from '../../components/loader'
import Error from '../../components/error'

function HomeScreen() {
  const [collections, setCollections] = useState<
    Collection[] | null | undefined
  >()
  const { user } = useContext(AppContext)
  const { t } = useTranslation()

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      getCollections()
    })
  }, [])

  async function getCollections() {
    setCollections(await CollectionService.getCollections(user.uuid))
  }

  if (collections === undefined) {
    return (
      <Loader
        text={
          <Trans i18nKey="collection.list.loading">
            Inventory of your collections
          </Trans>
        }
      />
    )
  }

  if (collections === null) {
    return (
      <Error
        text={
          <Trans i18nKey="collection.list.error">Inventory in progress</Trans>
        }
      />
    )
  }

  return (
    <ScrollView style={styles.wrapper}>
      {collections.map(({ uuid, title, icon, items, updatedAt }) => (
        <View key={uuid} style={styles.itemWrapper}>
          <ListItem
            chevron
            Component={TouchableHighlight}
            containerStyle={styles.item}
            leftIcon={
              <Avatar
                rounded
                icon={{
                  type: 'material',
                  name: icon,
                  color: theme.palette.primary.contrastText,
                }}
                overlayContainerStyle={{
                  backgroundColor: theme.palette.primary.main,
                }}
              />
            }
            onPress={() => console.log(uuid)}
            style={styles.itemOverlay}
            subtitle={`${t('collection.items_count', {
              count: items.length,
            })} | ${moment(updatedAt).fromNow()}`}
            subtitleProps={{ style: styles.itemSubtitle }}
            title={title}
          />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  itemWrapper: {
    marginBottom: 8,
  },
  itemOverlay: {
    borderRadius: 8,
  },
  item: {
    borderRadius: 8,
  },
  itemSubtitle: {
    color: '#545454',
  },
})

export default HomeScreen
