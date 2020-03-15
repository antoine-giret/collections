import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import theme from '../../../../app/theme'
import { Collection } from '../../../../models'
import Screens from '../../../../app/screens'

interface IProps {
  collection: Collection
}

function CollectionItem({ collection }: IProps) {
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  function handlePress() {
    navigate(Screens.COLLECTION, { uuid, title })
  }

  const { uuid, title, icon, items, updatedAt } = collection

  return (
    <View style={styles.wrapper}>
      <ListItem
        chevron
        Component={TouchableOpacity}
        containerStyle={styles.container}
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
        onPress={handlePress}
        style={styles.overlay}
        subtitle={`${t('collection.items_count', {
          count: items.length,
        })} | ${moment(updatedAt).fromNow()}`}
        subtitleProps={{ style: styles.subtitle }}
        title={title}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  overlay: {
    borderRadius: 8,
  },
  container: {
    borderRadius: 8,
  },
  subtitle: {
    color: '#545454',
  },
})

export default CollectionItem
