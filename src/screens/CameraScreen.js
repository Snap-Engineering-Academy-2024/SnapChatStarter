import { StyleSheet, Text, View, Image, SafeAreaView, Button, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from 'expo-camera/legacy';
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraActions from "../components/CameraActions";
import CameraOptions from "../components/CameraOptions";
import PostcaptureOptions from "../components/PostcaptureActions";
// CINDY COMMENT
export default function CameraScreen({ navigation, focused }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      
      // Request media library permissions
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return  <SafeAreaView>
              <Text>Requesting permissions...</Text>
            </SafeAreaView>;
  } else if (!hasCameraPermission) {
    return  <SafeAreaView>
              <Text>Permission for camera not granted. Please change this in settings.</Text>
            </SafeAreaView>;
  }

  function flipCamera() {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  }

  async function checkGallery() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (!pickerResult.canceled) {
      setImage(pickerResult.uri);
    }
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  }

  function savePhoto() {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(null);
    });
  }

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(null);
      });
    };

    return (
      <View
        style={[
          styles.container,
          {
            marginBottom: tabBarHeight,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Image
          style={type === CameraType.front ? styles.frontPreview : styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {hasMediaLibraryPermission && (
          <PostcaptureOptions deletePhoto={() => setPhoto(null)} savePhoto={savePhoto} />
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: tabBarHeight,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Camera style={styles.camera} type={type} ref={cameraRef} />
      <CameraOptions flipCamera={flipCamera} />
      <CameraActions checkGallery={checkGallery} takePhoto={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  preview: {
    flex: 1,
    borderRadius: 16,
  },
  frontPreview: {
    flex: 1,
    borderRadius: 16,
    transform: [{ scaleX: -1 }],
  },
});