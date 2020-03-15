import { firestore } from 'firebase'

import { IFirebaseUser, User } from '../models'

import FirebaseService from './firebase'

function toUser(uuid: string, { email, username }: IFirebaseUser) {
  return new User(uuid, email, username)
}

class UserService {
  private static instance: UserService

  currentUser?: User | null

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  async getCurrentUser(): Promise<User | null> {
    const {
      auth: { currentUser },
      db,
    } = FirebaseService.getInstance()

    if (!currentUser) {
      this.currentUser = null
      return null
    }

    const usersRef = <firestore.CollectionReference<IFirebaseUser>>(
      db.collection('users')
    )

    try {
      const doc = await usersRef.doc(currentUser.uid).get()
      if (!doc.exists) return null

      this.currentUser = toUser(currentUser.uid, doc.data())

      return this.currentUser
    } catch (err) {
      console.error(err)

      this.currentUser = null
      return null
    }
  }
}

export default UserService
