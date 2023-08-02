import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import StoriesBitmoji from "../components/StoriesBitmoji";
import DiscoverFeed from "../components/DiscoverFeed";

import Header from "../components/Header";

export default function StoriesScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

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
      <Header title="Stories" />
      <Text style={styles.Friends}>Friends</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.bitmojiContainer, styles.shadow]}>
          <StoriesBitmoji />
          <StoriesBitmoji />
          <StoriesBitmoji />
          <StoriesBitmoji />
          <StoriesBitmoji />
          <StoriesBitmoji />
          <StoriesBitmoji />
        </View>
      </ScrollView>
      <Text style={styles.Friends}>Discover</Text>
      <ScrollView>
        <View style={styles.DiscoveryContainer}>
          <DiscoverFeed />
          <DiscoverFeed />
          <DiscoverFeed />
          <DiscoverFeed />
          <DiscoverFeed />
          <DiscoverFeed />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  bitmojiContainer: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  DiscoveryContainer: {
    flexDirection: "row",
    flex: "wrap",
  },
  myBitmoji: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  bitmojiImage: {
    width: 50,
    height: 50,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    fontSize: 10,
    fontWeight: "700",
  },
  Friends: {
    textAlign: "left",
    paddingLeft: 15,
    paddingBottom: 15,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: "700",
  },
});
