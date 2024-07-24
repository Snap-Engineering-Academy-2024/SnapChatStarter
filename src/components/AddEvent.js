import React from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";

export default function AddEvent() {
  return (
    <View style = {styles.userInfo}>
       <Text>Component</Text> 
    </View>
  )
}
const styles = StyleSheet.create({
    userInfo:{
        backgroundColor:"red",
        height:100,
        width:100,
        position:"absolute"
    }
})
