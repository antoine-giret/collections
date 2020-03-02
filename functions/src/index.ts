import { auth } from 'firebase-functions'
import { firestore, initializeApp } from 'firebase-admin'

initializeApp()

// eslint-disable-next-line import/prefer-default-export
export const createUser = auth
  .user()
  .onCreate(async ({ uid, email, displayName }) => {
    await firestore()
      .collection('users')
      .doc(uid)
      .set({ email, username: displayName || '' })
  })
