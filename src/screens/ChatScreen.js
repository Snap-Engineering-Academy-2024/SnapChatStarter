import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase";
import StoriesBitmoji from "../components/StoriesBitmoji";

import { FAB } from "@rneui/themed";

import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";

import AddEvent from "../components/AddEvent";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  function getChatbots() {
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId });
    }

    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  useEffect(() => {
    if (chats.length < 1) {
      getChatbots();
    }
  }, [chats.length]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />
      <View>
        {chats?.map((chat) => (
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => {
              navigation.navigate("Conversation", {
                isChatbot: chat.isChatbot,
                chatId: chat.chatId,
              });
            }}
            key={chat.chatId}
          >
            <Ionicons
              style={styles.userIcon}
              name="person-outline"
              size={36}
              color="lightgrey"
            />
            <Text style={styles.userName}> {chat.chatId} </Text>
            <Ionicons
              style={styles.userCamera}
              name="camera-outline"
              size={24}
              color="lightgrey"
            />
          </TouchableOpacity>
        ))}
      </View>
      <FAB
        style={styles.addButton}
        visible={true}
        icon={{ name: "star", color: "white" }}
        color="#3CB2E2"
      />
      <FAB
        style={styles.addButtonSecond}
        visible={true}
        icon={{ name: "edit", color: "white" }}
        color="#FF3386"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  userButton: {
    padding: 25,
    display: "flex",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  userIcon: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  userName: {
    position: "absolute",
    left: 50,
    top: 14,
    fontSize: 18,
  },
  userCamera: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
  },
  addButtonSecond: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
