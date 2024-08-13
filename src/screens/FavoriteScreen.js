import React, { useEffect, useState } from "react";
import {View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image} from "react-native";

export default function FavoriteScreen({ places, onClose, onPlacePress}) {
  const renderItem = ({ item }) => {
    const isOpen = item.opening_hours ? item.opening_hours.open_now : null;
    const isOpenStatus = isOpen !== null ? (isOpen ? 'Open Now' : 'Closed') : 'Status Not Available';
    const statusColor = isOpen !== null ? (isOpen ? 'green' : 'red') : 'gray';

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} onPress={() => onPlacePress(item)}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.vicinity} numberOfLines={2}>{item.vicinity}</Text>
            <Text style={[styles.status, { color: statusColor }]}>
              {isOpenStatus}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.resourcesTitle}>Favorites</Text>
      <FlatList
        data={places.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.place_id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingVertical:5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    borderColor: '#8A2BE2',
    borderWidth: 2.5,
    padding: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
    fontFamily: 'AvenirNext-Regular',
  },
  vicinity: {
    fontSize: 14,
    color: "#888",
    fontFamily: 'AvenirNext-Regular',
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: 'AvenirNext-Regular',
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginVertical: 5 ,
    fontFamily: 'AvenirNext-Regular',
  },
  list: {
    // marginTop: 5,
  },
});
//   return (
//     <View style={styles.container}>
//         <Text>Hi Areli </Text>
//         <Text>Here is what places variable look like after I get from supabase and pass to you</Text>
//         <Text>{JSON.stringify(places,null,4)}</Text>
//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingLeft: 20,
//     backgroundColor: '#fff',
//   },
// });
