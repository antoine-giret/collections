import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

interface IProps {
  text: React.ReactNode
}

function Error({ text }: IProps) {
  return (
    <View style={styles.wrapper}>
      <Icon
        color="#555"
        name="sentiment-very-dissatisfied"
        size={72}
        type="material"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  text: {
    color: '#333',
    fontSize: 24,
    fontWeight: '300',
    marginTop: 16,
  },
})

export default Error
