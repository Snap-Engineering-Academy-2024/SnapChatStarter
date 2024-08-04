import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
  SectionList
} from "react-native";
import { SearchBar } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import InfoSheet from "../components/InfoSheet";

const ethnicities = [
  { label: "All Inclusive", acronym: "All" },
  { label: "AAPI", acronym: "AAPI" },
  { label: "Black", acronym: "Black" },
  { label: "Indigenous", acronym: "Indigenous" },
  { label: "Latinx", acronym: "Latinx" },
];

export default function SectionScreen() {
  const route = useRoute();
  const { buttonTitle, companyData } = route.params;
  const navigation = useNavigation();
  const handleBack = () => navigation.navigate("SnapTogether");
  const [showAbout, setShowAbout] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRaces, setSelectedRaces] = useState(["All Inclusive"]);
  const [selectedCompany, setSelectedCompany] = useState("")

  const updateSearch = (search) => {
    setSearch(search);
  };

  const raceSelection = (label) => {
    if (label === "All Inclusive") {
      setSelectedRaces(["All Inclusive"]);
    } else {
      setSelectedRaces((prevSelectedRaces) => {
        const isAlreadySelected = prevSelectedRaces.includes(label);
        let updatedSelections;

        if (isAlreadySelected) {
          updatedSelections = prevSelectedRaces.filter(
            (race) => race !== label
          );
        } else {
          updatedSelections = prevSelectedRaces
            .filter((race) => race !== "All Inclusive")
            .concat(label);
        }

        if (updatedSelections.length === ethnicities.length - 1) {
          return ["All Inclusive"];
        }

        return updatedSelections.length === 0
          ? ["All Inclusive"]
          : updatedSelections;
      });
    }
  };

  const subtitleText =
    selectedRaces.length === 1 ? selectedRaces[0] : "Multi-Inclusive";

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
            style={[
              styles.button,
              selectedRaces.includes(ethnicity.label) && styles.buttonSelected,
            ]}
            onPress={() => raceSelection(ethnicity.label)}
          >
            <Text style={styles.buttonText}>{ethnicity.acronym}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.title}>{buttonTitle}</Text>
          <Text style={styles.subtitle}>{subtitleText}</Text>
          {companyData && (
  <SectionList
    sections={[
      {
        title: buttonTitle,
        data: companyData,
        renderItem: ({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => {
              setShowAbout(true);
              setSelectedCompany(item)
              }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.username}</Text>
            </View>
          </TouchableOpacity>
        ),
      },
    ]}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => null}
  />
)}
      <View>
        <InfoSheet
          showAbout={showAbout}
          setShowAbout={setShowAbout}
          selectedCompany={selectedCompany}
        />
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
    maxHeight: 50,
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
  buttonSelected: {
    backgroundColor: "#AAAAAA",
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
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
