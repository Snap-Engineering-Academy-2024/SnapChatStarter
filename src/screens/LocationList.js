import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { colors } from "../../assets/themes/colors";

const LocationList = ({ places, onPlacePress, searchFunc }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPlacePress(item)}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.vicinity}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Location List Page</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for places"
        onSubmitEditing={(event) => searchFunc(event.nativeEvent.text)}
      />
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LocationList;
