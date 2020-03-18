import React, { useRef } from 'react'
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native'

interface IProps {
  items: { key: string; label: string }[]
  label: React.ReactNode
  onValueChange: (value: string) => void
  value: string
}

function Select({ label, items, value, onValueChange }: IProps) {
  const inputRef = useRef<TextInput | null>(null)

  function handleLabelPress() {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <View style={styles.wrapper}>
      <Text onPress={handleLabelPress} style={styles.label}>
        {label}
      </Text>
      <Picker
        itemStyle={styles.pickerItem}
        mode="dropdown"
        onValueChange={onValueChange}
        selectedValue={value}
        style={styles.picker}
      >
        {items.map(({ key, label: itemLabel }) => (
          <Picker.Item key={key} label={itemLabel} value={key} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#212121',
    borderRadius: 2,
    color: '#fff',
    marginVertical: 8,
  },
  pickerItem: {
    color: '#fff',
    fontSize: 16,
  },
})

export default Select
