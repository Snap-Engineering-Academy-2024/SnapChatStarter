import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Button, Image} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";

export default function SnapTogetherScreen() {
  const navigation = useNavigation();
  const handleBack = () => navigation.navigate("Profile");
  const handleSectionPress = () => navigation.navigate("Section")

  return (
    <SafeAreaView>
      <View alignItems="Left">
        <Button onPress={handleBack} title="< Profile" align="Left"/>
      </View>
      <Image 
      source={{uri: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"}} 
      style = {styles.logo} 
      />

      <Text style={styles.snapTogetherText}>
        SnapTogether
      </Text>
      <Text style = {styles.info}>
        An accessible resource hub
      </Text>
      <Button style = {styles.sections} title={"Career Boost"} onPress={handleSectionPress}>
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Section");
        }}
        title={"Sections"}
        color="brown"
        accessibilityLabel="Section redirect button"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userButton: {
    padding: 25,
    display: "flex",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  userIcon: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  userName: {
    position: "absolute",
    left: 50,
    top: 14,
    fontSize: 18,
  },
  userCamera: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  snapTogetherText: {
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
    alignContent: "center",
    fontFamily: "avenir",
  },
  info: {
    fontSize: 20,
    fontWeight: 300,
    alignSelf: "center",
    marginBottom: 20
  },
  sections: {
    fontSize: 20,
    fontWeight: 400
  }
});