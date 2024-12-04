import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { colors } from "../../assets/themes/colors";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomSheet, Button } from "@rneui/themed";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProfileHeader() {
  const navigation = useNavigation();

  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.headerLeft}>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <Icon name="arrow-back" size={22} color="white"/>
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.buttons}
        >
          <Icon name="ios-share" size={22} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={22} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.bottomContainer}>
    <View style={styles.headerLeft}>
        <Pressable
          style={styles.buttons}
        >
          <Icon name="checkroom" size={22} color="white"/>
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.buttons}
        >
          <Icon name="image" size={22} color="white"/>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: SCREEN_HEIGHT / 4
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
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
    backgroundColor: "rgba(0, 0, 0, .5)"
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    top: "75%"
  }
});
