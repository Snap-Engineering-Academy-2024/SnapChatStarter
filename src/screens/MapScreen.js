import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
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
import placesListTest from "./placesListTest.json"
import mixPlacesTest from "./mixPlacesTest.json"
import MapHeader from "../components/MapHeader";
import FavoriteScreen from "./FavoriteScreen";
import {supabase} from '../utils/hooks/supabase';
import CityAndRightBar from '../components/CityAndRightBar';
import IntroSafeHavenModal from '../components/IntroSafeHavenModal';


const apiKey = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY; 

export default function MapScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const locationListModalRef = useRef(null);
  const locationDetailsModalRef = useRef(null);
  const favoritelocationModalRef = useRef(null);
  const snapPointsLocationList = ["60%", "92%"];
  const snapPointsLocationDetails = ["60%", "92%"];
  const [isSatellite, setIsSatellite] = useState(false);
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setCity(getCityName(location.coords.latitude,location.coords.longitude))
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


  const channels = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'favorite_places' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()


  const getCityName = async (latitude, longitude) => {
    console.log("call city function!")
    const apiKey = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    
    try {
      const response = await axios.get(url);
      const addressComponents = response.data.results[0]?.address_components || [];
      const cityComponent = addressComponents.find(component => component.types.includes('locality'));
      return cityComponent ? cityComponent.long_name : 'Unknown City';
    } catch (error) {
      console.error(error);
      return 'Error retrieving city name';
    }
  };

  const handleRegionChangeComplete = async (region) => {
    const cityName = await getCityName(region.latitude, region.longitude);
    setCity(cityName);
  };

  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(currentRegion,1000);
    }
  };
  const handleContinue = () => {
    setIsIntroModalVisible(false);
  };

  const getImageCanSee = async (photoReference) => {
    
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photoReference}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      // console.log(JSON.stringify(response,null,4))
      return response.config.url;
    } catch (error) {
      console.error(error);
      return 'https://i.postimg.cc/RZctxc7f/shelter-chile-unhcr-web.jpg'
    }
  };

  const getMapIconImage = (keyword) => {
    const keywordMap = {
      "nonprofit organization": 'https://i.postimg.cc/SsvFtJV5/Nonprofit-Icon.png',
      "police hospital emergency": 'https://i.postimg.cc/j2n0VtFj/Safety-Icon.png',
      "free wifi place": 'https://i.postimg.cc/brnyxx8L/Wi-Fi-Icon.png',
      "food bank free food salvation army": 'https://i.postimg.cc/5t92hQqN/Food-Banks-Icon.png',
      "free shower library": 'https://i.postimg.cc/pLJdcJj6/Public-Areas-Icon.png',
    };
  
    return keywordMap[keyword] || 'https://i.postimg.cc/SsvFtJV5/Nonprofit-Icon.png';
  };
  
  const fetchNearbyPlaces = async (keyword) => {
    const radius = 2 * 1609.34; // 2 miles in meters
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
  
    const mapIconImage = getMapIconImage(keyword);
  
    try {
      const response = await axios.get(url);
      const places = response.data.results;
  
      const placesWithMapIconImages = places.map(place => ({
        ...place,
        mapIconImage
      }));
  
      return placesWithMapIconImages;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  
  const handleShowPlaces = async (keyword) => {
    if (!location) {
      setErrorMsg("Location not available");
      return;
    }
  
    const placesWithMapIconImages = await fetchNearbyPlaces(keyword);
    
    setPlaces(placesWithMapIconImages);
    locationListModalRef.current.present();
  };
  
  
  const handleShowSafeHaven = async () => {
    if (!location) {
      setErrorMsg("Location not available");
      return;
    }
  
    const categories = [
      "nonprofit organization",
      "free wifi place"
    ];
  
    try {
      const allPlaces = [];
      for (const category of categories) {
        const result = await fetchNearbyPlaces(category);
        allPlaces.push(...result.slice(0, 4));
      }
      
      setPlaces(allPlaces);
      locationListModalRef.current.present();
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchPlaceDetails = async (placeId) => {
    const apiKey = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handlePlacePress = useCallback(async (place) => {
    const placeDetails = await fetchPlaceDetails(place.place_id);
  
    if (placeDetails) {
      const photoReference = place.photos?.[0]?.photo_reference;
      const imageTop = place.imageUrl ? place.imageUrl : (photoReference ? await getImageCanSee(photoReference) : 'https://i.postimg.cc/RZctxc7f/shelter-chile-unhcr-web.jpg');
      const placeWithImageUrl = {
        ...placeDetails,
        imageUrl: imageTop,
        isNonProfit: place.mapIconImage == 'https://i.postimg.cc/SsvFtJV5/Nonprofit-Icon.png'? true : false
      };

      setSelectedPlace(placeWithImageUrl);

      locationDetailsModalRef.current.present();
    } else {
      console.error("Failed to fetch place details");
    }
  }, []);

  const handleShowFavorite = async () => {
    try {
      const { data, error } = await supabase.from('favorite_places').select('place_object');
  
      if (error) {
        console.error("Error fetching favorite places:", error);
        return;
      }
      if (data) {
        const favoritePlaces = data.map(record => record.place_object);
        // console.log(favoritePlaces)
        setPlaces(favoritePlaces);
        favoritelocationModalRef.current.present();
      }
    } catch (error) {
      console.error("Error fetching favorite places:", error);
    }
  };

  const insertFavoritePlace = async (placeObject) => {
    try {
      const { data, error } = await supabase.from('favorite_places').insert([{ place_object: placeObject }]).single();

      if (error) {
        console.error('Error inserting favorite place:', error);
        return null;
      }
      return data;
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error inserting favorite place:', error);
      return null;
    }
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { marginBottom: tabBarHeight }]}>

        <MapView
          ref={mapRef}
          style={styles.map}
          region={currentRegion}
          showsUserLocation={false}
          showsMyLocationButton={true}
          onRegionChangeComplete={handleRegionChangeComplete}
          mapType= {isSatellite? 'hybrid' : 'standard'}
        >
          {/* {console.log(JSON.stringify(location,null,4))} */}
          {location && (
            <>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                <Image
                  source={{ uri: 'https://i.postimg.cc/yxYLZHRT/Me-Bitmoji-Icon-1.png' }}
                  style={{ width: 100, height: 100 }}
                />
              </Marker>
              
              <Marker
                coordinate={{
                  latitude: location.coords.latitude - 0.021,
                  longitude: location.coords.longitude + 0.02,
                }}
              >
                <Image
                  source={{ uri: 'https://i.postimg.cc/432bnSGD/Isabella-Bitmoji.png' }}
                  style={{ width: 100, height: 100 }}
                />
              </Marker>
            </>

          )}

          {places.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              // title={place.name}
              // description={place.vicinity}
              onPress={() => handlePlacePress(place)}
            >
              <Image style={{ height: 40, width:40 }} source={{uri: place.mapIconImage}}/>
            </Marker>
          ))}
        </MapView>
        <View style={styles.headerContainer}>
          <MapHeader navigation={navigation} />
        </View>
        
        <CityAndRightBar city={city} isSatellite={isSatellite} setIsSatellite={setIsSatellite} />

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
                onPress={() => console.log("Pressed the useless button!")}
              >
                <Ionicons name="search" size={20} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("Pressed the useless button!")}
              >
                <Image source={require("../../assets/Circle moji.png")}
                style={styles.image1InButton}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("Pressed the useless button!")}
              >
                <Image source={{uri: 'https://i.postimg.cc/HsnZ2XZ4/3-Bitmojis-Icon.png'}}
                style={styles.imageInButton}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowSafeHaven()}
              >
                <View style={[styles.iconContainer, { backgroundColor: "#1E90FF" }]}>
                  {/* <Image style={{ height: 40, width:40 }} source={{uri: 'https://i.postimg.cc/SsvFtJV5/Nonprofit-Icon.png'}}/> */}
                  <Ionicons name="home" size={20} color="white" />
                </View>
                <Text style={styles.buttonText}>SafeHaven</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowFavorite()}
              >
                <View style={[styles.iconContainer, { backgroundColor: "#f94449" }]}>
                  {/* <Image style={{ height: 40, width:40 }} source={{uri: 'https://i.postimg.cc/SsvFtJV5/Nonprofit-Icon.png'}}/> */}
                  <Ionicons name="heart" size={20} color="white" />
                </View>
                <Text style={styles.buttonText}>Favorite</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        
        {isIntroModalVisible && (
          <IntroSafeHavenModal
            isIntroModalVisible={isIntroModalVisible}
            handleContinue={handleContinue}
          />
        )}

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
            onClose = {() => locationListModalRef.current.close()}
            getImageCanSee = {getImageCanSee}
            insertFavoritePlace = {insertFavoritePlace}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={locationDetailsModalRef}
          index={0}
          snapPoints={snapPointsLocationDetails}
          backgroundStyle={{ backgroundColor: "#FFFFFF" }}
        >
          <LocationDetails
            place={selectedPlace}
            onClose={() => locationDetailsModalRef.current.close()}
            getImageCanSee = {getImageCanSee}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={favoritelocationModalRef}
          index={0}
          snapPoints={snapPointsLocationDetails}
          backgroundStyle={{ backgroundColor: "#FFFFFF" }}
        >
          <FavoriteScreen
            places={places}
            onClose={() => favoritelocationModalRef.current.close()}
            onPlacePress={handlePlacePress}
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
    paddingHorizontal: 10,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageInButton: {
    width: 90, 
    height: 40,
    resizeMode: 'contain',
  },
  image1InButton: {
    width: 40, 
    height: 40,
    resizeMode: 'contain',
  },
  circleButton: {
    backgroundColor: colors.belowPage,
    borderRadius: 100,
    height: 48,
    width: 48,
    padding: 10,
    marginLeft: 10,
    marginRight: 4,
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
    borderRadius: 100,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  headerContainer: {
    position: 'absolute',
    top: 60,
    backgroundColor: 'transparent',
  },
});