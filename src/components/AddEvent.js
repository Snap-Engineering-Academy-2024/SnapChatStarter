import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity } from "react-native";

export default function AddEvent() {
  return (
    <View style = {styles.userInfo}>
       <Text style = {styles.eventText}>CREATE EVENT</Text> 
       <TextInput style = {styles.inputFields} placeholder = "Title"></TextInput>
       <TextInput style = {styles.descriptionField} placeholder = "Description"></TextInput>
       <TextInput style = {styles.inputFields} placeholder = "Time"></TextInput>
       <TextInput style = {styles.inputFields} placeholder = "Location"></TextInput>
       <Button style = {{backgroundColor:"pink"}} title = "Upload Picture"/>
    </View>
  )
}
const styles = StyleSheet.create({
    userInfo:{
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"yellow",
        width:"80%",
        aspectRatio:1,
        position:"absolute",
        alignSelf:"center",
        top:"20%",
        borderRadius:20,
        padding:20,


    },
    eventText:{
        textAlign:"center",
        fontSize:23,
        fontWeight:"bold",
    },
    inputFields:{
        marginTop:10,
        backgroundColor:"#F0F0F0",
        padding:5,
        borderRadius:5,
    },
    descriptionField:{
        marginTop:10,
        backgroundColor:"#F0F0F0",
        padding:5,
        borderRadius:5,
        paddingBottom:30,
    },
    uploadButton:{
        backgroundColor:"blue",
        color:"white",
        padding:20,
        marginTop:20,
    }
})
