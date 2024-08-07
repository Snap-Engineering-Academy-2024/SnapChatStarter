import React from "react";
import { BottomSheet, Button } from "@rneui/themed";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
} from "react-native";

// Height for BottomSheet
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const InfoSheet = ({ showAbout, setShowAbout, selectedCompany }) => {
  return (
    <BottomSheet
      isVisible={showAbout}
      containerStyle={styles.container}
      modalProps={{}}
    >
      <View style={styles.content}>
        {selectedCompany.header_url && (
          <Image
            source={{ uri: selectedCompany.header_url }}
            style={styles.companyPhoto}
          />
        )}
        <Text style={styles.title}>{selectedCompany.username}</Text>
        <Text style={styles.text}>{selectedCompany.event_description}</Text>
        <View style={[styles.buttonsView]}>
          <Button
            onPress={() => {
              setShowAbout(false);
              Linking.openURL(selectedCompany.event_url);
            }}
            title={"LEARN MORE"}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            accessibilityLabel="Click to join SnapTogether"
          />
          <Button
            onPress={() => {
              setShowAbout(false);
            }}
            title={"CLOSE"}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            accessibilityLabel="Close Bottomsheet"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
    top: SCREEN_HEIGHT / 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 50,
    marginBottom: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#10adff",
    marginBottom: 16,
    borderRadius: 20,
    width: SCREEN_WIDTH,
  },
  buttonText: {
    color: "white",
  },
  buttonsView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  companyPhoto: {
    width: 400,
    height: 300,
    borderRadius: 20,
    borderWidth: 3,
    marginBottom: 16,
  },
});

export default InfoSheet;
