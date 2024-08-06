
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Dimensions} from 'react-native';
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { fontHeader } from '../../assets/themes/font';

const { height } = Dimensions.get('window');

export default function LocationDetails({ place, onClose }) {

  let price = "$";
  let open;

  if (place.opening_hours.open_now) {
    open = "Open Now";
  } else {
    open = "Closed"
  }

  const Circle = () => {
    return <View style={styles.circle} />;
  };

  const Star = () =>  {
    return (
    <View style={styles.iconContainer}>
      <Ionicons name="star-outline" size={20} color="black" />
    </View>)
  }
  const Rectangle = () => {
    return <View style={styles.rectangle} />;
  };
  //console.log(JSON.stringify(place, null, 4));
  // console.log("TYPES", place.types[0])

  return (

    <View style={styles.modalOverlay}>
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
            <Text>{open} - The Rocks</Text>
            <View style={styles.iconContainer}>
              {/* <View style={styles.inline}> */}
                <Ionicons name="star-outline" size={20} color="black" />
              {/* <Ionicons name="star-outline" size={20} color="black" /> */}
              {/* </View> */}
            </View>
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
              <Text style={styles.buttonText}></Text>
          </TouchableOpacity>  
          </View>
          
       
        {/* END OF HEADER SECTION */}
        <View style={styles.donateButton}>
            <Text style={styles.donateText}>Looking to Help? Donate now!</Text>
            <Text>safeplaceforyouth.org</Text>
          </View>
        {/* SPOTLIGHT SECTION */}
        <View style={styles.inline}>
          <Rectangle></Rectangle>
          <Rectangle></Rectangle>
          <Rectangle></Rectangle>
        </View>
    </ScrollView>
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  details: {
    fontSize: 16,

    marginBottom: 10,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 100 / 2,
    backgroundColor: "grey",
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    justifyContent: "flex-start",
    marginBottom: 10
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
    flexDirection: "row"
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
    alignSelf: "stretch",
    width: 350,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: .1, 
    shadowOffset: 10,
    padding: 15,
    marginBottom: 15
  },
  donateText: {
    fontFamily: fontHeader.fontFamily,
    fontSize: 15,
    color: "#0FADFF"
  },
  shareButton: {
    backgroundColor: "#0FADFF",
    borderRadius: 80,
    padding: 3,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    justifyContent: "center"
  }
});

export default LocationDetails;
