import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Button } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import DraggableButtonList from "../components/DraggableButtons";

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
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

  useEffect(() => {
    setAstrology(userSign.sign);
  }, [userSign.sign]);

  const onPressHandlers = {
    Astrology: () => navigation.navigate("Astrology"),
    "Snap Together Badge": () => navigation.navigate("SnapTogether"),
    "Snap Together": () => navigation.navigate("SnapTogether"),
    "Log Out": handleSignOut,
    Settings: () => navigation.navigate("Settings"),
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.emailText}>
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@")
          )}
      </Text>
      <DraggableButtonList onPressHandlers={onPressHandlers} />
      <View>
        <Button onPress={handleSignOut} title="Log Out" />
        <Button
          onPress={() => navigation.navigate("Settings")}
          title="Settings"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  emailText: {
    justifyContents: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
