import React from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import SnapTogetherHeader from "../components/SnapTogetherHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SnapTogetherScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleSectionPress = async (buttonTitle) => {
    let table;
    switch (buttonTitle) {
      case "Career Boost":
        table = "career_boost_profiles";
        break;
      case "Mom & Pops":
        table = "mom_pop_profiles";
        break;
      case "Showcase":
        table = "showcase_profiles";
        break;
      default:
        table = null;
    }

    if (table) {
      const { data, error } = await supabase.from(table).select("*");

      if (error) {
        console.error("Error fetching company data:", error);
      } else if (data.length === 0) {
        console.warn("No company found for this section");
      } else {
        const companyData = data;
        navigation.navigate("Section", { buttonTitle, companyData });
      }
    }
  };

  return (
    <View
      style={{
        flex: 0.9,
        flexDirection: "column",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <SnapTogetherHeader />
      <Image
        source={require("../../assets/SnapTogether/SnapTogetherHeartLogoBlack.png")}
        style={styles.logo}
      />

      <Text style={styles.snapTogetherText}>SnapTogether</Text>
      <Text style={styles.info}>An accessible resource hub</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={"Career Boost"}
          onPress={() => handleSectionPress("Career Boost")}
        />
        <Button
          title={"Mom & Pops"}
          onPress={() => handleSectionPress("Mom & Pops")}
        />
        <Button
          title={"Showcase"}
          onPress={() => handleSectionPress("Showcase")}
        />
      </View>
    </View>
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
    fontWeight: "semibold",
    alignSelf: "center",
    marginBottom: 20,
  },
  sections: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});
