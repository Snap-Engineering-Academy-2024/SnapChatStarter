import React, { useEffect, useState } from "react";
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
import { supabase } from "../utils/hooks/supabase";




export default function AddEvent({ isVisible, onClose }) {
  const insertData = async () => {
    const eventData = {
      id: btoa(title + time),
      title: title,
      description: description,
      location: location,
      time: time,
      imageURL:
        "https://sdk.bitmoji.com/render/panel/20087589-103221902646_4-s5-v1.png?transparent=1&palette=1&scale=2",
      host: {"userName":"","imageURL":"https://sdk.bitmoji.com/render/panel/20048676-103221902646_4-s5-v1.png?transparent=1&palette=1&scale=1"},
      attending: [{"userName":"","imageURL":""},{"userName":"","imageURL":""},{"userName":"","imageURL":""}],
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
        console.log(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.eventText}>Event Details</Text>
      <TextInput
        style={styles.inputFields}
        placeholder="Title"
        onChangeText={(newText) => setTitle(newText)}
        defaultValue={title}
      />
      <TextInput
        style={styles.descriptionField}
        placeholder="Description"
        onChangeText={(newText) => setDescription(newText)}
        defaultValue={description}
      />
      <TextInput
        style={styles.inputFields}
        placeholder="Time"
        onChangeText={(newText) => setTime(newText)}
        defaultValue={time}
      />
      <TextInput
        style={styles.inputFields}
        placeholder="Location"
        onChangeText={(newText) => setLocation(newText)}
        defaultValue={location}
      />
      <FAB
        icon={{ name: "upload", color: "white" }}
        style={styles.uploadButton}
        title="Upload Button"
        color="#65BEFF"
      />
      <FAB
        style={styles.closeIcon}
        onPress={onClose}
        color={"none"}
        icon={{ name: "close", color: "black" }}
      />

      <FAB
        style={styles.uploadButton}
        title="Submit"
        color="#289CF1"
        onPress={insertData}
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
  DialogueBox: {
    height: "60%",
    borderRadius: 20,
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
  otherButtons: {
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  uploadButton: {
    marginTop: 16,
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
