import { View, StyleSheet,TouchableOpacity } from "react-native";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Icon from "react-native-vector-icons/MaterialIcons";
import SnapTogetherSearchModal from "./SnapTogetherSearchModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

export default function SectionHeader() {
  const navigation = useNavigation();

  const { user } = useAuthentication();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  return (
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
          onChangeText={setSearchQuery}
          // {ethnicities.map((ethnicity, index) => (
          //   <TouchableOpacity
          //     key={index}
          //     style={[
          //       styles.button,
          //       selectedRaces.includes(ethnicity.label) && styles.buttonSelected,
          //     ]}
          //     onPress={() => raceSelection(ethnicity.label)}
          //   >
          //     <Text style={styles.buttonText}>{ethnicity.acronym}</Text>
          //   </TouchableOpacity>
          // ))}
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
  );
}

const styles = StyleSheet.create({
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
