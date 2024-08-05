import React, { useState, useEffect, useRef } from "react";
import "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, ButtonGroup, Icon, withTheme } from '@rneui/themed';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Location from "expo-location";

import Ionicons from "react-native-vector-icons/Ionicons";


export default function MapScreen({ navigation }) {
  
  const [pins, setPins] = useState([
    {
      title:"First", //user inpit (organization)
      location: {
        latitude: 34.0211573,
        longitude:  -118.4503864,
      }, //not user input
      address: "", //figure out how to implement when clickig on pin, not user input
      description:"new location", //not required, user input
      deals: {
        name:"", //the discounted item's name
        discount:"", //either free or some percentage off
        time:"", //default is all day for that day
      },
      type: "",
      time: "" //default is all time, users can choose to set a timer for the pin to disappear
      //pin disappears after 7 days of NO DEALS at the place
    },
  ])
  
  const [showPins, setShowPins] = useState(false);
  const PinInfoSheet = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [deal, setDeal] = useState('');
  const [organization, setOrganization] = useState('');

  const insertData = async () => {
        const eventData = submitToSupabase()
        console.log(eventData)

        onClose()
        try {
        const { data, error } = await supabase
            .from("event_table") // 
            .insert([eventData]); // Insert the event data
    
        if (error) {
            console.error("Event already exists:", error);
        } else {
            console.log("Data inserted:", data);
        }
        } catch (error) {
        console.error("Unexpected error:", error);
        }
    }
  
  const snapPoints = ["70%"];
  function createPinInfo() {
    PinInfoSheet.current?.present();
  }

  const showLocations = () => {

    return pins.map((item, index) => {
      return (
        <Marker
          style = {styles.pinsVisible}
          key = {index}
          coordinate = {item.location}
          title = {item.title}
          description = {item.description}
        />
      )
    })
  }

  const handleMapPress = (e) => {
    const newPin = {
      title: `Pin ${pins.length + 1}`,
      location: e.nativeEvent.coordinate,
      description: "User added pin",
    };
    console.log(e.nativeEvent.coordinate)
    setPins([...pins, newPin]);
    createPinInfo();
  };



  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [currentRegion, setCurrentRegion] = useState({
    latitude: 34.0211573,
    longitude:  -118.4503864,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  let text = "Waiting...";
  text = JSON.stringify(location);


  return (
    <BottomSheetModalProvider>
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <MapView
        style={styles.map}
        region={currentRegion}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
        onLongPress={handleMapPress}
      >
        {showLocations()}
      </MapView>
      <BottomSheetModal
        ref={PinInfoSheet}
        index={0}
        snapPoints={snapPoints}
      >
        <View>
          <View flexDirection={"row"} alignItems= {'center'}>
            <Text style={styles.headerPinSheet}> SnapServe Pin</Text>
            <TouchableOpacity style={styles.exitCreatePin}><Icon name="close" size="20"></Icon></TouchableOpacity>
          </View>
          <Text style={styles.subheadingPinSheet}>Enter additional details about your resource pin below.</Text>
          <Text style={styles.information}>Deal Information</Text>
          <TextInput 
          style={styles.input} 
          onChangeText={(deal)=> setDeal(deal)}
          value ={deal}
          />
          <Text style={styles.information}>Organization Name</Text>
          <TextInput 
          style={styles.input}
          onChangeText={(organization)=> setOrganization(organization)}
          value ={organization}
          />
          <TouchableOpacity style ={styles.moreInfoContainer}>
            <View flexDirection={"row"} alignItems={"center"}>
              <View flexDirection={"column"}>
                <Text style = {styles.moreInfoTitle}>Time</Text>
                <Text style = {styles.moreInfoSub}>From what time is this deal available?</Text>
              </View>
              <Icon name="arrow-forward-ios" size={15} paddingLeft={149}/>
            </View> 
          </TouchableOpacity>
          <TouchableOpacity style ={styles.moreInfoContainer}>
            <View flexDirection={"row"} alignItems={"center"}>
              <View flexDirection={"column"}>
                <Text style = {styles.moreInfoTitle}>Repeat</Text>
                <Text style = {styles.moreInfoSub}>If applicable, enter the days this deal reoccurs.</Text>
              </View>
              <Icon name="arrow-forward-ios" size={15} paddingLeft={97}/>
            </View> 
          </TouchableOpacity>
          <TouchableOpacity style ={styles.moreInfoContainer}>
            <View flexDirection={"row"} alignItems={"center"}>
              <View flexDirection={"column"}>
                <Text style = {styles.moreInfoTitle}>Resource Type</Text>
                <Text style = {styles.moreInfoSub}>Select all filters that apply to this resource</Text>
              </View>
              <Icon name="arrow-forward-ios" size={15} paddingLeft={120}/>
            </View> 
          </TouchableOpacity>
          <Button
           buttonStyle={{backgroundColor: '#33BBFF', borderRadius: 30, width: 370}} 
           style={styles.postPin}>
            <Text color={"#FFFFFF"}>Send</Text>
            <Icon name="send" size={"15"}/>
          </Button>
        </View>
      </BottomSheetModal>

      <View style={[styles.mapFooter, expanded ? styles.expanded : null]}> 
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
        <View style={[styles.bitmojiContainer]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style = {styles.buttonScrollview}>
            <View style = {styles.buttonContainer}>
                <Button
                  style = {styles.buttonsInside}
                  titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                  buttonStyle={{
                    backgroundColor: '#EDEEEF',
                    borderRadius: 30,
                  }}
                ><Icon name="search" color="black" /></Button>
                <Button
                  // onPress = {swipeUp}
                  style = {styles.buttonsInside}
                  title="Snap Serve"
                  titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                  buttonStyle={{
                    backgroundColor: '#EDEEEF',
                    borderRadius: 30,
                  }}
                />
                <Button
                  style = {styles.buttonsInside}
                  title="Places"
                  titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                  buttonStyle={{
                    backgroundColor: '#EDEEEF',
                    borderRadius: 30,
                  }}
                />
                <Button
                  style = {styles.buttonsInside}
                  title="Popular With Friends"
                  titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                  buttonStyle={{
                    backgroundColor: '#EDEEEF',
                    borderRadius: 30,
                  }}
                />
                <Button
                  style = {styles.buttonsInside}
                  title="Favorites"
                  titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                  buttonStyle={{
                    backgroundColor: '#EDEEEF',
                    borderRadius: 30,
                  }}
                />
            </View>
          </ScrollView>
        </View>
      </View>
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
    marginBottom:-1,
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
  buttonContainer:{
    display:"flex",
    flexDirection:"row",
    padding:10,
    paddingTop:15,
    paddingBottom:15,
    gap:10,
  },
  buttonScrollview:{
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor:"white",
    width:"100%",
    margin:0,
    borderBottomWidth:0.2,
    borderBottomColor:"#D9D9D9"
  },
  headerPinSheet:{
    fontSize: 17,
    fontWeight: '600',
    paddingBottom: 5,
    paddingLeft: 5,
    paddingTop:5,
    paddingRight:225,
  },
  subheadingPinSheet:{
    fontSize: 11,
    color: "#6e6e6e",
    paddingLeft: 10,
    paddingBottom:25,
  },
  information:{
    fontSize:13,
    paddingLeft: 10,
    color: "#a3a3a3",
  },
  input: {
    height: 25,
    marginLeft: 10,
    marginRight:10,
    marginTop: 5,
    marginBottom:20,
    borderLeftColor: "#33BBFF",
    borderLeftWidth: 5,
    padding: 5,
    backgroundColor: "#EDEEEF",
    borderRadius: 4,
  },
  exitCreatePin:{
    width: "100",
    height: "100",
    borderRadius: "50",
    padding: 5,
    backgroundColor: "#EDEEEF",
  },
  moreInfoContainer: {
    color: "none",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEEEF",
    padding: 15
  },
  moreInfoTitle: {
    fontSize: 15,
    fontWeight: 500,
  },
  moreInfoSub: {
    fontSize:11,
    color: "#646567",
  },
  postPin: {
    paddingTop: 30,
    borderRadius:40,
    alignItems: 'center',
  }
});
