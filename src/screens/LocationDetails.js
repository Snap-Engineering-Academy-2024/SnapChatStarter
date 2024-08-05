import React from 'react';
import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Dimensions} from 'react-native';


const { height } = Dimensions.get('window');

export default function LocationDetails({ place, onClose }) {

  return (
    <View style={styles.modalOverlay}>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.details}>Address: {place.vicinity}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height / 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
});
