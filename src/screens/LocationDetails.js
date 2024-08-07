import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Dimensions} from 'react-native';
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { fontHeader } from '../../assets/themes/font';

const { height, width} = Dimensions.get('window');

export default function LocationDetails({ place, onClose,  }) {

  let price = "$";
  const Circle = () => {
    return <View style={styles.circle} />;
  };

  const Rectangle = () => {
    return <View style={styles.rectangle} />;
  };
  console.log(JSON.stringify(place, null, 4));
  // console.log("TYPES", place.types[0])
  return (
    //<View style={styles.modalOverlay}>
      <ScrollView style={styles.container}>

        {/* HEADER OF LOCATION DETAILS*/} 
        <View style={styles.header}>
          <Circle></Circle> 
          <View> 
            <View style={styles.inline}> 
              <Text style={styles.title}>{place.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            </View>
                
            <Text style={{ textTransform: 'capitalize' }}>{place.types[0]} - ${price.repeat(place.price_level)}</Text>
            <Text>{(typeof place.opening_hours !='undefined')? (place.opening_hours.open_now? 'Open Now - ' : 'Closed - '):''}The Rocks</Text>
            {/* <View style={styles.iconContainer}>
                <Ionicons name="star-outline" size={20} color="black" />
            </View> */}
          </View>
         </View>

          {/* BUTTON SECTION */}
          <View style={styles.buttonSection}> 
            <TouchableOpacity style={styles.tagButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="add-outline" size={20} color="black" />               
              </View>
              <Text style={styles.tagButtonText}>Tag this place</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonSection}> 
            <TouchableOpacity style={styles.button}>
              <View style={styles.iconContainer}>
                <Ionicons name="heart-outline" size={20} color="black" />
              </View>
              <Text style={styles.buttonText}>95</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
              <View style={styles.iconContainer}>
                <Ionicons name="car-outline" size={20} color="black" />
              </View>
              <Text style={styles.buttonText}>1 hr</Text>
          </TouchableOpacity>   

          <TouchableOpacity style={styles.shareButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="caret-forward-outline" size={20} color="white" />
              </View>
          </TouchableOpacity>  
          </View>
          
       
        {/* END OF HEADER SECTION */}
        <TouchableOpacity>
          <View style={styles.donateButton}>
            <View style={styles.donateTextSection}>
              <Text style={styles.donateText}>Looking to Help? Donate now!</Text>
              <Text style={{color:"grey"}}>safeplaceforyouth.org</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
        </View>
        </TouchableOpacity>
        
        {/* SPOTLIGHT SECTION */}
        <View style={styles.spotlight}>
          <Rectangle></Rectangle>
          <Rectangle></Rectangle>
          <Rectangle></Rectangle>
        </View>

{
  typeof place.opening_hours !='undefined' && 
      <TouchableOpacity>
          <View style={styles.scheduleButton}>
            <View style={styles.iconContainer}>
                <Ionicons name="time-outline" size={20} color="black" />
              </View>
            <View style={{width: width / 1.6,}}>
              {
                place.opening_hours.open_now && 
                <Text style={{color: "green", fontSize: 15}}>Open Now</Text>
              }
              {
                !place.opening_hours.open_now &&
                <Text style={{color: "red", fontSize: 15}}>Closed</Text>
              }
              <Text style={{color: "grey"}}>8:00 AM - 2:00 PM</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="chevron-down-outline" size={20} color="grey"/>
            </View>
        </View>
        </TouchableOpacity>
}
        <View style={styles.footerButtonSection}>
            <TouchableOpacity>
              <View style={styles.footerButton}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location-outline" size={20} color="black" />
                </View>
                <Text style={{width: width / 1.5,}}>Address</Text>
                <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.footerButton}>
                <View style={styles.iconContainer}>
                  <Ionicons name="call-outline" size={20} color="black" />
                </View>
                <Text style={{width: width / 1.5,}}>Call</Text>
                <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.footerButton}>
                <View style={styles.iconContainer}>
                  <Ionicons name="earth-outline" size={20} color="black" />
                </View>
                <Text style={{width: width / 1.5,}}>Visit Website</Text>
                <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.footerButton}>
                <View style={styles.iconContainer}>
                  <Ionicons name="flag-outline" size={20} color="black" />
                </View>
                <Text style={{width: width / 1.5,}}>Report an issue</Text>
                <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
              </View>
            </TouchableOpacity>
        </View>

        <View style={{height: height/8}} ></View> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    //justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    flexWrap: "wrap"
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  circle: {
    width: width/6,
    height: width/6,
    borderRadius: 100 / 2,
    backgroundColor: "grey",
  },
  header: {
    flexDirection: "row",
    // flexWrap: "wrap",
    columnGap: 20,
    justifyContent: "flex-start",
    marginBottom: 10,
    width: width/2,
    alignSelf: "stretch",
  }, 
  closeButton: {
    alignSelf: "center",
    direction: "rtl"
  },
  inline: {
    flexDirection: "row",
    columnGap: 25,
  },
  button: {
    backgroundColor: colors.belowPage,
    borderRadius: 80,
    padding: 3,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    justifyContent: "center"
  },
  iconContainer: {
    // backgroundColor: "#1E90FF", 
    borderRadius: 100, 
    height: 30, 
    width: 30, 
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    flexDirection: "row",
    alignSelf: "center"
  },
  rectangle: {
    width: 70 * 2,
    height: 200,
    backgroundColor: "grey",
    borderRadius: 5
  },
  buttonSection: {
    flexDirection: "row",
    alignContent: "space-around",
    paddingBottom: 20,
    columnGap: 5
  }, 
  tagButtonText: {
    fontSize: 9,
    paddingRight: 5,
    columnGap: 0,
  },
  tagButton: {
    backgroundColor: colors.belowPage,
    // borderColor: "black",
    borderRadius: 80,
   // padding: 3,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    justifyContent: "center",
  },
  donateButton: {
    //alignSelf: "stretch",
    width: width/1.1,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: .1, 
    shadowOffset: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    columnGap: 10
  },
  donateText: {
    fontFamily: fontHeader.fontFamily,
    fontSize: 15,
    color: "#0FADFF",
    fontWeight: "600"
  },
  shareButton: {
    backgroundColor: "#0FADFF",
    borderRadius: 80,
    padding: 3,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    justifyContent: "center", 
  },
  donateTextSection: {
    width: width / 1.4,
  },
  spotlight: {
    flexDirection: "row",
    columnGap: 25,
    marginBottom: 15
  },
  scheduleButton: {
    width: width/1.1,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: .1, 
    shadowOffset: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    columnGap: 10
  },
  footerButton: {
    width: width/1.1,
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    borderBottomColor: "light grey",
    borderBottomWidth: .2,
    //columnGap: 10
  },
  footerButtonSection: {
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: .1, 
    shadowOffset: 10,
    borderRadius: 5,
    columnGap: 10
  }
});
