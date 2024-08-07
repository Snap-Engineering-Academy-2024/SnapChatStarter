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
} 
from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Location from "expo-location";
import { supabase } from '../utils/hooks/supabase';
import Ionicons from "react-native-vector-icons/Ionicons";
import defaultPhoto from "../../assets/snapchat/notificationPic.png";
import PopupPingNotification from "../components/PopupPingNotification";
import { useAuthentication } from '../utils/hooks/useAuthentication';


const saveUserLocation = async (location, user) => {
  try {
    // Construct the location object
    const locationData = {
      latitude: location.latitude,
      longitude: location.longitude
    };

    // Perform upsert to insert or update the location data
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id, // Use the user ID to identify the record
        location: locationData // Set the location column
      });

    if (error) throw error;

    console.log('Location data saved:', data);

  } catch (error) {
    console.error('Error saving user location:', error.message);
  }
};


function calculateBoundingBox(latitude, longitude, radius) {
  const earthRadius = 6371; // Earth's radius in kilometers

  const radLat = radius / earthRadius * (180 / Math.PI);
  const radLng = radius / (earthRadius * Math.cos(latitude * Math.PI / 180)) * (180 / Math.PI);

  const minLat = latitude - radLat;
  const maxLat = latitude + radLat;
  const minLng = longitude - radLng;
  const maxLng = longitude + radLng;

  return {
    minLatitude: minLat,
    maxLatitude: maxLat,
    minLongitude: minLng,
    maxLongitude: maxLng,
  };
}



function isTargetWithinBoundingBox(source, target, radius) {
  const earthRadius = 6371; // Earth's radius in kilometers
  //console.log("within test func: ", target);

  const radLat = radius / earthRadius * (180 / Math.PI);
  const radLng = radius / (earthRadius * Math.cos(source.latitude * Math.PI / 180)) * (180 / Math.PI);

  const minLat = source.latitude - radLat;
  const maxLat = source.latitude + radLat;
  const minLng = source.longitude - radLng;
  const maxLng = source.longitude + radLng;

  // Check if target location falls within the bounding box
  if ( target.location.latitude >= minLat && target.location.latitude <= maxLat && target.location.longitude >= minLng && target.location.longitude <= maxLng)
  {
    console.log("this worked: ", target.username);
  }
  // return (
  //   target.latitude >= minLat &&
  //   target.latitude <= maxLat &&
  //   target.longitude >= minLng &&
  //   target.longitude <= maxLng
  // );
}


export default function MapScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [boundingBox, setBoundingBox] = useState({});
  const { user } = useAuthentication();
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 34.0211573,
    longitude: -118.4503864,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const testRegion = 
  {
    "latitude": 37.785834,
    "longitude": -122.406417
  }

  function determineSelection(objArr)
{
  for(let i = 0; i < objArr.length; i++)
  {
    isTargetWithinBoundingBox(testRegion, objArr[i], 5);
  }
}


  async function fetchProfilesWithInterest() {
    try {
      // Perform the query to get profiles where the first element in the interests array is "ball"
      const { data, error } = await supabase
        .from('profiles')
        .select('username, location')
        .filter('interests->>0', 'eq', 'ball'); // Postgres JSONB array index operator
  
      if (error) {
        throw error;
      }
  
      console.log('Usernames with interest "ball" as the first element:', data);
      return data;
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
      return null;
    }
  }

  const fetchAndSaveLocationData = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
  
      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      //console.log('Location:', location);
  
      // Define the region
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      // Calculate the bounding box
      // const boundingBoxSetter = calculateBoundingBox(region.latitude, region.longitude, 5);
      // setBoundingBox(boundingBoxSetter);
      // console.log('Bounding Box:', boundingBox);
  
      // Save to database or perform other operations
      await saveUserLocation(region, user);
  
    } catch (error) {
      console.error('Error fetching location or calculating bounding box:', error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
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
      if (user !== null)
      {
        await fetchAndSaveLocationData();
        const usernamesLoc = await fetchProfilesWithInterest();
        determineSelection(usernamesLoc);

      }
        
      setBoundingBox(calculateBoundingBox(currLocation.coords.latitude, currLocation.coords.longitude, 5));
      //fetchAndSaveLocationData(user);
    })();
  }, [user]);


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
      </MapView>


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
  calendarIcon: {},
});