import React, { useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useTranslation } from 'react-i18next'

import AppContext from '../../app/context'
import AuthService from '../../services/auth'

function ProfileScreen() {
  const { updateCurrentUser } = useContext(AppContext)
  const { t } = useTranslation()

  async function handleLogout() {
    const succeeded = await AuthService.signOut()
    if (succeeded) updateCurrentUser(null)
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.actions}>
        <Button
          onPress={handleLogout}
          style={styles.actionButton}
          title={t('profile.actions.logout')}
          type="outline"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  actions: {},
  actionButton: {},
})

export default ProfileScreen
