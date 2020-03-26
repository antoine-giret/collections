import { firestore } from 'firebase/app'

export interface IFirebaseUser {
  email: string
  username: string
}

export interface IFirebaseCollectionItem {
  title: string
  imageUrl?: string
  createdAt: firestore.Timestamp
  [key: string]: any
}

export interface IFirebaseMusicItem extends IFirebaseCollectionItem {
  artist: string
}

export interface IFirebaseBookItem extends IFirebaseCollectionItem {
  author: string
}

type TFirebaseCollectionItem =
  | IFirebaseCollectionItem
  | IFirebaseMusicItem
  | IFirebaseBookItem

export interface IFirebaseCollection {
  owner: string
  title: string
  type: string
  items?: { [uuid: string]: TFirebaseCollectionItem }
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export interface IFirebaseCreateCollection {
  title: string
  type: string
}

export interface IFirebaseUpdateCollection {
  uuid: string
  title: string
}

export interface IFirebaseCreateCollectionItem {
  collectionUuid: string
  title: string
  imageUrl: string | null
  [key: string]: any
}

export interface IFirebaseUpdateCollectionItem {
  uuid: string
  collectionUuid: string
  title?: string
  imageUrl?: string | null
  [key: string]: any
}
