import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import AboutSheet from "../components/AboutSheet";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SnapTogetherHeader() {
  const navigation = useNavigation();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={[styles.profile, styles.buttons]}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Icon name="arrow-back" size={22} color="white"/>
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        {/* <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            setShowAbout(true);
          }}
          accessibilityLabel="Show About Sheet"
        >
          <Icon
            name="info"
            size={22}
            color="white"
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={22} color="white"/>
        </TouchableOpacity>
      </View>
      <View>
        <AboutSheet showAbout={showAbout} setShowAbout={setShowAbout} />
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
    alignItems: "center",
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
    backgroundColor: "rgba(0, 0, 0, .5)"
  },
  shareButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
    marginRight: 10,
  },
  settingsButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
    marginRight: 8,
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
