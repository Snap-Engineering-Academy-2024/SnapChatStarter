import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const LocationDetails = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{place.name}</Text>
      <Text>{place.vicinity}</Text>
      {place.rating && (
        <Text>Rating: {place.rating} ({place.user_ratings_total} reviews)</Text>
      )}
      {place.opening_hours && (
        <Text>{place.opening_hours.open_now ? "Open Now" : "Closed"}</Text>
      )}
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default LocationDetails;
