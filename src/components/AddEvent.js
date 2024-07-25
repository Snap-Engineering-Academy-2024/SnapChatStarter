import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Dialog } from "@rneui/themed";
import { supabase } from "../utils/hooks/supabase";


export default function AddEvent({ isVisible, onClose }) {

  const insertData = async () => {
    const eventData = {
      id: "20",
      title: "Sona's Birthday",
      description: "Come celebrate the 2nd coolest birthday ever!",
      location: "Santa Monica, CA",
      time: "2024-12-07 03:30:00+00",
      imageURL:
        "https://sdk.bitmoji.com/render/panel/20087589-103221902646_4-s5-v1.png?transparent=1&palette=1&scale=2",
      host: '{"userName":"","imageURL":"https://sdk.bitmoji.com/render/panel/20048676-103221902646_4-s5-v1.png?transparent=1&palette=1&scale=1"}',
      attending:
        '[{"userName":"","imageURL":""},{"userName":"","imageURL":""},{"userName":"","imageURL":""}]',
      private: "true",
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from("event_tbl") // 
        .insert([eventData]); // Insert the event data

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.eventText}>Event Details</Text>
      <TextInput style={styles.inputFields} placeholder="Title"></TextInput>
      <TextInput
        style={styles.descriptionField}
        placeholder="Description"
      ></TextInput>
      <TextInput style={styles.inputFields} placeholder="Time"></TextInput>
      <TextInput style={styles.inputFields} placeholder="Location"></TextInput>
      <Button title="Upload pic"> </Button>
      <Dialog.Actions>
        <Button title="Create Event" onPress={insertData} />
        <Button title="Close" onPress={onClose} />
      </Dialog.Actions>
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
  DialogueBox: {
    height: "60%",
    borderRadius: 20,
    // backgroundColor :"red"
  },
  eventText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  inputFields: {
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    padding: 5,
    borderRadius: 5,
  },
  descriptionField: {
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    padding: 5,
    borderRadius: 5,
    paddingBottom: 30,
  },
});
