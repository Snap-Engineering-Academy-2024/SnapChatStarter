import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function CommunityScreen () {
    return (
      <View style={styles.container}>
        <Text>Community Screen</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

