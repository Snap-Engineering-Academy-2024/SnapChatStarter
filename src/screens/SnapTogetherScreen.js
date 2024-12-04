import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import SnapTogetherHeader from "../components/SnapTogetherHeader";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFilteredData } from "../utils/hooks/useFilteredData";
import SnapTogetherFeed from "../components/SnapTogetherFeed";
import Icon from "react-native-vector-icons/MaterialIcons";
import InfoSheet from "../components/InfoSheet";

export default function SnapTogetherScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [story1, setStory1] = useState([]);
  const [story2, setStory2] = useState([]);
  const [story3, setStory3] = useState([]);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const pullStories = async () => {
    try {
      const [careerBoost, momNPops, showcase] = await Promise.all([
        supabase.from("career_boost_profiles").select("*"),
        supabase.from("mom_pop_profiles").select("*"),
        supabase.from("showcase_profiles").select("*"),
      ]);

      if (careerBoost.error) {
        console.error("Error fetching career boost data:", careerBoost.error);
      } else {
        setStory1(careerBoost.data || []);
      }

      if (momNPops.error) {
        console.error("Error fetching mom & pops data:", momNPops.error);
      } else {
        setStory2(momNPops.data || []);
      }

      if (showcase.error) {
        console.error("Error fetching showcase data:", showcase.error);
      } else {
        setStory3(showcase.data || []);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    pullStories();
  }, []);

  const filteredStory1 = useFilteredData(story1, ["All Inclusive"]);
  const filteredStory2 = useFilteredData(story2, ["All Inclusive"]);
  const filteredStory3 = useFilteredData(story3, ["All Inclusive"]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <SnapTogetherHeader />
      <ScrollView
        style={{
          flex: 0.9,
          flexDirection: "column",
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Image
          source={require("../../assets/SnapTogether/SnapTogetherLogoPurple.png")}
          style={styles.logo}
        />

        <Text style={styles.snapTogetherText}>SnapTogether</Text>
        <Text style={styles.info}>An accessible resource hub</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title={"Career Boost"}
            onPress={() => handleSectionPress("Career Boost")}
          >
            <View style={{flexDirection: "row", alignContent: "center"}}>
              <Text style={styles.button}>Career Boost</Text>
              <Icon name="event" size={32} color="black" style={styles.subTitle}/>
            </View>
          </TouchableOpacity>
          {story1.length > 0 && (
            <FlatList
              data={filteredStory1}
              horizontal={true}
              ItemSeparatorComponent={() => (
                <View style={{ width: 30, marginBottom: 350 }} />
              )}
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
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => handleSectionPress("Career Boost")}
          >
            <Text style={styles.buttonText}>See more</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title={"Mom & Pops"}
            onPress={() => handleSectionPress("Mom & Pops")}
          >
            
            <View style={{flexDirection: "row", alignContent: "center"}}>
              <Text style={styles.button}>Mom & Pops</Text>
              <Icon name="event" size={32} color="black" style={styles.subTitle}/>
            </View>
          </TouchableOpacity>
          {story2.length > 0 && (
            <FlatList
              data={filteredStory2}
              horizontal={true}
              // numColumns={2}
              ItemSeparatorComponent={() => (
                <View style={{ width: 30, marginBottom: 350 }} />
              )}
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
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => handleSectionPress("Mom & Pops")}
          >
            <Text style={styles.buttonText}>See more</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title={"Showcase"}
            onPress={() => handleSectionPress("Showcase")}
          >
            <View style={{flexDirection: "row", alignContent: "center"}}>
              <Text style={styles.button}>Showcase</Text>
              <Icon name="event" size={32} color="black" style={styles.subTitle}/>
            </View>
          </TouchableOpacity>
          {story3.length > 0 && (
            <FlatList
              data={filteredStory3}
              horizontal={true}
              // numColumns={2}
              ItemSeparatorComponent={() => (
                <View style={{ width: 30, marginBottom: 350 }} />
              )}
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
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.lastPressable}
            onPress={() => handleSectionPress("Showcase")}
          >
            <Text style={styles.buttonText}>See more</Text>
          </Pressable>
        </View>
        {/* <View style={{height: 300}}> </View> */}
      </ScrollView>
      {/* If infosheet is shown */}
      <View>
        {/* <InfoSheet
          showAbout={showAbout}
          setShowAbout={setShowAbout}
          selectedCompany={selectedCompany}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 75,
    marginBottom: 10,
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
  buttonContainer: {
    alignItems: "left",
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontFamily: "avenir",
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
    textDecorationLine: "underline",
  },
  subTitle: {
    // fontWeight: "semibold",
    // alignSelf: "flex-start",
    // fontFamily: "avenir",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "avenir",
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
  },
  pressable: {
    backgroundColor: "#10adff",
    marginBottom: 26,
    borderRadius: 20,
    width: "95%",
  },
  lastPressable: {
    backgroundColor: "#10adff",
    marginBottom: 80,
    borderRadius: 20,
    width: "95%",
  },
});
