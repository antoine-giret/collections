import { firestore } from 'firebase'

import {
  BookItem,
  Collection,
  CollectionItem,
  CollectionTypes,
  IFirebaseBookItem,
  IFirebaseCollection,
  IFirebaseCollectionItem,
  IFirebaseMusicItem,
  MusicItem,
} from '../models'

import FirebaseService from './firebase'

function toCollectionItem(
  type: CollectionTypes,
  item: IFirebaseCollectionItem | IFirebaseMusicItem | IFirebaseBookItem,
) {
  const { uuid, title, imageUrl, createdAt } = item

  if (type === CollectionTypes.MUSIC) {
    const { artist } = item as IFirebaseMusicItem

    return new MusicItem(uuid, title, artist, imageUrl, createdAt.toDate())
  }

  if (type === CollectionTypes.BOOK) {
    const { author } = item as IFirebaseBookItem

    return new BookItem(uuid, title, author, imageUrl, createdAt.toDate())
  }

  return new CollectionItem(uuid, title, imageUrl, createdAt.toDate())
}

function toCollection(
  uuid: string,
  { title, type: _type, items: _items, updatedAt }: IFirebaseCollection,
) {
  let type = CollectionTypes.OTHER
  if (_type === 'MUSIC') type = CollectionTypes.MUSIC
  else if (_type === 'BOOK') type = CollectionTypes.BOOK

  return new Collection(
    uuid,
    title,
    type,
    (_items || []).map(item => toCollectionItem(type, item)),
    updatedAt.toDate(),
  )
}

class CollectionService {
  static async getCollections(userUuid: string): Promise<Collection[] | null> {
    const { db } = FirebaseService.getInstance()

    const collectionsRef = <firestore.CollectionReference<IFirebaseCollection>>(
      db.collection('collections')
    )

    try {
      const snapshot = await collectionsRef.where('owner', '==', userUuid).get()

      return snapshot.docs.map(doc => toCollection(doc.id, doc.data()))
    } catch (err) {
      console.error(err)

      return null
    }
  }

  static async getCollection(uuid: string): Promise<Collection | null> {
    const { db } = FirebaseService.getInstance()

    const collectionsRef = <firestore.CollectionReference<IFirebaseCollection>>(
      db.collection('collections')
    )

    try {
      const doc = await collectionsRef.doc(uuid).get()

      return toCollection(doc.id, doc.data())
    } catch (err) {
      console.error(err)

      return null
    }
  }
}

export default CollectionService
