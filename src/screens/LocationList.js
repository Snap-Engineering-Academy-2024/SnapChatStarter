import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

// Placeholder image URL (can be replaced with any image URL or local image)
const placeholderImage = "https://via.placeholder.com/50";

const LocationList = ({ places, onPlacePress, searchFunc, onClose }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPlacePress(item)}>
      <Image source={{ uri: placeholderImage }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.vicinity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Location List Page</Text>
      <TouchableOpacity onPress={onClose}><Text>Close</Text></TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for places"
        onSubmitEditing={(event) => searchFunc(event.nativeEvent.text)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => searchFunc("career center homeless social service")}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="business" size={20} color="white" />
          </View>
          <Text style={styles.buttonText}>Career Center</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => searchFunc("hospital emergency")}
        >
          <Text style={styles.buttonText}>Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => searchFunc("public shower OR park")}
        >
          <Text style={styles.buttonText}>Public Areas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => searchFunc("food bank free food")}
        >
          <Text style={styles.buttonText}>Food Bank</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.place_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: colors.belowPage,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.belowPage,
    borderRadius: 80,
    padding: 10,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    backgroundColor: colors.belowPage,
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 10,
    marginHorizontal: 3,
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
    backgroundColor: "#1E90FF",
    borderRadius: 100,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
});

export default LocationList;
