import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, ScrollView } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Constants from 'expo-constants';
import { colors } from "../../assets/themes/colors";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import LocationList from "./LocationList";
import LocationDetails from "./LocationDetails";
import onePlaceToTest from "./oneTestPlace.json";
import placesListTest from "./placesListTest.json"
let GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
export default function MapScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const locationListModalRef = useRef(null);
  const locationDetailsModalRef = useRef(null);
  const snapPointsLocationList = ["25%","50%", "92%"];
  const snapPointsLocationDetails = ["50%", "92%"];
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setCurrentRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
    getLocation();
  }, []);
  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        // {
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // },
        currentRegion,
        1000
      );
    }
  };
  const handleShowPlaces = async (keyword) => {
    if (!location) {
      setErrorMsg("Location not available");
      return;
    }
    //const radius = 2 * 1609.34;
    //const apiKey = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY;
    //const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
    try {
      //const response = await axios.get(url);
      //setPlaces(response.data.results);
      setPlaces(placesListTest)
      locationListModalRef.current.present();
      console.log(JSON.stringify(places))
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlacePress = useCallback((place) => {
    setSelectedPlace(place);
    locationDetailsModalRef.current.present();
  }, []);
  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { marginBottom: tabBarHeight }]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={currentRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.vicinity}
            />
          ))}
        </MapView>
        <View style={styles.mapFooter}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={[styles.userLocation, styles.shadow]}
              onPress={handleRecenter}
            >
              <Ionicons name="navigate" size={15} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => handleShowPlaces("career center homeless social service")}
              >
                <Ionicons name="search" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowPlaces("career center homeless social service")}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="business" size={20} color="white" />
                </View>
                <Text style={styles.buttonText}>Career Center</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowPlaces("hospital emergency")}
              >
                <Text style={styles.buttonText}>Safety</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowPlaces("public shower OR park")}
              >
                <Text style={styles.buttonText}>Public Areas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowPlaces("food bank free food")}
              >
                <Text style={styles.buttonText}>Food Bank</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        <BottomSheetModal
          ref={locationListModalRef}
          index={0}
          snapPoints={snapPointsLocationList}
          backgroundStyle={{ backgroundColor: "#F8F8F8" }}
        >
          <LocationList
            places={places}
            onPlacePress={handlePlacePress}
            searchFunc={(keyword) => handleShowPlaces(keyword)}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={locationDetailsModalRef}
          index={0}
          snapPoints={snapPointsLocationDetails}
          backgroundStyle={{ backgroundColor: "#F8F8F8" }}
        >
          <LocationDetails
            place={selectedPlace}
            onClose={() => locationDetailsModalRef.current.close()}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
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
    paddingBottom: 0,
    bottom: 0,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  locationContainer: {
    backgroundColor: "transparent",
    width: "100%",
    paddingBottom: 5,
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
  buttonsContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 13,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: colors.belowPage,
    borderRadius: 80,
    padding: 10,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    backgroundColor: colors.belowPage,
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 10,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  iconContainer: {
    backgroundColor: "#1E90FF",
    borderRadius: 100,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
});