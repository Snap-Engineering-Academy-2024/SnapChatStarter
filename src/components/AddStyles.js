import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import styles from "./StoriesBitmoji"

// import StoriesBitmoji from "../components/StoriesBitmoji";

import Header from "../components/Header";
import StoriesBitmoji from "./StoriesBitmoji";

export default function AddStyles() {
  const navigation = useNavigation();
  return (
    <View style={addstorystyles.addstory}>
      <Pressable //added a presable to give the story interaction
      style={[styles.profile, styles.buttons]}
      onPress={() => {
        navigation.navigate("FriendStory");
      }}>
        <Image
          style={addstorystyles.addstoryImage}
          source={require("../../assets/snapchat/personalBitmoji.png")}
        />
      </Pressable>
      <View style={addstorystyles.addstoryTextContainer}>
        <Text style={addstorystyles.addstoryText}>Add To Story</Text>
      </View>
    </View>
  );
}

const addstorystyles = StyleSheet.create({
  addstory: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    paddingBottom: 10,
  },
  addstoryImage: {
    width: 60,
    height: 60,
  },
  addstoryTextContainer: {
    borderRadius: 20,
    padding: 4,
  },
  addstoryText: {
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "700",
  },
});