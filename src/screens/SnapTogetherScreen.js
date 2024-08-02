import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase"; // Import Supabase client
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";

export default function SnapTogetherScreen() {
  const navigation = useNavigation();
  const handleBack = () => navigation.navigate("Profile");

  return (
    <SafeAreaView>
      <Button onPress={handleBack} title="<" />
      <Text>
        "Hi I'm the Snap Together Screen"
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("Section");
        }}
        title={"Sections"}
        color="brown"
        accessibilityLabel="Section redirect button"
      />
    </SafeAreaView>
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
