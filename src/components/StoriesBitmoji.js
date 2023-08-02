import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
// import StoriesBitmoji from "../components/StoriesBitmoji";

import Header from "../components/Header";

export default function StoriesBitmoji() {
  return (
    <View style={styles.myBitmoji}>
      <Image
        style={styles.bitmojiImage}
        source={require("../../assets/snapchat/personalBitmoji.png")}
      />
      <View style={styles.bitmojiTextContainer}>
        <Text style={styles.bitmojiText}>Name</Text>
        <Text style={styles.usernameText}>Username</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bitmojiContainer: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  myBitmoji: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  bitmojiImage: {
    width: 60,
    height: 60,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.5,
  },
  Friends: {
    textAlign: "left",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
});
