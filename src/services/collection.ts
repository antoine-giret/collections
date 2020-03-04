import { firestore } from 'firebase'

import {
  IFirebaseCollection,
  IFirebaseCollectionItem,
} from '../models/firebase'
import Collection, { CollectionTypes } from '../models/collection'
import CollectionItem from '../models/collection-item'

import FirebaseService from './firebase'

function toCollectionItem({ title }: IFirebaseCollectionItem) {
  return new CollectionItem(title)
}

function toCollection(
  uuid: string,
  { title, type: _type, items, updatedAt }: IFirebaseCollection,
) {
  let type = CollectionTypes.OTHER
  if (_type === 'MUSIC') type = CollectionTypes.MUSIC
  else if (_type === 'BOOK') type = CollectionTypes.BOOK

  return new Collection(
    uuid,
    title,
    type,
    (items || []).map(item => toCollectionItem(item)),
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
}

export default CollectionService
