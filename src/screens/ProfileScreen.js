import { Image, Text, View, Button, StyleSheet, Pressable } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import AboutSheet from "../components/AboutSheet";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";

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
  const userJoinStaus = findJoinStatus();
  const [joined, setJoined] = useState("false");
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    setAstrology(userSign.sign);
  }),
    [];

  function SnapTogetherRedirect() {
    if(userJoinStaus){
      navigation.navigate("SnapTogether");
    } else {
      console.log("You need to join!")
      setShowAbout(true)
    }

  }

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
      <Text
        style={{
          justifyContents: "center",
          textAlign: "center",
        }}
      >
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@") // gets part before @ of email address, should use profile username instead
          )}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("Astrology");
        }}
        title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => {
          SnapTogetherRedirect()
        }}
        title={"Snap Together Badge"}
        color="brown"
        accessibilityLabel="The Badge for Snap Together"
      />
      <Button
        onPress={() => {
          SnapTogetherRedirect()
        }}
        title={"Snap Together"}
        color="brown"
        accessibilityLabel="Snap Together redirect button"
      />
      <Button onPress={handleSignOut} title="Log Out" />
      <Pressable>
        <Button
          onPress={() => {
            navigation.navigate("Settings", {});
          }}
          title="Settings"
        />
      </Pressable>
      <AboutSheet showAbout={showAbout} setShowAbout={setShowAbout}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignItems: "center",
  },
});
