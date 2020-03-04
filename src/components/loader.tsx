import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

interface IProps {
  text: React.ReactNode
}

function Loader({ text }: IProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
      <ActivityIndicator size="large" style={styles.indicator} />
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
  },
  indicator: {
    marginTop: 16,
  },
})

export default Loader
