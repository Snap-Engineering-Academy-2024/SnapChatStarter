import React from "react";
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog, FAB } from "@rneui/themed";

export default function Actions({ isVisible, onClose }) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [event, setEvent] = useState({});

  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Button title="Snap A Friend"></Button>
      <Button title="Share A Memory"></Button>
      <Button title="Chat With ..."></Button>
      
    </Dialog>
  );
}
const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "yellow",
    width: "80%",
    // aspectRatio: 1,
    position: "absolute",
    alignSelf: "center",
    top: "20%",
    borderRadius: 20,
    padding: 20,
  },
  DialogueBox: {
    // height: "60%",
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
