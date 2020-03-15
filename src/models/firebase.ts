import { firestore } from 'firebase/app'

export interface IFirebaseUser {
  email: string
  username: string
}

export interface IFirebaseCollectionItem {
  uuid: string
  title: string
  imageUrl?: string
  createdAt: firestore.Timestamp
}

export interface IFirebaseMusicItem extends IFirebaseCollectionItem {
  artist: string
}

export interface IFirebaseBookItem extends IFirebaseCollectionItem {
  author: string
}

export interface IFirebaseCollection {
  title: string
  type: string
  items?: (IFirebaseCollectionItem | IFirebaseMusicItem | IFirebaseBookItem)[]
  updatedAt: firestore.Timestamp
}
