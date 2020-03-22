import React, { useRef, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Trans, useTranslation } from 'react-i18next'

import { Collection, CollectionTypes } from '../../../models'
import { CollectionService } from '../../../services'
import TextField from '../../../components/text-field'
import Select from '../../../components/select'

interface IValues {
  title: string
  type: CollectionTypes
}

enum FormErrors {
  TITLE,
  NOT_CREATED,
}

const initialValues: IValues = {
  title: '',
  type: CollectionTypes.MUSIC,
}

interface IProps {
  onAdd: (collection: Collection) => void
}

function CollectionForm({ onAdd }: IProps) {
  const [values, setValues] = useState<IValues>(initialValues)
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

    const collection = await CollectionService.createCollection({ title, type })
    if (collection) {
      onAdd(collection)
    } else {
      setErrors({ [FormErrors.NOT_CREATED]: true })
      setSubmitting(false)
      if (contentRef.current)
        contentRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView ref={contentRef} style={styles.content}>
        {errors[FormErrors.NOT_CREATED] && (
          <Text style={styles.error}>
            <Trans i18nKey="collection.form.errors.not_created">
              Unable to start collection :(
            </Trans>
          </Text>
        )}
        <TextField
          error={errors[FormErrors.TITLE]}
          label={<Trans i18nKey="collection.form.fields.title">Title</Trans>}
          onChangeText={handleTitleChange}
          value={values.title}
        />
        <Select
          items={[
            CollectionTypes.MUSIC,
            CollectionTypes.BOOK,
            CollectionTypes.OTHER,
          ].map(key => ({
            key,
            label: t(`collection.types.${key.toLowerCase()}`),
          }))}
          label={<Trans i18nKey="collection.form.fields.type">Type</Trans>}
          onValueChange={handleTypeChange}
          value={values.type}
        />
      </ScrollView>
      <View style={styles.actions}>
        <Button
          disabled={submitting}
          onPress={handleSubmit}
          title={t('collection.form.actions.add').toUpperCase()}
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
