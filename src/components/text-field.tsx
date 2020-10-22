import React, { useRef } from 'react'
import { KeyboardType, StyleSheet, Text, TextInput, View } from 'react-native'

interface IProps {
  error?: boolean
  label: React.ReactNode
  onChangeText: (value: string) => void
  keyboardType?: KeyboardType
  value: string
}

function TextField({ error, label, value, keyboardType, onChangeText }: IProps) {
  const inputRef = useRef<TextInput | null>(null)

  function handleLabelPress() {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <View style={styles.wrapper}>
      <Text onPress={handleLabelPress} style={[styles.label, { color: error ? '#f44336' : '#ccc' }]}>
        {label}
      </Text>
      <TextInput
        keyboardType={keyboardType || 'default'}
        onChangeText={onChangeText}
        ref={inputRef}
        style={[styles.input, { borderColor: error ? '#f44336' : '#ccc' }]}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#212121',
    borderRadius: 4,
    color: '#fff',
    fontSize: 16,
    height: 46,
    paddingHorizontal: 16,
  },
})

export default TextField
