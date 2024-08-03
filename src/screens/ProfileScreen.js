import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import DraggableButtonList from "../components/DraggableButtons";
import AboutSheet from "../components/AboutSheet";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProfileSections from "../components/ProfileSections";
import ProfileHeader from "../components/ProfileHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const userJoinStaus = findJoinStatus();
  const [joined, setJoined] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const insets = useSafeAreaInsets();
  // const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    setAstrology(userSign.sign);
  }, [userSign.sign]);

  const SnapTogetherRedirect = async () => {
    if (userJoinStaus) {
      navigation.navigate("SnapTogether");
    } else {
      setShowAbout(true);
    }
  };
  const badgeOnPressHandlers = {
    [astrology]: () => navigation.navigate("Astrology"),
    "🫶🏻🫶🏽🫶🏿": SnapTogetherRedirect,
  };

  const sectionOnPressHandlers = {
    "Add to My Story": () => navigation.navigate("Camera"),
    "Add Friends": () => navigation.navigate("AddFriend"),
    "My Friends": () => navigation.navigate("Chat"),
    "Add Your School": () => navigation.navigate("Profile"),
    "SnapTogether": SnapTogetherRedirect,
  }

  return (
    <View
      style={{
        flex: 0.9,
        flexDirection: "column",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        // marginBottom: tabBarHeight,
      }}
    >
      <ProfileHeader />
      <View style={styles.topContainer}>
        <Image
          source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
          style={styles.avatar}
        />
        <DraggableButtonList
          onPressHandlers={badgeOnPressHandlers}
          astrology={astrology}
        />
        <View>
          <AboutSheet showAbout={showAbout} setShowAbout={setShowAbout} />
        </View>
      </View>
      <View>
        <ProfileSections onPressHandlers={sectionOnPressHandlers}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
    marginTop: 20,
  },
  draggableContainer: {
    height: 100,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "black",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
