import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";
import { Followers, More, Search } from "../../assets/snapchat/HeaderIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import Icon from "react-native-vector-icons/MaterialIcons";

import SelectionMenu from "./SelectionMenu";
const Stack = createStackNavigator();

export default function ProfileHeader() {
  const navigation = useNavigation();

  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={[styles.profile, styles.buttons]}
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <Icon name="arrow-back" size={24}/>
        </Pressable>
      </View>
      {/* <Text style={styles.title}>{title}</Text> */}
      <View style={styles.headerRight}>
      <TouchableOpacity
          style={styles.shareButton}
        //   onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="share" size={24}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={24}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  buttons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: colors.interactionGraySubtle,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  shareButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginRight: 50,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginRight: 25,
  },
});
