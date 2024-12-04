// CommunityChat.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommunityChat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Community Chats will be displayed here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 18,
    color: "grey",
  },
});

export default CommunityChat;
