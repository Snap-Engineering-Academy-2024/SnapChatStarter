import React, { useState, useRef, useEffect } from "react";
import MapView from "react-native-maps";
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
  require("../../assets/CompanyContent/AFROTECH/Story/Stories4.jpg"),
  require("../../assets/CompanyContent/AFROTECH/Story/Stories5.png"),
  require("../../assets/CompanyContent/AFROTECH/Story/Stories6.jpg"),
];
const communities = [
  require("../../assets/CompanyContent/AFROTECH/Community/Community1.png"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community2.png"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community3.png"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community4.jpeg"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community5.jpg"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community6.jpg"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community7.jpg"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community8.png"),
  require("../../assets/CompanyContent/AFROTECH/Community/Community9.png"),
];

const SelectorButton = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isActive && styles.buttonActiveText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function CompanyPageScreen() {
  const route = useRoute();
  const { selectedCompany, pageName, buttonTitle } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Stories");

  const currentRegion = {
    latitude: selectedCompany.location[0] - 0.035,
    longitude: selectedCompany.location[1] - 0.005,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  };

  const handlePress = (option) => {
    setSelectedOption(option);
  };

  const getData = () => {
    return selectedOption === "Stories" ? stories : communities;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={currentRegion}
        showsUserLocation={true}
      />
      <Image
        style={styles.mapIcon}
        source={{ uri: selectedCompany.logo_url }}
      />
      <CompanyPageHeader
        pageName={pageName}
        buttonTitle={buttonTitle}
        companyData={selectedCompany}
      />
      <BottomSheet
        ref={sheetRef}
        index={3}
        snapPoints={["35%", "45%", "55%", "65%", "75%", "85%"]}
      >
        <View style={styles.logoAndName}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => {
              navigation.navigate("CompanyPage", { selectedCompany });
            }}
          >
            <View style={styles.bitmojiContainer}>
              <Image
                style={styles.bitmojiImage}
                source={{ uri: selectedCompany.logo_url }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.title}
            onPress={() => {
              navigation.navigate("CompanyPage", { selectedCompany });
            }}
          >
            <Text style={styles.title}>
              {selectedCompany.username.toUpperCase()}
            </Text>
          </TouchableOpacity>
          <Icon name="stars" size={25} color={"yellow"} />
        </View>
        <Image
          source={require("../../assets/SnapTogether/CompanyFriends.png")}
          style={styles.companyFriends}
        />
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
        {selectedCompany.username === "AfroTech" &&
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
}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bitmojiContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#10adff",
    padding: 3.2,
    marginBottom: 5,
  },
  bitmojiImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  logoAndName: {
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
    justifyContent: "center",
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
    color: "grey",
  },
  buttonActiveText: {
    color: "black",
  },
  selectorButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyFriends: {
    height: 100,
    width: "100%",
  },
  storyImage: {
    width: SCREEN_WIDTH / 3 - 20,
    height: SCREEN_WIDTH / 1.75 - 20,
    margin: 5,
    borderRadius: 10,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  mapIcon: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    position: "absolute",
    left: 200,
    top: 220,
  },
});
