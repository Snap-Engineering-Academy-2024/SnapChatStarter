import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Dimensions, Image} from 'react-native';
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { fontHeader } from '../../assets/themes/font';

export default function FavoriteScreen({ places, onClose, onPlacePress}) {

  return (
    <View style={styles.container}>
        <Text>Hi Areli </Text>
        <Text>Here is what places variable look like after I get from supabase and pass to you</Text>
        <Text>{JSON.stringify(places,null,4)}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: '#fff',
  },
});
