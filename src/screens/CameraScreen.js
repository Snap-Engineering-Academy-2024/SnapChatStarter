import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, SafeAreaView, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraActions from "../components/CameraActions";
import CameraOptions from "../components/CameraOptions";
import PostcaptureOptions from "../components/PostcaptureActions";
import { supabase } from '../utils/hooks/supabase';
import CameraGalleryMenu from "../components/CameraGalleryMenu";
import { Button } from "react-native-elements";
import Popup from "../components/Popup";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import PopupPingNotification from "../components/PopupPingNotification";

import defaultPhoto from "../../assets/snapchat/notificationPic.png";




export default function CameraScreen({ navigation, focused }) 
{
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [photo, setPhoto] = useState(null);
  const [showGalleryMenu, setShowGalleryMenu] = useState(false);
  const { user } = useAuthentication();
  const [communities, setCommunities] = useState("");
  const [popupTrigger, setPopupTrigger] = useState(false);

  const [popupTriggePing, setPopupTriggerPing] = useState(false);


  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles') // Replace with your table name
        .select('community')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      console.log(data.community);
      if (data.community === null)
        {
          setPopupTrigger(true);
          console.log("shows popup.");
        }
        else
        {
          console.log("doesnt show initial popup");
        }

    } catch (error) {
      console.error('Error fetching user data:', error.message);
      
    }
  };


  useEffect(() => {
    if (user !== null) {
      fetchUserData();
      // console.log(JSON.stringify(user, null, 4))

    }

    (async () => {
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, [user]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <PopupPingNotification trigger={popupTriggePing} setTrigger={setPopupTriggerPing}>
        <Image style={{ width: 150, height: 150 }} 
        source={{ uri: "https://i.imgur.com/j8qg2QK_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
          />
          <Text style={{fontSize: 27}}>You've Been Pinged!</Text>
          <Text>We've found a friend with your interests!</Text>
          
          <TouchableOpacity 
          style={styles.buttonStyle2} 
          onPress={() => {
            navigation.navigate("Profile");
          }}
          >

          <Text style={styles.buttonText2}>Chat with Friend!</Text>

          </TouchableOpacity>
        </PopupPingNotification>
        <Popup trigger={popupTrigger} setTrigger={setPopupTrigger}>
          <Image style={{ width: 150, height: 150 }} source={defaultPhoto}
          />
          <Text style={{fontSize: 27}}>Community Ping!</Text>
          <Text>Will allow you to join a community and find others within your community who share the same interests.</Text>
          
          <TouchableOpacity 
          style={styles.buttonStyle2} 
          onPress={() => {
            navigation.navigate("Profile");
          }}
          >

          <Text style={styles.buttonText2}>Check Out New Feature!</Text>

          </TouchableOpacity>
        </Popup>

        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => {
            setPopupTriggerPing(true);
          }}>
          <Text style={styles.buttonText2}>Ping Notification</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function flipCamera() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function galleryMenu(){
    setShowGalleryMenu(!showGalleryMenu);
  }

  async function checkGallery() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    setShowGalleryMenu(false);
    if (!pickerResult.canceled) {
      //setImage(pickerResult.uri);
      setPhoto(pickerResult.assets[0]); //By Ryan
    }
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
      const { error } = await supabase.from('gallery').insert({ photo: newPhoto.uri });    
      if (error) {
        console.error("Error inserting photo:", error.message);
      }
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
      <View style={[styles.container, { marginBottom: tabBarHeight, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Image style={facing === "front" ? styles.frontPreview : styles.preview} source={{ uri: photo.uri }} />
        {hasMediaLibraryPermission && (
          <PostcaptureOptions
            deletePhoto={() => setPhoto(null)}
            savePhoto={savePhoto}
          />
        )}
      </View>
    );
  }

  if (showGalleryMenu) {
    return (
      <View style={[styles.container, { marginBottom: tabBarHeight, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} /> 
        <CameraOptions flipCamera={flipCamera} />
        <CameraActions galleryMenu={galleryMenu} checkGallery={checkGallery} takePhoto={takePhoto} />
        <Modal animationType="slide" transparent={true} visible={showGalleryMenu} onRequestClose={() => setShowGalleryMenu(!showGalleryMenu)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={checkGallery} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Phone Gallery</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('MemoryScreen')} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>ChatSnap Memories</Text>
              </Pressable>
              <Pressable onPress={galleryMenu} style={styles.closeButtonStyle}>
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} /> 
      <CameraOptions flipCamera={flipCamera} />
      <CameraActions galleryMenu={galleryMenu} checkGallery={checkGallery} takePhoto={takePhoto} />
      <Popup trigger={popupTrigger} setTrigger={setPopupTrigger}>
        {/* <Image 
          source={require('../snapchat/notificationPic.png')} // Replace with the path to your image
          style={{ width: 100, height: 100 }}
        /> */}
        <Text>My popup</Text>
      </Popup>
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
  modalView: {
    margin: 20,
    marginTop: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#2196F3",
  },
  buttonStyle2: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FFFC00',
  },
  closeButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'white',
  },
  buttonText2: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'black',
  },
  message: {
    color: 'white',
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

