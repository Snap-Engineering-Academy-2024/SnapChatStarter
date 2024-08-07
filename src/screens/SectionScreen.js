import React, { useState, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import InfoSheet from "../components/InfoSheet";
import SnapTogetherFeed from "../components/SnapTogetherFeed";
import SnapTogetherStories from "../components/SnapTogetherStories";
import StoryModal from "../components/StoryModal";
import { SafeAreaFrameContext, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SectionHeader from "../components/SectionHeader";
import { useRaceSelection } from "../utils/hooks/useRaceSelection";
import { useFilteredData } from "../utils/hooks/useFilteredData";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "react-native-elements";
import SnapTogetherSearchModal from "../components/SnapTogetherSearchModal";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";




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
  const navigation = useNavigation();

  const { user } = useAuthentication();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const { selectedRaces, raceSelection } = useRaceSelection(["All Inclusive"], ethnicities);
  const filteredData = useFilteredData(companyData, selectedRaces);

  const subtitleText = selectedRaces.length === 1 ? selectedRaces[0] : "Multi-Inclusive";

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  let filteredData2 = useMemo(() => {
    return companyData.filter((company) => {
      return selectedRaces.some(selectedRaces => {
        if (!selectedRaces) return true;
        return (company.categories.includes(searchQuery.toLowerCase()) || company.communities.includes(searchQuery));
      });
    });
  }, [companyData, searchQuery, selectedRaces]);

  let filteredData3 = useMemo(() => {
    if(selectedRaces[0] === "All Inclusive"){
      return filteredData2;
    }
    else if(!searchQuery){
      return filteredData
    }
    return [...new Set(filteredData.filter(element => filteredData2.includes(element)))];
  })


  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={[styles.profile, styles.buttons]}
          onPress={() => {
            navigation.navigate("SnapTogether");
          }}
        >
          <Icon name="arrow-back" size={24} />
        </Pressable>
          <SearchBar
          containerStyle={{
            flex: 1,
            backgroundColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
          inputContainerStyle={{ width: 270, height: 40, backgroundColor: "#EBECEE" }}
          width="100"
          placeholder="Search/Filter"
          lightTheme="true"
          round="true"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <SnapTogetherSearchModal
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
      </View>
    </View>
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
        <ScrollView>
      {/* Title */}
      <Text style={styles.title}>{buttonTitle}</Text>
      {/* Current filter selection */}
      <Text style={styles.subtitle}>{subtitleText}</Text>
      {/* Story bar */}
      <Text style={styles.sectionTitle}>Stories</Text>
      {companyData && (
        <View style={styles.storyBar}>
          <FlatList
            data={filteredData3}
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
          data={filteredData3}
          horizontal={false}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <SnapTogetherFeed
              title={item.username}
              eventImage={item.poster_url}
              selectedCompany={item}
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
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 0,
    paddingTop: 10,
    height: 70,
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
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  headerCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap: 8,
  },
  buttons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: colors.interactionGraySubtle,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  shareButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
    marginRight: 10,
  },
  settingsButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
    marginRight: 25,
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 18
  },
});
