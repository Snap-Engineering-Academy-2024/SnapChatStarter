import React from "react";
import { BottomSheet, Button } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";

// Height for BottomSheet
const HEIGHT = 300;

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
    padding: 16,
    height: HEIGHT,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "black",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFC00",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '50%',
    paddingHorizontal: 20,
  }
});

export default AboutSheet;
