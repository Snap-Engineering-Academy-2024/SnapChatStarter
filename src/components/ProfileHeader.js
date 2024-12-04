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

export default function ProfileHeader() {
  const navigation = useNavigation();

  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={[styles.profile, styles.buttons]}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <Icon name="arrow-back" size={24} />
        </Pressable>
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.emailText}>
          {user &&
            user.user_metadata &&
            user.user_metadata.email.slice(
              0,
              user.user_metadata.email.indexOf("@")
            )}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.shareButton}
          //   onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="share" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={24} />
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
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
    alignSelf: "flex-end",
    marginBottom: 16,
    marginRight: 10,
  },
  settingsButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
    marginRight: 25,
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 18
  },
});
