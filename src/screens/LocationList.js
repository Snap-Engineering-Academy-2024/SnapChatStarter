import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";


const { height } = Dimensions.get('window');

export default function LocationList({ places, onClose, searchFunc }) {
    const handlePress = (place) => {
        console.log("I just clikced a location!")
    };

    return (
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Nearby Places</Text>
            <FlatList
              data={places}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)} style={styles.placeContainer}>
                  <Text style={styles.placeName}>{item.name}</Text>
                  <Text style={styles.placeVicinity}>{item.vicinity}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => searchFunc("Korean food")} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Korean Food</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
}

    
    const styles = StyleSheet.create({
      modalOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height / 2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
      },
      modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      placeContainer: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 15,
        marginVertical: 8,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
      },
      placeName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
      placeVicinity: {
        fontSize: 14,
        color: "#666",
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      closeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    });