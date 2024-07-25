import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Dialog, FAB } from "@rneui/themed";
export default function AddEvent({ isVisible, onClose }) {
  return (
    <Dialog overlayStyle= {styles.DialogueBox} isVisible={isVisible} onBackdropPress={onClose}>
      <Text style={styles.eventText}>Event Details</Text>
      <TextInput style={styles.inputFields} placeholder="Title"></TextInput>
      <TextInput
        style={styles.descriptionField}
        placeholder="Description"
      ></TextInput>
      <TextInput value = "hello" style={styles.inputFields} placeholder="Time"></TextInput>
      <TextInput style={styles.inputFields} placeholder="Location"></TextInput>

      <FAB
        icon={{ name: "upload", color: "white" }}
        style = {styles.uploadButton}
        title="Upload Picture"
        color = "#65BEFF"
      />
    <FAB style = {styles.closeIcon} onPress={onClose}
        color = {"none"}
        icon={{ name: "close", color: "black" }}
    />

    <FAB
        style = {styles.uploadButton}
        title="Submit"
        color = "#289CF1"
      />
    </Dialog>
  );
}
const styles = StyleSheet.create({
  userInfo: {
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
  DialogueBox:{
    height: "60%",
    borderRadius:20,
  },
  eventText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  inputFields: {
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
  },
  descriptionField: {
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
    paddingBottom: 30,
  },
  otherButtons:{
    backgroundColor:"yellow",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    flexWrap:"wrap"
  },
  uploadButton:{
    marginTop:16,
    
  },
  closeIcon:{
    position:"absolute",
    top:0,
    right:0,
  }
});