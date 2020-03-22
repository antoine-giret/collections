import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'

import theme from '../app/theme'

interface IProps {
  color?: 'primary'
  containerStyle?: ViewStyle
  disabled?: boolean
  icon: string
  onPress: () => void
}

function Fab({ containerStyle, disabled, color, icon, onPress }: IProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        containerStyle,
        styles.wrapper,
        {
          backgroundColor:
            color === 'primary' ? theme.palette.primary.main : '#fff',
        },
      ]}
    >
      <View style={styles.content}>
        <Icon
          color={
            color === 'primary' ? theme.palette.primary.contrastText : '#545454'
          }
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
    borderRadius: 24,
    justifyContent: 'center',
    height: 48,
    width: 48,
  },
})

export default Fab
