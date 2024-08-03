import React from "react";
import { BottomSheet, Button, BottomSheetBackdrop } from "@rneui/themed";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";

// Height for BottomSheet
const HEIGHT = 400;
const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const AboutSheet = ({ showAbout, setShowAbout }) => {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const { joinStatus } = findJoinStatus();

  const joinButtonPress = async () => {
    if (!joinStatus) {
      try {
        const { error } = await supabase
          .from("profiles") // Replace with your table name
          .update({ joined_snaptogether: true })
          .eq("id", user.id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating join status:", error.message);
      }
    }
    navigation.navigate("SnapTogether");
  };

  return (
    <BottomSheet
      isVisible={showAbout}
      containerStyle={styles.container}
      modalProps={{}}
    >
      <View style={styles.content}>
      <View style={styles.line}/>
        <Text style={styles.title}>SnapTogether</Text>
        <Text style={styles.text}>
          Welcome to SnapTogether! Press 'Join' to take advantage of our
          resources.
        </Text>
        <View style={styles.buttonsView}>
          <Button
            onPress={() => {
              joinButtonPress();
              setShowAbout(false);
            }}
            title={"JOIN"}
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
    backgroundColor: "#FFFC00",
    // backgroundColor: "white",
    padding: 16,
    height: SCREEN_HEIGHT,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderRadius: 25,
    // justifyContent: "center",
    alignItems: "center",
    top: SCREEN_HEIGHT / 2.5,
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
    borderRadius: 15,
    width: 100,
  },
  buttonText: {
    color: "white",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    paddingHorizontal: 20,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 50,
    borderRadius: 2
  }
});

export default AboutSheet;
