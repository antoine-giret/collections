import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Divider, SocialIcon } from 'react-native-elements'
import { Trans, useTranslation } from 'react-i18next'

import AppContext from '../../app/context'
import { AuthService } from '../../services'

function LoginScreen() {
  const [signingIn, setSigningIn] = useState(false)
  const { updateCurrentUser } = useContext(AppContext)
  const { t } = useTranslation()

  async function handleGoogleSignIn() {
    setSigningIn(true)

    const user = await AuthService.signInWithGoogle()

    updateCurrentUser(user)
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.baseline}>
        <Trans i18nKey="login.baseline">Each collection begins with a collector</Trans>
      </Text>
      <Divider style={styles.divider} />
      <SocialIcon
        button
        disabled={signingIn}
        onPress={handleGoogleSignIn}
        style={styles.socialButton}
        title={t('login.actions.sign_in_with_google')}
        type="google"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  baseline: {
    color: '#fff',
    fontSize: 48,
  },
  divider: {
    marginVertical: 24,
  },
  socialButton: {
    alignSelf: 'stretch',
  },
})

export default LoginScreen
