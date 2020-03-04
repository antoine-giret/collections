import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import theme from '../../../../app/theme'
import Collection from '../../../../models/collection'

interface IProps {
  collection: Collection
}

function CollectionItem({
  collection: { uuid, title, icon, items, updatedAt },
}: IProps) {
  const { t } = useTranslation()

  return (
    <View style={styles.wrapper}>
      <ListItem
        chevron
        Component={TouchableHighlight}
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
        onPress={() => console.log(uuid)}
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
