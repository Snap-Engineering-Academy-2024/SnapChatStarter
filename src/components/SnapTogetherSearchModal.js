import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { SearchBar } from "react-native-elements";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SnapTogetherSearchModal = ({ showSearch, setShowSearch }) => {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <Modal
      visible={showSearch}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowSearch(false)}
    >
      <View style={styles.centeredView}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.searchBarContainer}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={updateSearch}
              value={search}
              lightTheme
              round
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInputContainer}
            />
            <TouchableOpacity onPress={() => setShowSearch(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .9)",
  },
  modalView: {
    margin: 20,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    flex: 1,
  },
  searchInputContainer: {
    backgroundColor: "#EFEFEF",
  },
  cancelButton: {
    fontWeight: "bold",
    fontSize: 14,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default SnapTogetherSearchModal;
