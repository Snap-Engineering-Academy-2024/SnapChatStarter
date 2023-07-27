import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChatScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "Chats"));
    querySnapshot.forEach((doc) => {
      setUsers((users) => [...users, doc.id]);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          // Paddings to handle safe area
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
        {users?.map((user) => {
          return (
            <TouchableOpacity
              style={styles.userButton}
              onPress={() => {
                navigation.navigate("Conversation", {
                  userId: user,
                });
              }}
              key={user}
            >
              <Ionicons
                style={styles.userIcon}
                name="ios-person-outline"
                size={36}
                color="lightgrey"
              />
              <Text style={styles.userName}> {user} </Text>
              <Ionicons
                style={styles.userCamera}
                name="ios-camera-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>
          );
        })}
      </View>
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
});
