import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScreenWidth } from "@rneui/base";
import CompanyPageHeader from "../components/CompanyPageHeader";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const stories = [
  require("../../assets/CompanyContent/AFROTECH/Story/Stories1.png"),
  require("../../assets/CompanyContent/AFROTECH/Story/Stories2.png"),
  require("../../assets/CompanyContent/AFROTECH/Story/Stories3.png"),
];
const communities = [
  require("../../assets/CompanyContent/AFROTECH/Community/Community1.png"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community2.png"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community3.png"),
];

const SelectorButton = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isActive && styles.buttonActiveText]}
      onPress={onPress}
    />
      <Text style={[styles.buttonText, !isActive && styles.buttonActiveText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function CompanyPageScreen() {
  const route = useRoute();
  const { selectedCompany, pageName } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Stories");

  const handlePress = (option) => {
    setSelectedOption(option);
  };

  const getData = () => {
    return selectedOption === "Stories" ? stories : communities;
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <CompanyPageHeader pageName={pageName}/>
      </View>
      <BottomSheet
        ref={sheetRef}
        index={3}
        snapPoints={["35", "45", "55", "65", "75", "85"]}
      >
        <View style={styles.logoAndName}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => {
              navigation.navigate("CompanyPage", { selectedCompany });
            }}
          >
            <Image
              style={styles.bitmojiImage}
              source={{ uri: selectedCompany.logo_url }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.title}
            onPress={() => {
              navigation.navigate("CompanyPage", { selectedCompany });
            }}
          >
            <Text style={styles.title}>{selectedCompany.username}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../../assets/SnapTogether/CompanyFriends.png")}
            style={styles.companyFriends}
          />
        </View>
        <View style={styles.buttons}>
          <Button buttonStyle={styles.subscribe}>
            <Icon name="bookmark-add" size={20} color={"white"} />
            <Text
              style={{ color: "white", fontSize: 16, fontWeight: "semibold" }}
            >
              Subscribe
            </Text>
          </Button>
          <TouchableOpacity style={styles.expand}>
            <Icon name="expand-circle-down" size={50} color={"lightgray"} />
          </TouchableOpacity>
        </View>
        <View style={styles.selectorButtonContainer}>
          <SelectorButton
            title="Stories"
            onPress={() => handlePress("Stories")}
            isActive={selectedOption === "Stories"}
          />
          <SelectorButton
            title="Communities"
            onPress={() => handlePress("Communities")}
            isActive={selectedOption === "Communities"}
          />
        </View>
        <View style={styles.storyGrid}>
          <FlatList
            data={getData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
              <Image source={item} style={styles.storyImage} />
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomsheet: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    backgroundColor: "white",
    padding: 25,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
    top: SCREEN_HEIGHT / 3.5,
  },
  bitmojiImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  logoAndName: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    paddingBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  subscribe: {
    height: 40,
    width: ScreenWidth / 1.25,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: "#10adff",
    gap: 5,
    marginRight: 5,
  },
  expand: {
    paddingBottom: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: SCREEN_WIDTH / 2,
    alignItems: "center",
  },
  buttonActive: {
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonActiveText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "grey"
  },
  selectorButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyFriends: {
    height: 100,
    width: "100%",
  },
  storyGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    paddingHorizontal: 10,
  },
  storyImage: {
    width: SCREEN_WIDTH / 3 - 20,
    height: SCREEN_WIDTH / 1.75 - 20,
    margin: 5,
    borderRadius: 10
  },
});
