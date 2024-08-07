import React, { useState, useEffect } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { supabase } from '../utils/hooks/supabase';
import Ionicons from "react-native-vector-icons/Ionicons";
import PopupPingNotification from "../components/PopupPingNotification";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import Popup from "../components/Popup";

const saveUserLocation = async (location, user) => {
  try {
    const locationData = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        location: locationData,
      });

    if (error) throw error;

    console.log('Location data saved:', data);
  } catch (error) {
    console.error('Error saving user location:', error.message);
  }
};


export default function MapScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [boundingBox, setBoundingBox] = useState({});
  const [popupTriggerPing, setPopupTriggerPing] = useState(false);
  const [showNearbyUsers, setShowNearbyUsers] = useState(false);
  const { user } = useAuthentication();
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 34.0211573,
    longitude: -118.4503864,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [popupTrigger, setPopupTrigger] = useState(false);
  const testRegion = {
    latitude: 37.785834,
    longitude: -122.406417
  };

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('community')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      console.log(data.community);
      if (data.community === null) {
        setPopupTrigger(true);
        setPopupTriggerPing(false);
        console.log("shows initial popup.");
      } else {
        setPopupTrigger(false);
        setPopupTriggerPing(true);
        console.log("doesn't show initial popup");
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const fetchProfilesWithInterest = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, location')
        .filter('interests->>0', 'eq', 'ball');
  
      if (error) {
        throw error;
      }
  
      console.log('Usernames with interest "ball" as the first element:', data);
      return data;
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
      return null;
    }
  };

  const fetchAndSaveLocationData = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
  
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      await saveUserLocation(region, user);
      
    } catch (error) {
      console.error('Error fetching location or calculating bounding box:', error);
    }
  };

  function isTargetWithinBoundingBox(source, target, radius) {
    const earthRadius = 6371;
  
    const radLat = radius / earthRadius * (180 / Math.PI);
    const radLng = radius / (earthRadius * Math.cos(source.latitude * Math.PI / 180)) * (180 / Math.PI);
  
    const minLat = source.latitude - radLat;
    const maxLat = source.latitude + radLat;
    const minLng = source.longitude - radLng;
    const maxLng = source.longitude + radLng;
  
    if (target.location.latitude >= minLat && target.location.latitude <= maxLat && target.location.longitude >= minLng && target.location.longitude <= maxLng) {
      //setPopupTriggerPing(true);
      console.log("this worked: ", target.username);
    }
  }

  function determineSelection(objArr) {

    for (let i = 0; i < objArr.length; i++) {
      isTargetWithinBoundingBox(testRegion, objArr[i], 5);
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      if (user !== null) {
        await fetchUserData();
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      setLocation(currLocation);
      const region = {
        latitude: currLocation.coords.latitude,
        longitude: currLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setCurrentRegion(region);
      if (user !== null) {
          await fetchAndSaveLocationData();
          if (popupTriggerPing)
          {
            const usernamesLoc = await fetchProfilesWithInterest();
            determineSelection(usernamesLoc);
          }

      }
    })();
  }, [user, popupTrigger, popupTriggerPing]);

  // useEffect(() => {

  // }, [user]);

  let text = "Waiting...";
  text = JSON.stringify(location);

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <MapView
        style={styles.map}
        region={currentRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <PopupPingNotification trigger={popupTriggerPing} setTrigger={setPopupTriggerPing}>
          <Image style={{ width: 150, height: 150 }} 
          source={{ uri: "https://i.imgur.com/j8qg2QK_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
            />
            <Text style={{fontSize: 27}}>You've Been Pinged!</Text>
            <Text>We've found a friend with your interests!</Text>
            <TouchableOpacity 
            style={styles.buttonStyle2} 
            onPress={() => {
              navigation.navigate("Chat");
            }}
            >
          <Text style={styles.buttonText2}>Chat with Friend!</Text>
          </TouchableOpacity>
        </PopupPingNotification>
      </MapView>

      <Popup trigger={popupTrigger} setTrigger={setPopupTrigger}>
        <Image style={{ width: 310, height: 200 }} source={{ uri: "https://i.imgur.com/8uEEtly_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }} />
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Introducing Community Ping!</Text>
        <Text>Try the new Community Ping feature and connect with people around you based on your interests and community!</Text>
        <TouchableOpacity style={styles.buttonStyle2} onPress={() => { navigation.navigate("Profile"); }}>
          <Text style={styles.buttonText2}>Let's Go!</Text>
        </TouchableOpacity>
      </Popup>

      <View style={[styles.mapFooter]}>
        <View style={styles.locationContainer}>
          <TouchableOpacity
            style={[styles.userLocation, styles.shadow]}
            onPress={() => {
              console.log("Go to user location!");
              const { latitude, longitude } = location.coords;
              setCurrentRegion({ ...currentRegion, latitude, longitude });
            }}
          >
            <Ionicons name="navigate" size={15} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.bitmojiContainer, styles.shadow]}>
          <Pressable
            onPress={() => {
              navigation.navigate("Event");
            }}
          >
            <View style={styles.myBitmoji}>
              <Ionicons name="calendar-outline" size={50} color="gray" />
              <View style={styles.bitmojiTextContainer}>
                <Text style={styles.bitmojiText}>Events</Text>
              </View>
            </View>
          </Pressable>

          <View style={styles.places}>
            <Image
              style={styles.bitmojiImage}
              source={require("../../assets/snapchat/personalBitmoji.png")}
            />
            <View style={styles.bitmojiTextContainer}>
              <Text style={styles.bitmojiText}>Places</Text>
            </View>
          </View>
          <View style={styles.myFriends}>
            <Image
              style={styles.bitmojiImage}
              source={require("../../assets/snapchat/personalBitmoji.png")}
            />
            <View style={styles.bitmojiTextContainer}>
              <Text style={styles.bitmojiText}>Friends</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    bottom: 0,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  locationContainer: {
    backgroundColor: "transparent",
    width: "100%",
    paddingBottom: 8,
    alignItems: "center",
  },
  userLocation: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 4,
  },
  bitmojiContainer: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  myBitmoji: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  bitmojiImage: {
    width: 50,
    height: 50,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    fontSize: 10,
    fontWeight: "700",
  },
  places: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  myFriends: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle2: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: '#0fadfe',
  },
  buttonText2: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'white',
    fontWeight: 'bold',
  },
  calendarIcon: {},
});
