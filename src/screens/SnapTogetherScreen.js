import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Button, Image} from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import AboutSheet from "../components/AboutSheet";

export default function SnapTogetherScreen() {
  const navigation = useNavigation();
  const handleBack = () => navigation.navigate("Profile");
  const handleSectionPress = () => navigation.navigate("Section")
  const [showAbout, setShowAbout] = useState(false);

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
      <TouchableOpacity
      onPress={() => {
        setShowAbout(true);
      }}
      title={"About"}
      color="Red"
      accessibilityLabel="Show About Sheet"
      >
      <Ionicons
      style = {{fontSize: 26, alignSelf:"center"}} 
          name={"help"}
          size={30}
          color="black"
        />
      </TouchableOpacity>
      <Button style = {styles.sections} title={"Career Boost"} onPress={handleSectionPress}>
      </Button>
      <Button style = {styles.sections} title={"Mom & Pops"} onPress={handleSectionPress}>
      </Button>
      <Button style = {styles.sections} title={"Showcase"} onPress={handleSectionPress}>
      </Button>
      <View>
          <AboutSheet showAbout={showAbout} setShowAbout={setShowAbout} />
        </View>
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
