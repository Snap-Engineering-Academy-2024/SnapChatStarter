import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import InfoSheet from "../components/InfoSheet";

const ethnicities = [
  { label: "All Inclusive", acronym: "All" },
  { label: "American Indian/Alaska Native", acronym: "AI/AN " },
  { label: "Asian", acronym: "Asian" },
  { label: "Black/African American", acronym: "Black" },
  { label: "Hispanic/Latino", acronym: "H/L" },
  { label: "Native Hawaiian/Pacific Islander", acronym: "NH/PI" },
];

export default function SectionScreen() {
  const route = useRoute();
  const buttonTitle = route.params.buttonTitle;
  const navigation = useNavigation();
  const handleBack = () => navigation.navigate("SnapTogether");
  const [showAbout, setShowAbout] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRace, setSelectedRace] = useState("All Inclusive");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "flex-start" }}>
        <Button onPress={handleBack} title="< Snap Together" />
      </View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {ethnicities.map((ethnicity, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => setSelectedRace(ethnicity.label)}
          >
            <Text style={styles.buttonText}>{ethnicity.acronym}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.title}>{buttonTitle}</Text>
      <Text style={styles.subtitle}>{selectedRace}</Text>
      <TouchableOpacity
        onPress={() => {
          setShowAbout(true);
        }}
        title={"About"}
        color="Red"
        accessibilityLabel="Show About Sheet"
      >
        <Ionicons
          style={{ alignSelf: "center" }}
          name={"information-circle"}
          size={36}
          color="black"
        />
      </TouchableOpacity>
      <View>
        <InfoSheet showAbout={showAbout} setShowAbout={setShowAbout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    backgroundColor: "#EFEFEF",
  },
  scrollView: {
    maxHeight: 50
  },
  scrollViewContent: {
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  buttonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontFamily: "avenir",
  },
  subtitle: {
    fontSize: 26,
    alignSelf: "flex-start",
    fontFamily: "avenir",
  },
});
