import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors } from "../../assets/themes/colors";

export default function CityAndRightBar({ city, isSatellite, setIsSatellite }) {
  return (
    <>
      <View style={styles.cityContainer}>
        <View style={styles.circleContainer}>
          <Image 
            source={{ uri: 'https://i.postimg.cc/RZctxc7f/shelter-chile-unhcr-web.jpg' }} 
            style={styles.circleImage} 
          />
        </View>
        <View style={styles.textContainer} >
          <Text style={styles.cityText}>{city}</Text>
        </View>
      </View>

      <View style={styles.barContainer}>
        <TouchableOpacity>
          <View style={styles.circleContainerVertical}>
            <Image 
              source={{ uri: 'https://i.postimg.cc/RFpH5K01/Heat-Map-Icon.png' }} 
              style={styles.circleImage} 
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {isSatellite ? setIsSatellite(false) : setIsSatellite(true)}}>
          <View style={styles.circleContainerVertical}>
            <Image 
              source={{ uri: 'https://i.postimg.cc/q7LKw9V5/Satellite-Icon.png' }} 
              style={styles.circleImage} 
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.circleContainerVertical}>
            <Image 
              source={{ uri: 'https://i.postimg.cc/ZR5dMVJK/Memories-Icon.png' }} 
              style={styles.circleImage} 
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.circleContainerVertical}>
            <Image 
              source={{ uri: 'https://i.postimg.cc/bv8bQqMn/Arrow-Icon.png' }} 
              style={styles.circleImage} 
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    cityContainer: {
        position: 'absolute',
        top: 60,
        left: 112,
        height:44,
        width:200,
        alignItems: 'center',
        backgroundColor: colors.lighttransparent,
        borderRadius: 80,
        paddingHorizontal: 6,
        marginHorizontal: 4,
        flexDirection: 'row',
      },
    circleContainer: {
    width: 36, 
    height: 36,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#a05dcd", 
    overflow: 'hidden',
    },
    circleImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cityText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      barContainer: {
        borderRadius: 80,
        position: 'absolute',
        top: 120,
        right: 12,
        width: 44, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5, 
        paddingBottom: 5,
        backgroundColor: colors.lighttransparent,
        gap:5,
      },
      circleContainerVertical: {
        width: 35, 
        height: 35,
        borderRadius: 16,
        borderColor: "#a05dcd", 
        overflow: 'hidden',
      },
});
