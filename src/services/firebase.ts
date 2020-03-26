import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from 'react-native-dotenv'
import { app as firebaseApp, auth, firestore, initializeApp, storage } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

class FirebaseService {
  private static instance: FirebaseService

  auth: auth.Auth

  db: firestore.Firestore

  storage: storage.Storage

  constructor(private readonly app: firebaseApp.App) {
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()

    console.log('[FirebaseService] initialized')
  }

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService(
        initializeApp({
          apiKey: FIREBASE_API_KEY,
          authDomain: FIREBASE_AUTH_DOMAIN,
          databaseURL: FIREBASE_DATABASE_URL,
          projectId: FIREBASE_PROJECT_ID,
          storageBucket: FIREBASE_STORAGE_BUCKET,
          messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
          appId: FIREBASE_APP_ID,
          measurementId: FIREBASE_MEASUREMENT_ID,
        }),
      )
    }

    return FirebaseService.instance
  }
}

export default FirebaseService
