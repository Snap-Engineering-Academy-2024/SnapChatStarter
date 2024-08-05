import React, { useState, useEffect, useRef } from "react";
import "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
import { Button, ButtonGroup, Icon, withTheme, CheckBox } from '@rneui/themed';
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
  const [currentPin, setCurrentPin] = useState({
    title:"",
    location:{},
    address:"",
    description:"",
    deals:{},
    type:"",
    time:0,
  })
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
  const [sendButton, setSendButton] = useState(false);
  const [showPins, setShowPins] = useState(false); 
  const PinInfoSheet = useRef(null);
  const TimeInfoSheet = useRef(null);
  const RepeatInfoSheet = useRef(null);
  const TypeInfoSheet = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [checkAllDay, setCheckAllDay] = useState(true);
  const [deal, setDeal] = useState('');
  const [organization, setOrganization] = useState('');
  const [lastAddedPinIndex, setLastAddedPinIndex] = useState(null);


  const insertData = async (newPin) => {
    // New Pin is the object
    // title:"First", //user inpit (organization)
    //   location: {
    //     latitude: 34.0211573,
    //     longitude:  -118.4503864,
    //   }, //not user input
    //   address: "", //figure out how to implement when clickig on pin, not user input
    //   description:"new location", //not required, user input
    //   deals: {
    //     name:"", //the discounted item's name
    //     discount:"", //either free or some percentage off
    //     time:"", //default is all day for that day
    //   },
    // console.log(eventData)

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


    function createPinInfo() {
      PinInfoSheet.current?.present();
      setSendButton(false)
    }
    function TimeInfo() {
      TimeInfoSheet.current?.present();
    }
    function RepeatInfo(){
      RepeatInfoSheet.current?.present();
    }
    function TypeInfo(){
      TypeInfoSheet.current?.present();
    }


    function sendToDatabase(){
      setSendButton(true)
      PinInfoSheet.current?.close();
      console.log("sent")
      //push downn the modal
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

  useEffect(() => {
    console.log(currentPin);
  }, [currentPin]);
  const handleMapPress = (e) => {
    if(showPins){
      const newPin = {
        title: `Pin ${pins.length + 1}`,
        location: e.nativeEvent.coordinate,
        description: "User added pin",
        type:"food",
        time:24,

      };
      // console.log(newPin.location)
      // console.log(e.nativeEvent.coordinate)
      setPins([...pins, newPin]);
      setCurrentPin({
        location: newPin.location,
        title:newPin.title,
        description:newPin.description,
        time:newPin.time,
        type:newPin.type,
      })

// title:"First", //user inpit (organization)
    //   location: {
    //     latitude: 34.0211573,
    //     longitude:  -118.4503864,
    //   }, //not user input
    //   address: "", //figure out how to implement when clickig on pin, not user input
    //   description:"new location", //not required, user input
    //   deals: {
    //     name:"", //the discounted item's name
    //     discount:"", //either free or some percentage off
    //     time:"", //default is all day for that day
    //   },
      setLastAddedPinIndex(pins.length);
      createPinInfo();
    }
    
  };

  function deletePin(){
    if ((lastAddedPinIndex !== null) && (sendButton == false)) {
      setPins(pins.filter((_, index) => index !== lastAddedPinIndex));
      setLastAddedPinIndex(null); // Reset the tracker
    }
    }

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
        onDismiss={deletePin}

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
          <View paddingTop={30} style={styles.moreInfoContainer}>
            <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <View flexDirection={"column"}>
                <Text style={styles.moreInfoTitle}>All Day</Text>
                <Text style={styles.moreInfoSub}>This deal runs for 24 hours.</Text>
              </View>
               <CheckBox 
               checked={checkAllDay}
              onPress={() => setCheckAllDay(!checkAllDay)}/>
            </View>
          </View>

          <TouchableOpacity style ={styles.moreInfoContainer} onPress={TimeInfo}>
            <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <View flexDirection={"column"}>
                <Text style = {styles.moreInfoTitle}>Time</Text>
                <Text style = {styles.moreInfoSub}>From what time is this deal available?</Text>
              </View>
              <Icon name="arrow-forward-ios" size={15}/>
            </View> 
          </TouchableOpacity>
          <TouchableOpacity style ={styles.moreInfoContainer} onPress={RepeatInfo}>
            <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <View flexDirection={"column"}>
                <Text style = {styles.moreInfoTitle}>Repeat</Text>
                <Text style = {styles.moreInfoSub}>If applicable, enter the days this deal reoccurs.</Text>
              </View>
              <Icon name="arrow-forward-ios" size={15}/>
            </View> 
          </TouchableOpacity>
          <TouchableOpacity style ={styles.moreInfoContainer} onPress={TypeInfo}>
            <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <View flexDirection={"column"}>
                <Text style = {styles.moreInfoTitle}>Resource Type</Text>
                <Text style = {styles.moreInfoSub}>Select all filters that apply to this resource.</Text>
              </View>
              <Icon name="arrow-forward-ios" size={15}/>
            </View> 
          </TouchableOpacity>
          <Button
          onPress = {sendToDatabase} 
           buttonStyle={{backgroundColor: '#33BBFF', borderRadius: 30, width: 370}} 
           style={styles.postPin}>
            <Text style={styles.sendButton}>Send</Text>
            <Icon color={"white"} name="send" size={"15"}/>
          </Button>
        </View>
      </BottomSheetModal>
      <BottomSheetModal
      ref={TimeInfoSheet}
      index={0}
      snapPoints={snapPoints}
      >
        <Text style={styles.InfoHeader}> Time </Text>
        <View style={styles.moreInfoContainer}>
            <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <View flexDirection={"column"}>
                <Text style={styles.moreInfoTitle}>Start</Text>
                <Text style={styles.moreInfoSub}>What time does this deal begin?</Text>
              </View>
               <CheckBox 
               checked={checkAllDay}
              onPress={() => setCheckAllDay(!checkAllDay)}/>
            </View>
         </View>
         <View style={styles.moreInfoContainer}>
            <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <View flexDirection={"column"}>
                <Text style={styles.moreInfoTitle}>End</Text>
                <Text style={styles.moreInfoSub}>What time does this deal End?</Text>
              </View>
               <CheckBox 
               checked={checkAllDay}
              onPress={() => setCheckAllDay(!checkAllDay)}/>
            </View>
         </View>
      </BottomSheetModal>
      <BottomSheetModal
      ref={RepeatInfoSheet}
      index={0}
      snapPoints={snapPoints}
      >
        <Text style={styles.InfoHeader}> Repeat </Text>
        <View style={styles.moreInfoContainer}>
              <View flexDirection={"column"}>
                <Text style={styles.moreInfoTitle}>Repeat on</Text>
                <Text style={styles.moreInfoSub}>Select the day this deal repeats on.</Text>
              </View>
        </View>
      </BottomSheetModal>
      <BottomSheetModal
      ref={TypeInfoSheet}
      index={0}
      snapPoints={snapPoints}
      >
        <Text style ={styles.InfoHeader}>Type</Text>
      </BottomSheetModal>
      <View style={[styles.mapFooter, expanded ? styles.expanded : null]}> 
        <View style={styles.locationContainer}>
          <TouchableOpacity
            style={[styles.userLocation, styles.shadow]}
            onPress={() => {
              // console.log("Go to user location!");
              const { latitude, longitude } = location.coords;
              setCurrentRegion({ ...currentRegion, latitude, longitude });
            }}
          >
            <Ionicons name="navigate" size={15} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.bitmojiContainer]}>
          <BottomSheetModal backgroundStyle={{backgroundColor:"white"}} ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
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
                <View style = {styles.imageContainer}>
                  <Image style = {styles.mainStories} src="https://wallpapercave.com/wp/JTpVKUS.jpg" ></Image>
                </View>
                <View style = {{
                  display:"flex",
                }}>
                  
                  <Text style = {{fontSize:18, fontWeight:"600", marginBottom:5}}>Snap Bite</Text>
                  <Text style = {{marginBottom:4, color:"#1A9964", fontWeight:400, fontSize:12}}>45 Deals Nearby</Text>
                  <View style={{
                    display:"flex",
                    flexDirection:"row",
                    gap:4,
                    alignItems:"center"
                  }}>
                    <AntDesign name="star" size={16} color="#0894FA" />
                    <AntDesign name="star" size={16} color="#0894FA" />
                    <AntDesign name="star" size={16} color="#0894FA" />
                    <AntDesign name="star" size={16} color="#0894FA" />
                    <AntDesign name="staro" size={16} color="#0894FA" />
                    <Text style = {{fontSize:12, color:"#646567"}}>2034 Shares</Text>
                  </View>
                  
                </View>
              </View>

              <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}  style = {styles.categoryScrollView}>
                <View style = {styles.categoryContainer}>
                  <Button
                    title = "Bookmarks"
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 12, margin:3 }}
                    buttonStyle={{
                      borderWidth:1,
                      paddingTop:3,
                      paddingBottom:3,
                      paddingLeft:8,
                      paddingRight:8,
                      borderColor:"#E2E3E5",
                      backgroundColor: 'white',
                      borderRadius: 30,
                    }}
                    >
                  🎉 Big Groups</Button>
                  <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 12, margin:3 }}
                    buttonStyle={{
                      borderWidth:1,
                      paddingTop:3,
                      paddingBottom:3,
                      paddingLeft:8,
                      paddingRight:8,
                      borderColor:"#E2E3E5",
                      backgroundColor: 'white',
                      borderRadius: 30,
                    }}
                    >
                  🍾 Special Occasions</Button>
                  <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 12, margin:3 }}
                    backgroundStyle= {{backgroundColor:"red"}}
                    buttonStyle={{
                      borderWidth:1,
                      paddingTop:3,
                      paddingBottom:3,
                      paddingLeft:8,
                      paddingRight:8,
                      borderColor:"#E2E3E5",
                      backgroundColor: 'white',
                      borderRadius: 30,
                    }}
                    >
                  🏠 Family Friends</Button>
                  <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 12, margin:3 }}
                    backgroundStyle= {{backgroundColor:"red"}}
                    buttonStyle={{
                      borderWidth:1,
                      paddingTop:3,
                      paddingBottom:3,
                      paddingLeft:8,
                      paddingRight:8,
                      borderColor:"#E2E3E5",
                      backgroundColor: 'white',
                      borderRadius: 30,
                    }}
                    >
                  🍽 Restaurants</Button>
                  </View>
                  </ScrollView>
              </View>

              <View style = {styles.shareContainer}>
                <View style = {{flex:1}}>
                  <Button
                      titleStyle={{ fontWeight: "500", color:"black", fontSize: 12 }}
                      backgroundStyle= {{backgroundColor:"red"}}
                      buttonStyle={{
                        paddingTop:8,
                        paddingBottom:8,
                        backgroundColor: "#EDEEEF",
                        borderRadius: 30,
                      }}
                      >
                    <FontAwesome6 name="heart" size={20} color="black" /> 71</Button>
                  </View>

                  <View style = {{flex:1}}>
                    <Button
                      titleStyle={{ fontWeight: "500", color:"black", fontSize: 12}}
                      backgroundStyle= {{backgroundColor:"red"}}
                      buttonStyle={{
                        paddingTop:8,
                        paddingBottom:8,
                        backgroundColor: "#EDEEEF",
                        borderRadius: 30,
                      }}
                      >
                    <MaterialIcons name="filter-list" size={20} color="black" /> Filter</Button>
                  </View>
                  <View style = {{flex:1}}>
                    <Button
                    titleStyle={{ fontWeight: "500", color:"black", fontSize: 12}}
                    backgroundStyle= {{backgroundColor:"blue"}}
                    buttonStyle={{
                      paddingTop:8,
                      paddingBottom:8,
                      backgroundColor: "#0CADFF",

                      borderRadius: 30,
                    
                    }}
                    >
                  <FontAwesome6 name="share" size={20} color="white" />
                  </Button>
                  </View>

              </View>



              <ScrollView > 
                <View style = {styles.dealsContainer}>
                  <View style = {styles.dealContainer}>
                    <Image style = {styles.dealStories} src="http://www.dumpaday.com/wp-content/uploads/2017/01/random-pictures-109.jpg" ></Image>
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
                    <Image style = {styles.dealStories} src="https://tse3.mm.bing.net/th?id=OIP.7TgBB5DgbtJoSnCFIS7SJgHaHa&pid=Api&P=0&h=220" ></Image>
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
                    <Image style = {styles.dealStories} src="https://concepto.de/wp-content/uploads/2022/09/random-aleatorio-imprevisible-e1664563555843.jpg" ></Image>
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
                    <Image style = {styles.dealStories} src="https://external-preview.redd.it/JfuQsaTmiI7w5bRdgcebjAO3i95B68pqkHpcdQPjEIs.jpg?width=640&crop=smart&auto=webp&s=d6e44852b2ff8e557c79884ba698a2f55208d3cb" ></Image>
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
    gap:1,
    marginLeft:10,
    display:"flex",
    flexDirection:"column",
    // gap:10,
    backgroundColor: "red",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius:10,
  },
  dealContainer:{
    display:"flex",
    flexDirection:"row",
    paddingLeft:10,
    backgroundColor:"white",
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomWidth:1,
    borderBottomColor:"transparent",
    alignItems:"center",
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 100, 
    borderWidth: 2, 
    borderColor: '#0FADFF',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  dealStories: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: 'white',
    backgroundColor: 'white', 
  },
  mainStories:{
    width: 65,
    height: 65,
    borderRadius: 100,
    borderColor: 'white',
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
  
  },
  categoryScrollView:{
    marginTop:10,
  },
  sendButton: {
    color: "white",
    fontWeight: "500"
  }

});
