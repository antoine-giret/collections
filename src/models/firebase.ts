import { firestore } from 'firebase/app'

export interface IFirebaseUser {
  email: string
  username: string
}

export interface IFirebaseCollectionItem {
  title: string
}

export interface IFirebaseCollection {
  title: string
  type: string
  items: IFirebaseCollectionItem[]
  updatedAt: firestore.Timestamp
}
