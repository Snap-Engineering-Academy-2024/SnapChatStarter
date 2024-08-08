import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Dimensions, Image} from 'react-native';
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { fontHeader } from '../../assets/themes/font';

const defaultImages = [
  'https://i.postimg.cc/HsnZ2XZ4/3-Bitmojis-Icon.png',
  'https://i.postimg.cc/RZctxc7f/shelter-chile-unhcr-web.jpg',
  'https://i.postimg.cc/RZctxc7f/shelter-chile-unhcr-web.jpg'
];

const { height, width} = Dimensions.get('window');

export default function LocationDetails({ place, onClose, getImageCanSee  }) {
  const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchImages = async () => {
    let fetchedImages = [];
    if (place.photos && place.photos.length > 0) {
      fetchedImages = await Promise.all(
        place.photos.map(photo => getImageCanSee(photo.photo_reference))
      );
    }

    if (fetchedImages.length === 0) {
      fetchedImages = defaultImages;
    }
    setImages(fetchedImages);
    // setLoading(false);
  };

  fetchImages();
}, [place]);

  let price = "$";
  const Circle = () => {
    return <View style={styles.circle} />;
  };
let rootDomain;
  if (typeof place.website !='undefined') {
    const parsedUrl = new URL(place.website);
    const hostname = parsedUrl.hostname;
    const domainParts = hostname.split('.');
    rootDomain = domainParts.slice(-2).join('.');
  }
  

  // const urlRegex = /<a href="([^"]*)">/;
  // const match = place.photos[0].html_attributions[0].match(urlRegex);
  // let photoURL;
  // // If a match is found, return the URL
  // if (match && match[1]) {
  //   photoURL = match[1];
  // }

  // const getDayOfWeek = () => {
  //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   const today = new Date();
  //   return daysOfWeek[today.getDay()];
  // };

  // const todayDayOfWeek = getDayOfWeek();

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
          <View style={{width: width/2, flexDirection:"row"}}> 
            <View style={{flexDirection: "row", flexWrap: "wrap", width: width/2}}> 
            <View style={{width: width/2}}>
              <Text style={styles.title}>{place.name}</Text>
            </View>
              
            {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity> */}   
            <Text style={{ textTransform: 'capitalize', width: width/2, color: "grey" }}>{place.types[0]} - ${price.repeat(place.price_level)}</Text>
            {
              typeof place.opening_hours != "undefined" && 
              <Text>     
              {
                place.opening_hours.open_now && 
                <Text style={{color: "green"}}>Open Now</Text>
              }
              {
                !place.opening_hours.open_now &&
                <Text style={{color: "red"}}>Closed</Text>
              }
              <Text style={{color: "grey"}}> - {place.address_components[2].long_name}, {place.address_components[3].long_name}</Text>
              </Text>
            }
            {/* <View style={styles.iconContainer}>
                <Ionicons name="star-outline" size={20} color="black" />
            </View> */}</View>
            <View style={{width: width/8, direction: "rtl"}}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.spotlight}>
          {/* <Image source={{uri: photoURL}}/> */}
          <Rectangle></Rectangle>
          <Rectangle></Rectangle>
          <Rectangle></Rectangle>
        </ScrollView>

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
                <View>
                  <Text style={{width: width / 1.5,}}>Address</Text>
                  <Text style={{color: "grey"}}>{place.address_components[0].long_name} {place.address_components[1].short_name}</Text>
                  <Text style={{color: "grey"}}>{place.address_components[3].long_name}, {place.address_components[5].long_name} {place.address_components[7].long_name}</Text>
                </View>
                
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
                <View>
                  <Text style={{width: width / 1.5,}}>Call</Text>
                  <Text style={{color: "grey"}}>{place.formatted_phone_number}</Text>
                </View>
                
                <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
              </View>
            </TouchableOpacity>
{
typeof place.website !='undefined' && 
<TouchableOpacity>
              <View style={styles.footerButton}>
                <View style={styles.iconContainer}>
                  <Ionicons name="earth-outline" size={20} color="black" />
                </View>
                <View>
                  <Text style={{width: width / 1.5,}}>Visit Website</Text>
                  <Text style={{width: width / 1.5, color: "grey"}}>{rootDomain}</Text>
                </View>
                
                <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward-outline" size={20} color="grey"/>
            </View>
              </View>
            </TouchableOpacity>
}
            

            <TouchableOpacity>
              <View style={styles.footerButton}>
                <View style={styles.iconContainer}>
                  <Ionicons name="flag-outline" size={20} color="black" />
                </View>
                <Text style={{width: width / 1.5, alignSelf: "center"}}>Report an issue</Text>
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
    paddingLeft: 20,
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
    fontSize: 18,
    fontWeight: '600',
    // marginBottom: 10,
    flexWrap: "wrap"
  },
  details: {
    //fontSize: 16,
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
    columnGap: 10,
    marginBottom: 25,
    width: width/1.5 ,
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
    //marginRight: 6,
    flexDirection: "row",
    alignSelf: "center"
  },
  rectangle: {
    width: 70 * 2,
    height: 200,
    backgroundColor: "grey",
    borderRadius: 5,
    marginRight: 20
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
    columnGap: 0
  },
  tagButton: {
    backgroundColor: colors.belowPage,
    borderRadius: 80,
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
    columnGap: 30,
    paddingRight: 30,
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
  },
  closeButton: {
    top: 20,
    right: 20,
    backgroundColor: colors.belowPage,
    borderRadius: 25,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    direction: "rtl"
  },
});
