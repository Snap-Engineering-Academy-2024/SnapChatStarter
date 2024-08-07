import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native-elements";

const LocationList = ({ places, onPlacePress, searchFunc, onClose }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPlacePress(item)}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.vicinity} numberOfLines={2}>{item.vicinity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.modalTitle}>Explore SafeHaven</Text>
        <Text style={styles.subTitle}>Essential Housing Resources</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunc("career center homeless social service")}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="business" size={20} color="white" />
            </View>
            <Text style={styles.buttonText}>Nonprofits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunc("police hospital emergency")}
          >
            <Text style={styles.buttonText}>Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunc("free wifi place")}
          >
            <Text style={styles.buttonText}>Wifi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunc("food bank free food salvation army")}
          >
            <Text style={styles.buttonText}>Food Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunc("free shower library")}
          >
            <Text style={styles.buttonText}>Public Areas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <FlatList
        data={places}
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
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
    width: '100%', // Ensures the container takes full width of its parent
  },
  headerContainer: {
    backgroundColor: "#FFFFFF", // White background for combined text section and buttons
    padding: 20, // Padding around the text and buttons
    borderRadius: 8, // Optional: rounded corners
    marginBottom: 20, // Space below the header
    width: '100%', // Ensures headerContainer takes full width of container
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#555',
  },
  scrollContainer: {
    marginTop: 10, // Space between text and buttons
    paddingHorizontal: 8, // Ensure buttons don't touch the edges
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', // Center text vertically
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  vicinity: {
    fontSize: 16,
    color: "#777",
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    paddingBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 2,
    zIndex: 1,
  },
  list: {
    marginTop: 20, // Space between the scrollable buttons and FlatList
  },
});

export default LocationList;
