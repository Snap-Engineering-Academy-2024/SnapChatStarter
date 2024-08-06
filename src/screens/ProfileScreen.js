import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import DraggableButtonList from "../components/DraggableButtons";
import AboutSheet from "../components/AboutSheet";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";
import ProfileSections from "../components/ProfileSections";
import ProfileHeader from "../components/ProfileHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { BottomSheet } from "@rneui/themed";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const avatarBackground =
  "../../assets/SnapTogether/JadeBitmojiPlusBackground.png";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const userJoinStatus = findJoinStatus();
  const [showAbout, setShowAbout] = useState(false);
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);

  useEffect(() => {
    setAstrology(userSign.sign);
  }, [userSign.sign]);

  const SnapTogetherRedirect = async () => {
    if (userJoinStatus) {
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
    SnapTogether: SnapTogetherRedirect,
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require(avatarBackground)} style={styles.image}>
        <BottomSheet ref={sheetRef} snapPoints={["65", "70", "75", "80", "85"]}>
          <View style={styles.sections}>
            <ProfileSections onPressHandlers={sectionOnPressHandlers} />
          </View>
        </BottomSheet>
        <View style={{ paddingTop: insets.top }}>
          <ProfileHeader />
        </View>
        <View>
          <AboutSheet showAbout={showAbout} setShowAbout={setShowAbout} />
        </View>
        {/* Buttons for Profile Sections */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  bottomsheet: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    backgroundColor: "white",
    padding: 25,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
    top: SCREEN_HEIGHT / 3.5,
  },
});
