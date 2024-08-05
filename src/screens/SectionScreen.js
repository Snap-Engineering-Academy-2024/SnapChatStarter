import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import InfoSheet from "../components/InfoSheet";
import SnapTogetherFeed from "../components/SnapTogetherFeed";
import SnapTogetherStories from "../components/SnapTogetherStories";
import StoryModal from "../components/StoryModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SectionHeader from "../components/SectionHeader";
import { useRaceSelection } from "../utils/hooks/useRaceSelection";
import { useFilteredData } from "../utils/hooks/useFilteredData";

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
  const [showAbout, setShowAbout] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showStory, setShowStory] = useState(false);
  const insets = useSafeAreaInsets();

  const { selectedRaces, raceSelection } = useRaceSelection(["All Inclusive"], ethnicities);
  const filteredData = useFilteredData(companyData, selectedRaces);

  const subtitleText = selectedRaces.length === 1 ? selectedRaces[0] : "Multi-Inclusive";

  return (
    <View
      style={{
        flex: 0.9,
        flexDirection: "column",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#FFF",
      }}
    >
      <SectionHeader />
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
            data={filteredData}
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
          data={filteredData}
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
  storyBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
});
