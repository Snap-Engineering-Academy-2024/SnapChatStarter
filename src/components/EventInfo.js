import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity} from "react-native";
import { Card, FAB } from "@rneui/themed";

export default function EventInfo({ event, onClose }) {
    if (!event) return null;
  
    return (
      <View style={styles.EventInfo}>
        <Text style={styles.titleText}>{event.title}</Text>
        <Text style={styles.descriptionText}>{event.description}</Text>
        <Text style={styles.timeText}>{event.time}</Text>
        <Text style={styles.locationText}>{event.location}</Text>
        <Text style={styles.locationText}>Interested in Attending?</Text>
        <FAB
          title="Yes"
          color="#FF3386"
          onPress={() => console.log('Interested')}
        />
        <FAB
          title="Close"
          color="gray"
          onPress={onClose}
        />
      </View>
    );
  }

  
const styles = StyleSheet.create({
    EventInfo:{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "yellow",
        width: "80%",
        aspectRatio: 1,
        position: "absolute",
        alignSelf: "center",
        top: "20%",
        borderRadius: 20,
        padding: 20,
    },
    titleText:{
        color:"black",
        fontSize:25,
        textAlign:"center",
        marginBottom:10,
    },
    descriptionText:{
        textAlign:"center",
        fontSize:12,
        marginBottom:15,

    },
    timeText:{
        textAlign:"center"

    },
    locationText:{
        textAlign:"center"

    }
})
