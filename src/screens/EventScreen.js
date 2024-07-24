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
          <View style = {styles.userInfo}>
            <Image style = {styles.bitmojiUser} source = {{uri:"https://plus.unsplash.com/premium_photo-1664478383014-e8bc930be7c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"}}/>
            <Text style = {styles.username}>UserName Here</Text>
          </View>
          
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
    bitmojiUser:{
        width:50,
        aspectRatio:1,
        borderRadius:1000,

    },
    title:{
        textAlign:"left",
        backgroundColor:"grey",
    },
    userInfo:{
        display:"flex"
    }
})