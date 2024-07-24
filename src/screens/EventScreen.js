import React from 'react'
import { Card } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function EventScreen({ route, navigation }) {
    return (
    <View>
        <View style={styles.container}>
          <Image
              style={{width:"100%", aspectRatio:1}}
              resizeMode="contain"
              source={{ uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4" }}
            />
          <Card.Title style = {styles.title}>Sona's Birthday</Card.Title>
          <Text style = {styles.username}>UserName Here</Text>
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"red",
        display:"flex",
        justifyContent:"space-between",
        // alignItems:"center",
        padding:20,
        gap:10
    },
    title:{
        textAlign:"left",
        backgroundColor:"blue",
    }
})