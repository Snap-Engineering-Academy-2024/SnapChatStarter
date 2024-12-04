import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StoryModal = ({ showStory, setShowStory, selectedCompany }) => {
  const navigation = useNavigation();
  return (
    <Modal
      visible={showStory}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowStory(false)}
    >
      <View style={styles.centeredView}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.logoAndName}>
            <TouchableOpacity
              style={styles.title}
              onPress={() => {
                navigation.navigate("CompanyPage",{ selectedCompany });
                setShowStory(false);
              }}
            >
              <Image
                style={styles.bitmojiImage}
                source={{
                  uri: selectedCompany.logo_url,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              onPress={() => {
                navigation.navigate("CompanyPage",{ selectedCompany });
                setShowStory(false);
              }}
            >
              <Text style={styles.title}>{selectedCompany.username}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setShowStory(false)}>
            <View style={styles.imageContainer}>
              {selectedCompany.header_url && (
                <Image
                  source={{ uri: selectedCompany.poster_url }}
                  style={styles.companyPhoto}
                />
              )}
            </View>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  companyPhoto: {
    width: SCREEN_WIDTH / 1,
    height: SCREEN_HEIGHT / 1.5,
    borderRadius: 10,
    marginTop: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bitmojiImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  logoAndName: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default StoryModal;
