import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { ParamListBase } from '@react-navigation/routers'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Screens from '../../../app/screens'

interface IProps {
  navigation: NavigationProp<ParamListBase>
}

function HomeHeaderActions({ navigation }: IProps) {
  function handleProfileOpen() {
    navigation.navigate(Screens.PROFILE)
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleProfileOpen} style={styles.icon}>
        <Icon color="#fff" name="account-circle" type="material" />
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

export default HomeHeaderActions
