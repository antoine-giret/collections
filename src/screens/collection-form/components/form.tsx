import React, { useRef, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Trans, useTranslation } from 'react-i18next'

import { Collection, CollectionTypes } from '../../../models'
import { CollectionService } from '../../../services'
import TextField from '../../../components/text-field'
import Select from '../../../components/select'
import Loader from '../../../components/loader'

interface IValues {
  title: string
  type: CollectionTypes
}

enum FormErrors {
  TITLE,
  NOT_CREATED,
  NOT_UPDATED,
}

interface IProps {
  collection: Collection | undefined
  onSubmit: (collection: Collection) => void
}

function CollectionForm({ collection, onSubmit }: IProps) {
  const [values, setValues] = useState<IValues>(() => {
    const { title, type } = collection || {
      title: '',
      type: CollectionTypes.MUSIC,
    }

    return { title, type }
  })
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({})
  const [submitting, setSubmitting] = useState(false)
  const contentRef = useRef<ScrollView | null>(null)
  const { t } = useTranslation()

  function handleTitleChange(title: string) {
    setValues({ ...values, title })
  }

  function handleTypeChange(type: CollectionTypes) {
    setValues({ ...values, type })
  }

  async function handleSubmit() {
    const { title, type } = values
    const newErrors = {}

    if (!title) newErrors[FormErrors.TITLE] = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)

    let collectionSubmitted: Collection

    if (collection) {
      collectionSubmitted = await CollectionService.updateCollection({
        uuid: collection.uuid,
        title,
      })
    } else {
      collectionSubmitted = await CollectionService.createCollection({
        title,
        type,
      })
    }

    if (collectionSubmitted) {
      onSubmit(collectionSubmitted)
    } else {
      setErrors(collection ? { [FormErrors.NOT_UPDATED]: true } : { [FormErrors.NOT_CREATED]: true })
      setSubmitting(false)
      if (contentRef.current) contentRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  if (submitting) {
    return (
      <Loader
        text={
          collection ? (
            <Trans i18nKey="collection.form.updating">Updating collection</Trans>
          ) : (
            <Trans i18nKey="collection.form.creating">Starting collection</Trans>
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
            <Trans i18nKey="collection.form.errors.not_created">Unable to start collection</Trans>
          </Text>
        )}
        {errors[FormErrors.NOT_UPDATED] && (
          <Text style={styles.error}>
            <Trans i18nKey="collection.form.errors.not_updated">Unable to update collection</Trans>
          </Text>
        )}
        <TextField
          error={errors[FormErrors.TITLE]}
          label={<Trans i18nKey="collection.form.fields.title">Title</Trans>}
          onChangeText={handleTitleChange}
          value={values.title}
        />
        {!collection && (
          <Select
            items={[CollectionTypes.MUSIC, CollectionTypes.BOOK, CollectionTypes.OTHER].map(key => ({
              key,
              label: t(`collection.types.${key.toLowerCase()}`),
            }))}
            label={<Trans i18nKey="collection.form.fields.type">Type</Trans>}
            onValueChange={handleTypeChange}
            value={values.type}
          />
        )}
      </ScrollView>
      <View style={styles.actions}>
        <Button
          onPress={handleSubmit}
          title={t(collection ? 'collection.form.actions.update' : 'collection.form.actions.add').toUpperCase()}
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
  actions: {
    flexDirection: 'column',
    padding: 16,
  },
})

export default CollectionForm
