import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import InfoSheet from "../components/InfoSheet";
import SnapTogetherFeed from "../components/SnapTogetherFeed";
import SnapTogetherStories from "../components/SnapTogetherStories";
import StoryModal from "../components/StoryModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SectionHeader from "../components/SectionHeader";

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
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showStory, setShowStory] = useState(false);
  const insets = useSafeAreaInsets();

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
    <View
      style={{
        flex: .9,
        flexDirection: "column",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#FFF",
      }}
    >
      <SectionHeader />
      {/* <View style={{ alignItems: "flex-start" }}>
        <Button onPress={handleBack} title="< Snap Together" />
      </View> */}
      {/* Search bar */}
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
      /> */}
      {/* Filter buttons */}
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
      {/* Title */}
      <Text style={styles.title}>{buttonTitle}</Text>
      {/* Current filter selection */}
      <Text style={styles.subtitle}>{subtitleText}</Text>
      {/* Story bar */}
      <Text style={styles.sectionTitle}>Stories</Text>
      {companyData && (
        <View style={styles.storyBar}>
          <FlatList
            data={companyData}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            renderItem={({ item }) => (
              <SnapTogetherStories
                company={item}
                handlePress={() => {
                  setShowStory(true);
                  setSelectedCompany(item);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {/* Event discover list */}
      <Text style={styles.sectionTitle}>Events</Text>
      {companyData && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 250 }}
          data={companyData}
          horizontal={false}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <SnapTogetherFeed
              title={item.username}
              eventImage={item.poster_url}
              handlePress={() => {
                setShowAbout(true);
                setSelectedCompany(item);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {/* If infosheet is shown */}
      <View>
        <InfoSheet
          showAbout={showAbout}
          setShowAbout={setShowAbout}
          selectedCompany={selectedCompany}
        />
        <StoryModal
          showStory={showStory}
          setShowStory={setShowStory}
          selectedCompany={selectedCompany}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 60,
    paddingTop: 10,
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
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "avenir",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "avenir",
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontFamily: "avenir",
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
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
  storyBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
});
