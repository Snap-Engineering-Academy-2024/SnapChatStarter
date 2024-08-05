import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  
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
  const bottomSheetRef = useRef(null);
  const snapPoints = ["50%", "90%"];
  function handlePresentModal() {
    bottomSheetRef?.current?.present();
  }
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
  const [expanded, setExpanded] = useState(false);

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
 

  const showLocations = () => {
    if(showPins){
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

    return null
    
  }

  const handleMapPress = (e) => {
    if(showPins){
      const newPin = {
        title: `Pin ${pins.length + 1}`,
        location: e.nativeEvent.coordinate,
        description: "User added pin",
      };
      console.log(e.nativeEvent.coordinate)
      setPins([...pins, newPin]);
    }
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
          <BottomSheetModal backgroundStyle={{backgroundColor:"#F8F8F8"}} ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
            <View style = {styles.modalContainer}>
              <Button onClick={() => {
                bottomSheetRef?.current?.hide();
              }} style = {styles.closeButton} type="solid" buttonStyle={{
                backgroundColor: '#EDEEEF',
                borderRadius: 3,
                height:40, width:40,
                marginRight:20,
                borderRadius:100,
              }}>
                <Icon name="close" color="black" size = "20" />
              </Button>
              <View style = {{marginTop:-30, marginLeft:20, display:"flex", flexDirection:"row", alignItems:"center", gap:20}}>
                <Image src="https://wallpapercave.com/wp/JTpVKUS.jpg" style = {{width:60, height:60, borderRadius:100}}></Image>
                <Text style = {{fontSize:21, fontWeight:"600"}}>Snap Serve</Text>
              </View>

              <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}  style = {styles.categoryScrollView}>
                <View style = {styles.categoryContainer}>
                  <Button
                    title = "Bookmarks"
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                    buttonStyle={{
                      backgroundColor: '#EDEEEF',
                      borderRadius: 30,
                    }}
                    ><Icon name="bookmark" color="black" />
                  Bookmars</Button>
                  <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                    buttonStyle={{
                      backgroundColor: '#EDEEEF',
                      borderRadius: 30,
                    }}
                    ><Icon name="store" color="black" />
                  Stores</Button>
                  <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                    backgroundStyle= {{backgroundColor:"red"}}
                    buttonStyle={{
                      backgroundColor: '#EDEEEF',
                      borderRadius: 30,
                    }}
                    ><Icon name="local-dining" color="black" />
                  Food Banks</Button>
                  <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 13, margin:3 }}
                    backgroundStyle= {{backgroundColor:"red"}}
                    buttonStyle={{
                      backgroundColor: '#EDEEEF',
                      borderRadius: 30,
                    }}
                    ><Icon name="local-dining" color="black" />
                  Restaurants</Button>
                  </View>
                  </ScrollView>
              </View>



              <ScrollView > 
                <View style = {styles.dealsContainer}>
                  <View style = {styles.dealContainer}>
                    <View style = {styles.imageContainer}>
                      <Image style = {styles.dealStories} src="http://www.dumpaday.com/wp-content/uploads/2017/01/random-pictures-109.jpg" ></Image>
                    </View>
                    <View style = {styles.dealTextContainer}>
                      <Text style = {{fontWeight:600, fontSize:19}}>Target</Text>
                      <Text style = {{marginTop:5}}>5 occuring deals</Text>
                    </View>
                    <Button
                      style = {styles.buttonsInside}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderRadius: 30,
                      }}
                      ><Icon name="chevron-right" color="black" />
                    </Button>
                  </View>               
                  <View style = {styles.dealContainer}>
                    <View style = {styles.imageContainer}>
                      <Image style = {styles.dealStories} src="https://tse3.mm.bing.net/th?id=OIP.7TgBB5DgbtJoSnCFIS7SJgHaHa&pid=Api&P=0&h=220" ></Image>
                    </View>
                    <View style = {styles.dealTextContainer}>
                      <Text style = {{fontWeight:600, fontSize:19}}>Walmart</Text>
                      <Text style = {{marginTop:5}}>20 occuring deals</Text>
                    </View>
                    <Button
                      style = {styles.buttonsInside}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderRadius: 30,
                      }}
                      ><Icon name="chevron-right" color="black" />
                    </Button>
                  </View>

                  <View style = {styles.dealContainer}>
                    <View style = {styles.imageContainer}>
                      <Image style = {styles.dealStories} src="https://concepto.de/wp-content/uploads/2022/09/random-aleatorio-imprevisible-e1664563555843.jpg" ></Image>
                    </View>
                    <View style = {styles.dealTextContainer}>
                      <Text style = {{fontWeight:600, fontSize:19}}>Food Bank</Text>
                      <Text style = {{marginTop:5}}>5 occuring deals</Text>
                    </View>
                    <Button
                      style = {styles.buttonsInside}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderRadius: 30,
                      }}
                      ><Icon name="chevron-right" color="black" />
                    </Button>
                  </View>
                  <View style = {styles.dealContainer}>
                    <View style = {styles.imageContainer}>
                      <Image style = {styles.dealStories} src="https://external-preview.redd.it/JfuQsaTmiI7w5bRdgcebjAO3i95B68pqkHpcdQPjEIs.jpg?width=640&crop=smart&auto=webp&s=d6e44852b2ff8e557c79884ba698a2f55208d3cb" ></Image>
                    </View>
                    <View style = {styles.dealTextContainer}>
                      <Text style = {{fontWeight:600, fontSize:19}}>David's Truck</Text>
                      <Text style = {{marginTop:5}}>3 occuring deals</Text>
                    </View>
                    <Button
                      style = {styles.buttonsInside}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderRadius: 30,
                      }}
                      ><Icon name="chevron-right" color="black" />
                    </Button>
                  </View>
                </View>
              </ScrollView>
              
            </View>
          </BottomSheetModal>
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
                  onPress={() => {
                    setShowPins(true);
                    setExpanded(true);
                    handlePresentModal();
                  }}
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
  places: {
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
  modalContainer:{
    display:"flex",
    height:"100%"
  },
  closeButton:{
    display:"flex",
    justifyContent:"center",
    alignItems:"flex-end"
  },
  dealsContainer:{
    elevation: 5,
    marginTop:20,
    marginRight:10,
    marginLeft:10,
    display:"flex",
    flexDirection:"column",
    gap:10,
    height:"100%",
  },
  dealContainer:{
    display:"flex",
    flexDirection:"row",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"white",
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems:"center",
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 100, 
    borderWidth: 3, 
    borderColor: '#0FADFF',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  dealStories: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2, 
    backgroundColor: 'white', 
  },
  dealTextContainer:{
    marginLeft:12,
    flex:1,
  },


  categoryContainer:{
    display:"flex",
    flexDirection:"row",
    gap:10,
    marginLeft:10
  },
  categoryScrollView:{
    marginTop:10,
  }

});
