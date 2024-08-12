import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
// import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import { findAstrologySign } from "../utils/hooks/findAstrologySign";
// import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button, Icon } from "@rneui/base";
import { useFonts } from "expo-font";

// const handleSignOut = async () => {
//   try {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.error("Error signing out:", error.message);
//     } else {
//       // Handle successful sign out (e.g., redirect to login screen)
//     }
//   } catch (error) {
//     console.error("Unexpected error:", error);
//   }
// };

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [loaded, error] = useFonts({
    "AvenirNext-Regular": require("../../assets/fonts/AvenirNext-Regular.ttf"),
  });

  // const { user } = useAuthentication();
  // const [profile, setProfile] = useState(null);
  // const [astrology, setAstrology] = useState("Pisces");
  // const userSign = findAstrologySign();

  // useEffect(() => {
  //   setAstrology(userSign.sign);
  //   if (user) {
  //     fetchProfiles();
  // }
  // }),
  //   [], [user];

  // async function fetchProfiles() {
  //     // console.log("2 FETCHPROFILES CALLED");
  //     try {
  //         const { data, error } = await supabase
  //             .from('profiles')
  //             .select('*')
  //             .eq('username', user.email)
  //             .single();
  //         if (error) {
  //             throw error;
  //         }
  //         // console.log("DATA", JSON.stringify(data, null, 4));
  //         if (data) {
  //             await setProfile(data);
  //             // console.log("PROFILE", JSON.stringify(profile, null, 4));
  //         }
  //     }
  //     catch (error) {
  //         console.log("Error fetching profiles: ", error.message);
  //     }
  // };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../assets/profile-background.png")}
    >
      <View>
        <Text
          style={{
            fontFamily: "AvenirNext-Regular",
            fontSize: 17,
            fontWeight: "500",
            color: "#FFFFFF",
            marginTop: 538,
            marginLeft: 82,
          }}
        >
          Brain Bites{"\n"}
          <Text
            style={{
              fontSize: 13,
              color: "gray",
            }}
          >
            Games for learning!
          </Text>
        </Text>
        <Button
          title="Play now"
          titleStyle={{
            fontFamily: "AvenirNext-Regular",
            fontSize: 10,
            fontWeight: "600",
            color: "#FFFFFF",
          }}
          buttonStyle={{
            backgroundColor: "rgba(15, 173, 255, 1)",
            // marginTop: 540,
            borderRadius: 10,
            marginTop: 544,
            marginLeft: 94,
          }}
          onPress={() => navigation.navigate("Welcome")}
          accessibilityLabel="Navigate to Welcome screen"
        />
        <Icon
          name="chevron-right"
          color="white"
          marginTop={547}
          marginLeft={10}
        />
      </View>
      {/* <View style={{ alignItems: "center" }}>
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
        {profile?.full_name}
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
          navigation.navigate("Welcome");
        }}
        title="Brain Bites"
        accessibilityLabel="Navigate to Brain Bites landing page"
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
    </View> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    aspectRatio: 390 / 863,
    flexDirection: "row",
  },
  // container: {
  //   width: "100%",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // avatar: {
  //   width: 150,
  //   height: 150,
  //   borderRadius: 150 / 2,
  //   alignItems: "center",
  // },
});
