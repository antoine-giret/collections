import React, { useContext, useEffect, useRef, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { Trans, useTranslation } from 'react-i18next'

import AppContext from '../../../app/context'
import { CollectionService } from '../../../services'
import { BoardGameItem, BookItem, Collection, CollectionItem, CollectionTypes, MusicItem } from '../../../models'
import TextField from '../../../components/text-field'
import Loader from '../../../components/loader'

export interface IValues {
  title: string

  artist?: string

  author?: string

  editor?: string
  minPlayers?: number
  maxPlayers?: number
  duration?: number
}

enum FormErrors {
  TITLE,
  ARTIST,
  AUTHOR,
  EDITOR,
  MIN_PLAYERS,
  MAX_PLAYERS,
  NOT_CREATED,
  NOT_UPDATED,
}

interface IProps {
  collection: Collection
  item: CollectionItem | undefined
  onCameraShowed: () => void
  onSubmit: (collectionUpdated: Collection) => void
}

function ItemForm({
  collection: { uuid: collectionUuid, type: collectionType },
  item,
  onCameraShowed,
  onSubmit,
}: IProps) {
  const [values, setValues] = useState<IValues>(() => {
    const { title } = item || { title: '' }
    const commonValues: IValues = { title }

    if (collectionType === CollectionTypes.MUSIC) {
      const { artist } = (item as MusicItem) || { artist: '' }

      return { ...commonValues, artist }
    }

    if (collectionType === CollectionTypes.BOOK) {
      const { author } = (item as BookItem) || { author: '' }

      return { ...commonValues, author }
    }

    if (collectionType === CollectionTypes.BOARD_GAME) {
      const { editor, minPlayers, maxPlayers, duration } = (item as BoardGameItem) || {
        editor: '',
        minPlayers: 2,
        maxPlayers: 4,
        duration: 1800,
      }

      return { ...commonValues, editor, minPlayers, maxPlayers, duration }
    }

    return commonValues
  })
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({})
  const [submitting, setSubmitting] = useState(false)
  const contentRef = useRef<ScrollView | null>(null)
  const { capturedPictureUrl, setCapturedPictureUrl } = useContext(AppContext)
  const { t } = useTranslation()

  useEffect(() => {
    return () => setCapturedPictureUrl(null)
  }, [])

  function handleChange(key: string) {
    return (value: string) => setValues({ ...values, [key]: value })
  }

  async function handleSubmit() {
    const { title } = values
    const newErrors = {}

    if (!title) newErrors[FormErrors.TITLE] = true

    if (collectionType === CollectionTypes.MUSIC) {
      const { artist } = values

      if (!artist) newErrors[FormErrors.ARTIST] = true
    }

    if (collectionType === CollectionTypes.BOOK) {
      const { author } = values

      if (!author) newErrors[FormErrors.AUTHOR] = true
    }

    if (collectionType === CollectionTypes.BOARD_GAME) {
      const { editor, minPlayers, maxPlayers } = values

      if (!editor) newErrors[FormErrors.EDITOR] = true
      if (!Number.isInteger(minPlayers)) newErrors[FormErrors.MIN_PLAYERS] = true
      if (!Number.isInteger(maxPlayers)) newErrors[FormErrors.MAX_PLAYERS] = true
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)

    let collectionUpdated: Collection

    if (item) {
      collectionUpdated = await CollectionService.updateCollectionItem({
        uuid: item.uuid,
        collectionUuid,
        imageUrl: capturedPictureUrl,
        ...values,
      })
    } else {
      collectionUpdated = await CollectionService.addItemToCollection({
        collectionUuid,
        imageUrl: capturedPictureUrl || null,
        ...values,
      })
    }

    if (collectionUpdated) {
      onSubmit(collectionUpdated)
    } else {
      setErrors(item ? { [FormErrors.NOT_CREATED]: true } : { [FormErrors.NOT_CREATED]: true })
      setSubmitting(false)
      if (contentRef.current) contentRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  if (submitting) {
    return (
      <Loader
        text={
          item ? (
            <Trans i18nKey="collection_item.form.updating">Updating item</Trans>
          ) : (
            <Trans i18nKey="collection_item.form.creating">Adding item</Trans>
          )
        }
      />
    )
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView ref={contentRef} style={styles.content}>
        {errors[FormErrors.NOT_CREATED] && (
          <Text style={styles.error}>
            <Trans i18nKey="collection_item.form.errors.not_created">Unable to add item</Trans>
          </Text>
        )}
        {errors[FormErrors.NOT_UPDATED] && (
          <Text style={styles.error}>
            <Trans i18nKey="collection_item.form.errors.not_updated">Unable to update item</Trans>
          </Text>
        )}
        <TextField
          error={errors[FormErrors.TITLE]}
          label={<Trans i18nKey="collection_item.form.fields.title">Title</Trans>}
          onChangeText={handleChange('title')}
          value={values.title}
        />
        {collectionType === CollectionTypes.MUSIC && (
          <TextField
            error={errors[FormErrors.ARTIST]}
            label={<Trans i18nKey="collection_item.form.fields.artist">Artist</Trans>}
            onChangeText={handleChange('artist')}
            value={values.artist}
          />
        )}
        {collectionType === CollectionTypes.BOOK && (
          <TextField
            error={errors[FormErrors.AUTHOR]}
            label={<Trans i18nKey="collection_item.form.fields.author">Author</Trans>}
            onChangeText={handleChange('author')}
            value={values.author}
          />
        )}
        {collectionType === CollectionTypes.BOARD_GAME && (
          <>
            <TextField
              error={errors[FormErrors.EDITOR]}
              label={<Trans i18nKey="collection_item.form.fields.editor">Editor</Trans>}
              onChangeText={handleChange('editor')}
              value={values.editor}
            />
            <TextField
              error={errors[FormErrors.MIN_PLAYERS]}
              keyboardType="numeric"
              label={<Trans i18nKey="collection_item.form.fields.min_players">Players min.</Trans>}
              onChangeText={handleChange('minPlayers')}
              value={values.minPlayers.toString()}
            />
            <TextField
              error={errors[FormErrors.MAX_PLAYERS]}
              keyboardType="numeric"
              label={<Trans i18nKey="collection_item.form.fields.max_players">Players max.</Trans>}
              onChangeText={handleChange('maxPlayers')}
              value={values.maxPlayers.toString()}
            />
          </>
        )}
        <View style={styles.imageWrapper}>
          <Text style={styles.label}>
            <Trans i18nKey="collection_item.form.fields.photo">Photo</Trans>
          </Text>
          <TouchableOpacity onPress={onCameraShowed} style={styles.newImageButton}>
            {capturedPictureUrl || item ? (
              <Image
                resizeMode="cover"
                source={{ uri: capturedPictureUrl || item.imageUrl }}
                style={styles.picturePreview}
              />
            ) : (
              <Icon color="#ccc" name="add" size={96} type="material" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <Button
          onPress={handleSubmit}
          title={t(item ? 'collection_item.form.actions.update' : 'collection_item.form.actions.add').toUpperCase()}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  error: {
    color: '#f44336',
    marginBottom: 16,
  },
  imageWrapper: {
    marginTop: 16,
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
  },
  newImageButton: {
    backgroundColor: '#212121',
    borderRadius: 4,
    height: 150,
    justifyContent: 'center',
    width: 150,
  },
  picturePreview: {
    flex: 1,
    width: '100%',
  },
  actions: {
    flexDirection: 'column',
    padding: 16,
  },
})

export default ItemForm
