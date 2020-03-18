import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'

import theme from '../app/theme'

interface IProps {
  containerStyle?: ViewStyle
  icon: string
  onPress: () => void
}

function Fab({ containerStyle, icon, onPress }: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyle, styles.wrapper]}
    >
      <View style={styles.content}>
        <Icon
          color={theme.palette.primary.contrastText}
          name={icon}
          type="material"
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
  },
  content: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 24,
    justifyContent: 'center',
    height: 48,
    width: 48,
  },
})

export default Fab
