import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Button, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase"; // Import Supabase client
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";

export default function InfoScreen() {

  const navigation = useNavigation();
  const [eventURL, setEventUrl] = useState('https://afrotechconference.com/')
  const handleBack = () => navigation.navigate("Section");

  return (
    <SafeAreaView>
      <View alignItems="Left">
        <Button onPress={handleBack} title="< Section" />
      </View>
      <Text>
        "Hi I'm the Info Screen"
      </Text>
      <Button
      onPress={() => {
        Linking.openURL(eventURL);
      }}
      title={"Event Page"}
      color="brown"
      accessibilityLabel="Event info redirect button"
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