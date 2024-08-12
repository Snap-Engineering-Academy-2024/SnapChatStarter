import { Text, View, Image, StyleSheet, Platform } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button, Icon } from "@rneui/base";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  async function fetchProfiles() {
    // console.log("2 FETCHPROFILES CALLED");
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", user.email)
        .single();
      if (error) {
        throw error;
      }
      // console.log("DATA", JSON.stringify(data, null, 4));
      if (data) {
        await setProfile(data);
        // console.log("PROFILE", JSON.stringify(profile, null, 4));
      }
    } catch (error) {
      console.log("Error fetching profiles: ", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/profile-top.png")}
        style={styles.profileTop}
      />
      <View style={styles.accountContainer}>
        <Image
          source={require("../../assets/edwina-qrcode.png")}
          style={styles.accountCode}
        />
        <Text style={styles.name}>
          {profile?.full_name}
          {"\n"}
          <Text style={styles.subheading}>edwinaaT</Text>
        </Text>
      </View>
      <Image
        source={require("../../assets/profile-middle.png")}
        style={styles.profileMiddle}
      />
      <View style={styles.featureContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/Ghost Logo (for light backgrounds) 6.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.heading}>
          Take a bite with Brain Bites!{"\n"}
          <Text style={styles.subheading}>Daily games for learning!</Text>
        </Text>
        <Button
          title="Play now"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Welcome")}
          accessibilityLabel="Navigate to Welcome screen"
        />
        <Icon
          name="chevron-right"
          color="white"
          marginTop={Platform.OS === "ios" ? 21 : 21}
          margin={10}
        />
      </View>
      <Image
        source={require("../../assets/profile-bottom.png")}
        style={styles.profileBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(21, 23, 22, 1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  profileTop: {
    marginTop: 30,
    height: Platform.OS === "ios" ? 320 : 290,
    width: Platform.OS === "ios" ? 420 : 390,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  accountContainer: {
    flexDirection: "row",
  },
  accountCode: {
    height: 70,
    width: 70,
    margin: 10,
    borderRadius: 10,
  },
  name: {
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginRight: Platform.OS === "ios" ? 210 : 190,
  },
  profileMiddle: {
    height: Platform.OS === "ios" ? 115 : 110,
    width: Platform.OS === "ios" ? 410 : 390,
  },
  featureContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(41, 41, 41, 1)",
    margin: 10,
    borderRadius: 10,
    borderColor: "gold",
    borderWidth: 2,
  },
  imageContainer: {
    backgroundColor: "gold",
    height: 45,
    width: 45,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 35,
    width: 35,
  },
  heading: {
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    fontSize: Platform.OS === "ios" ? 17 : 15,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: Platform.OS === "ios" ? 13 : 14,
  },
  subheading: {
    fontSize: 13,
    color: "gray",
  },
  buttonTitle: {
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "rgba(15, 173, 255, 1)",
    borderRadius: 10,
    marginTop: Platform.OS === "ios" ? 17 : 17,
    marginLeft: 10,
  },
  profileBottom: {
    height: Platform.OS === "ios" ? 310 : 290,
    width: Platform.OS === "ios" ? 410 : 390,
  },
});
