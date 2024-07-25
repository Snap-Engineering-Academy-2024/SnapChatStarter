import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraActions from "../components/CameraActions";
import CameraOptions from "../components/CameraOptions";
import PostcaptureOptions from "../components/PostcaptureActions";
// Add supabase to store:
import {supabase} from '../utils/hooks/supabase';
import CameraGalleryMenu from "../components/CameraGalleryMenu";
import { Button } from "react-native-elements";

export default function CameraScreen({ navigation, focused }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back"); 
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [showGalleryMenu, setShowGalleryMenu] = useState(false);

  useEffect(() => {
    (async () => {
      // Request media library permissions
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function flipCamera() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function galleryMenu(){
    console.log("HELLO I AM HERE!")
    // return <CameraGalleryMenu />
    setShowGalleryMenu(!showGalleryMenu);
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
      // This part is to insert URI to "gallery" table
      console.log(" Before Insert to table!")
      const { error } = await supabase.from('gallery').insert({ photo: newPhoto.uri });    
      console.log("After Insert to table!")
      if (error) {
        console.error('Error inserting photo:', error.message);
      }
      // This part is to store images in a folder bucket named "pictureStorage"
      uploadImage(newPhoto.uri);
      
    }
  }

  async function uploadImage (photoUri) {
    // console.log("1")
    const response = await fetch(photoUri);
  
    const blob = await response.blob();

    const arrayBuffer = await new Response(blob).arrayBuffer();
    // console.log("2")
    const fileName = `public/${Date.now()}.jpg`;
    const { error1} = await supabase
      .storage
      .from('pictureStorage')
      .upload(fileName, arrayBuffer, { contentType: 'image/jpeg', upsert: false });
    // console.log("3")
    if (error1) {
      console.error('Error uploading image:', error1.message);
    } else {
      console.log('Image successfully uploaded:', data);
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
          style={facing === "front" ? styles.frontPreview : styles.preview}
          //source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          // We don't need that base64 thing, just uri is good
          source={{ uri: "file:///var/mobile/Containers/Data/Application/CF05F08E-8F78-4CEA-8A92-B092A5505765/Library/Caches/ExponentExperienceData/@anonymous/chatsnap-c59d517a-6d48-4777-ad0f-718efa4cc1b0/Camera/DAEF7FB1-8167-483D-B99A-4A8D742D9A05.jpg" }}
        />
        {hasMediaLibraryPermission && (
          <PostcaptureOptions deletePhoto={() => setPhoto(null)} savePhoto={savePhoto} />
        )}
      </View>
    );
  }

  if(showGalleryMenu){
    return (
      <>
        <CameraGalleryMenu />
        <Button
          onPress={galleryMenu}
          title="Close"
        />
      </>
    )
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
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} /> 
      <CameraOptions flipCamera={flipCamera} />
      <CameraActions galleryMenu={galleryMenu} checkGallery={checkGallery} takePhoto={takePhoto} />
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