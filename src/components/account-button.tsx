import React from 'react'
import { Icon } from 'react-native-elements'

import Screens from '../app/screens'

interface IProps {
  navigation: any
}

function AccountButton({ navigation }: IProps) {
  return (
    <Icon
      color="#fff"
      containerStyle={{ marginHorizontal: 16 }}
      name="account-circle"
      onPress={() => navigation.navigate(Screens.PROFILE)}
      type="material"
    />
  )
}

export default AccountButton
