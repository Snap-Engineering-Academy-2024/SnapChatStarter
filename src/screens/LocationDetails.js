import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function LocationDetails({ place }) {


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.details}>Address: {place.vicinity}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
