import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../assets/themes/colors";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomSheet, Button } from "@rneui/themed";

export default function ProfileHeader() {
  const navigation = useNavigation();

  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <Icon name="arrow-back" size={22} />
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.buttons}
        >
          <Icon name="share" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={22} />
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
  }
});
