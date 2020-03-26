import { firestore } from 'firebase'
import { generate } from 'shortid'

import {
  BookItem,
  Collection,
  CollectionItem,
  CollectionTypes,
  IFirebaseBookItem,
  IFirebaseCollection,
  IFirebaseCollectionItem,
  IFirebaseCreateCollection,
  IFirebaseCreateCollectionItem,
  IFirebaseUpdateCollection,
  IFirebaseUpdateCollectionItem,
  IFirebaseMusicItem,
  MusicItem,
} from '../models'

import FirebaseService from './firebase'

function toCollectionItem(
  uuid: string,
  type: CollectionTypes,
  item: IFirebaseCollectionItem,
) {
  const { title, imageUrl, createdAt } = item

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
  {
    title,
    type: _type,
    items: _items,
    createdAt,
    updatedAt,
  }: IFirebaseCollection,
) {
  let type = CollectionTypes.OTHER
  if (_type === 'MUSIC') type = CollectionTypes.MUSIC
  else if (_type === 'BOOK') type = CollectionTypes.BOOK

  const items = _items || {}

  return new Collection(
    uuid,
    title,
    type,
    Object.keys(items).map(itemUuid =>
      toCollectionItem(itemUuid, type, items[itemUuid]),
    ),
    createdAt.toDate(),
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

  static async createCollection(
    input: IFirebaseCreateCollection,
  ): Promise<Collection | null> {
    const {
      db,
      auth: { currentUser },
    } = FirebaseService.getInstance()

    if (!currentUser) return null

    const collectionsRef = <firestore.CollectionReference<IFirebaseCollection>>(
      db.collection('collections')
    )

    try {
      const ref = await collectionsRef.add({
        ...input,
        owner: currentUser.uid,
        items: {},
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      })
      const doc = await ref.get()

      return toCollection(doc.id, doc.data())
    } catch (err) {
      console.error(err)

      return null
    }
  }

  static async updateCollection(
    input: IFirebaseUpdateCollection,
  ): Promise<Collection | null> {
    const {
      db,
      auth: { currentUser },
    } = FirebaseService.getInstance()
    const { uuid, ...inputRest } = input

    if (!currentUser) return null

    const collectionsRef = <firestore.CollectionReference<IFirebaseCollection>>(
      db.collection('collections')
    )

    try {
      const ref = await collectionsRef.doc(uuid)

      ref.update({ ...inputRest })

      const doc = await ref.get()

      return toCollection(doc.id, doc.data())
    } catch (err) {
      console.error(err)

      return null
    }
  }

  static async addItemToCollection(
    input: IFirebaseCreateCollectionItem,
  ): Promise<Collection> {
    const { db } = FirebaseService.getInstance()
    const { collectionUuid, imageUrl: capturedImageUrl, ...inputRest } = input
    const uuid = generate()
    const now = new Date()

    let imageUrl: string | null = null
    if (capturedImageUrl) {
      imageUrl = await this.uploadCollectionItemImage(
        collectionUuid,
        uuid,
        capturedImageUrl,
      )
    }

    const collectionsRef = <firestore.CollectionReference<IFirebaseCollection>>(
      db.collection('collections')
    )

    try {
      const ref = await collectionsRef.doc(collectionUuid)

      ref.update({
        updatedAt: now,
        [`items.${uuid}`]: {
          uuid,
          imageUrl,
          createdAt: now,
          ...inputRest,
        },
      })

      const doc = await ref.get()

      return toCollection(doc.id, doc.data())
    } catch (err) {
      console.error(err)

      return null
    }
  }

  static async updateCollectionItem(
    input: IFirebaseUpdateCollectionItem,
  ): Promise<Collection> {
    const { db } = FirebaseService.getInstance()
    const {
      uuid,
      collectionUuid,
      imageUrl: capturedImageUrl,
      ...inputRest
    } = input
    const now = new Date()

    let imageUrl: string | null = null
    if (capturedImageUrl) {
      imageUrl = await this.uploadCollectionItemImage(
        collectionUuid,
        uuid,
        capturedImageUrl,
      )
    }

    const collectionsRef = <firestore.CollectionReference<IFirebaseCollection>>(
      db.collection('collections')
    )

    try {
      const ref = await collectionsRef.doc(collectionUuid)

      const currentDoc = await ref.get()
      const { items } = currentDoc.data()
      const prevData = items[uuid]

      if (!prevData) throw Error('Item not found')

      ref.update({
        updatedAt: now,
        [`items.${uuid}`]: {
          ...prevData,
          imageUrl: imageUrl || prevData.imageUrl,
          ...inputRest,
        },
      })

      const doc = await ref.get()

      return toCollection(doc.id, doc.data())
    } catch (err) {
      console.error(err)

      return null
    }
  }

  static async uploadCollectionItemImage(
    collectionUuid: string,
    itemUuid: string,
    imageUrl: string,
  ) {
    const { storage } = FirebaseService.getInstance()

    const storageRef = storage.ref()
    const pictureRef = storageRef.child(
      `collections/${collectionUuid}/${itemUuid}.${imageUrl.substr(
        imageUrl.lastIndexOf('.') + 1,
      )}`,
    )
    const blob = await (await fetch(imageUrl)).blob()
    const snapshot = await pictureRef.put(blob)

    return snapshot.ref.getDownloadURL()
  }
}

export default CollectionService
