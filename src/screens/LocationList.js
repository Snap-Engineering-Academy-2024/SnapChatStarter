import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const GOOGLE_PLACES_API_KEY = 'AIzaSyD1TVCW8x7v_HYXD0tS3rmFfx5BOn_TOxI';

const LocationList = ({ places, onPlacePress, searchFunc, onClose }) => {
  const [placeDetails, setPlaceDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setLoading(true);
      try {
        const details = {};
        for (const place of places) {
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_PLACES_API_KEY}`
            );
            const result = response.data.result || {};
            const openingHours = result.opening_hours;
            details[place.place_id] = openingHours ? openingHours.open_now : null;
          } catch (error) {
            console.error(`Error fetching details for place_id ${place.place_id}:`, error);
            details[place.place_id] = null;
          }
        }
        setPlaceDetails(details);
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [places]);

  const renderItem = ({ item }) => {
    const isOpen = placeDetails[item.place_id];
    const isOpenStatus = isOpen !== null ? (isOpen ? 'Open Now' : 'Closed') : 'Status Not Available';
    const statusColor = isOpen !== null ? (isOpen ? 'green' : 'red') : 'gray';

    return (
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
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#424243" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.modalTitle}>Explore SafeHaven</Text>
          <Text style={styles.subTitle}>Essential Housing Resources</Text>
        </View>
        {/* Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchFunc("career center homeless social service")}
          >
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
      </View>
      
      {/* List Container */}
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={(item) => item.place_id}
            style={styles.list}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    width: '100%', // Ensures full width
    position: 'relative',
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
  },
  headerTextContainer: {
    marginRight: 80, // Adjust to accommodate close button
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
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
  },
  vicinity: {
    fontSize: 14,
    color: "#888",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
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
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  listContainer: {
    flex: 1, // Ensures the list fills the remaining space
  },
  list: {
    marginTop: 20,
  },
});

export default LocationList;
