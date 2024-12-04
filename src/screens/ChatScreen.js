import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Button, Icon } from "@rneui/base";
import Header from "../components/Header";

export default function ChatScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          width: "100%",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          // marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" style={{ color: "white" }} />
      <View style={styles.notification}>
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
          name="close"
          color="white"
          marginTop={Platform.OS === "ios" ? 24 : 22}
          margin={10}
        />
      </View>
      <Image
        source={require("../../assets/chat-background.png")}
        style={styles.chatImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  notification: {
    flexDirection: "row",
    backgroundColor: "rgba(41, 41, 41, 1)",
    margin: 10,
    borderRadius: 10,
    borderColor: "gold",
    borderWidth: 2,
  },
  imageContainer: {
    backgroundColor: "gold",
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 40,
  },
  heading: {
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    fontSize: Platform.OS === "ios" ? 17 : 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: Platform.OS === "ios" ? 17 : 16,
  },
  subheading: {
    fontSize: Platform.OS === "ios" ? 13 : 12,
    color: "gray",
  },
  buttonTitle: {
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    fontSize: Platform.OS === "ios" ? 10 : 9,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "rgba(15, 173, 255, 1)",
    borderRadius: 10,
    marginTop: Platform.OS === "ios" ? 20 : 19,
    marginLeft: 10,
  },
  chatImage: {
    height: Platform.OS === "ios" ? 600 : 580,
    width: Platform.OS === "ios" ? 400 : 400,
    marginBottom: Platform.OS === "ios" ? 45 : 45,
  },
});
