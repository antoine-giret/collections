import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { CollectionItem } from '../../../../models'

interface IProps {
  item: CollectionItem
}

function Item({ item: { uuid, title, description, imageUrl } }: IProps) {
  function handlePress() {
    //
  }

  return (
    <View key={uuid} style={styles.wrapper}>
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '50%',
  },
  container: {
    margin: 8,
  },
  imageWrapper: {
    marginBottom: 8,
    paddingTop: '100%',
    position: 'relative',
  },
  image: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'cover',
    right: 0,
    top: 0,
  },
  title: {
    fontSize: 16,
  },
  description: {
    color: '#545454',
  },
})

export default Item
