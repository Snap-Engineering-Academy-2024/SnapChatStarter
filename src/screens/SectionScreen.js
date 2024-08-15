import React, { useState, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import InfoSheet from "../components/InfoSheet";
import SnapTogetherFeed from "../components/SnapTogetherFeed";
import SnapTogetherStories from "../components/SnapTogetherStories";
import StoryModal from "../components/StoryModal";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRaceSelection } from "../utils/hooks/useRaceSelection";
import { useFilteredData } from "../utils/hooks/useFilteredData";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "react-native-elements";
import SnapTogetherSearchModal from "../components/SnapTogetherSearchModal";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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

  const { selectedRaces, raceSelection } = useRaceSelection(
    ["All Inclusive"],
    ethnicities
  );
  const filteredData = useFilteredData(companyData, selectedRaces);

  const subtitleText =
    selectedRaces.length === 1 ? selectedRaces[0] : "Multi-Inclusive";

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  let searchBarFilteredData = useMemo(() => {
    return companyData.filter((company) => {
      return selectedRaces.some((selectedRaces) => {
        if (!selectedRaces) return true;
        return (
          company.categories.includes(searchQuery.toLowerCase()) ||
          company.communities.includes(searchQuery)
        );
      });
    });
  }, [companyData, searchQuery, selectedRaces]);

  let dataShown = useMemo(() => {
    if (selectedRaces[0] === "All Inclusive") {
      return searchBarFilteredData;
    } else if (!searchQuery) {
      return filteredData;
    }
    return [
      ...new Set(
        filteredData.filter((element) =>
          searchBarFilteredData.includes(element)
        )
      ),
    ];
  });

  const handleTouchOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable
              style={[styles.profile, styles.buttons]}
              onPress={() => {
                navigation.navigate("SnapTogether");
              }}
            >
              <Icon name="arrow-back" size={22} color={"white"} />
            </Pressable>
          </View>

          <View style={styles.headerCenter}>
            <TouchableWithoutFeedback onPress={handleTouchOutside}>
              <SearchBar
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                placeholder="Search/Filter"
                lightTheme
                round
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate("Settings")}
            >
              <Icon name="settings" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <SnapTogetherSearchModal
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        </View>
      </View>
      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <FlatList
          data={ethnicities}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.button,
                selectedRaces.includes(item.label) && styles.buttonSelected,
              ]}
              onPress={() => raceSelection(item.label)}
            >
              <Text style={styles.buttonText}>{item.acronym}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.acronym}
        />
      </View>
      <FlatList
        style={styles.flatlist}
        ListHeaderComponent={
          <>
            {/* Title */}
            <Text style={styles.title}>{buttonTitle}</Text>
            {/* Current filter selection */}
            <Text style={styles.subtitle}>{subtitleText}</Text>
            {/* Story bar */}
            <Text style={styles.sectionTitle}>Stories</Text>
            <FlatList
              data={dataShown}
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
            {/* Event discover list */}
            <Text style={styles.sectionTitle}>Events</Text>
          </>
        }
        data={dataShown}
        horizontal={false}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={{paddingLeft:12}}>
            <SnapTogetherFeed
              title={item.username}
              eventImage={item.poster_url}
              selectedCompany={item}
              handlePress={() => {
                setShowAbout(true);
                setSelectedCompany(item);
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
    fontSize: 33,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  headerCenter: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 30,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    gap: 8,
  },
  buttons: {
    alignSelf: "flex-start",
    marginBottom: 16,
    marginRight: 25,
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderRadius: 100,
    height: 44,
    width: 44,
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
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  searchBarInputContainer: {
    marginTop: -10,
    width: 270,
    height: 45,
    backgroundColor: "#EBECEE",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
