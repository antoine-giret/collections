import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageBackground, InteractionManager, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Camera } from 'expo-camera'
import { CapturedPicture } from 'expo-camera/build/Camera.types'
import { Trans } from 'react-i18next'

import AppContext from '../../app/context'
import Fab from '../../components/fab'

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null)
  const [type] = useState(Camera.Constants.Type.back)
  const [picture, setPicture] = useState<CapturedPicture | null>(null)
  const [snapping, setSnapping] = useState(false)
  const cameraRef = useRef<Camera | null>(null)
  const { setCapturedPictureUrl } = useContext(AppContext)
  const { goBack } = useNavigation()

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      init()
    })
  }, [])

  async function init() {
    const { status } = await Camera.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  async function handleSnap() {
    if (cameraRef.current) {
      setSnapping(true)
      setPicture(await cameraRef.current.takePictureAsync())
      setSnapping(false)
    }
  }

  function handleClear() {
    setPicture(null)
  }

  function handleValidate() {
    if (picture) {
      setCapturedPictureUrl(picture.uri)
      goBack()
    }
  }

  if (hasPermission === null) {
    return <></>
  }

  if (hasPermission === false) {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>
          <Trans i18nKey="camera.errors.no_access">No access to camera</Trans>
        </Text>
      </View>
    )
  }

  if (picture) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <ImageBackground resizeMode="contain" source={picture} style={styles.preview}>
          <View style={styles.actions}>
            <Fab containerStyle={{ marginRight: 16 }} icon="clear" onPress={handleClear} />
            <Fab icon="check" onPress={handleValidate} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Camera ratio="1:1" ref={cameraRef} style={styles.container} type={type}>
        <View style={styles.actions}>
          <Fab disabled={snapping} icon="photo-camera" onPress={handleSnap} />
        </View>
      </Camera>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  preview: {
    flex: 1,
    position: 'relative',
  },
  actions: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: '100%',
  },
})

export default CameraScreen
