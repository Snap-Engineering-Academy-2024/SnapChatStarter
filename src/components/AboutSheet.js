import React from "react";
import { Button } from "@rneui/themed";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";


// Height for BottomSheet
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const AboutSheet = ({aref}) => {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const joinStatus = findJoinStatus();


  const joinButtonPress = async () => {
    if (!joinStatus) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ joined_snaptogether: true })
          .eq("id", user.id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating join status:", error.message);
      }
    }
    aref.current.close()
    navigation.navigate("SnapTogether");
  };

  return (
    <BottomSheet enablePanDownToClose ref={aref} index={-1} snapPoints={["15", "50"]}>
      <View style={styles.content}>
      <Image
          source={require("../../assets/SnapTogether/SnapTogetherLogoPurple.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>SnapTogether</Text>
        <Text style={styles.text}>
        This is a vibrant space for people from different backgrounds to share career tips, cool local businesses, and tasty eats. Dive into stories, earn badges and join a network that’s all about you. 
        </Text>
        <View style={[styles.buttonsView, !joinStatus ? { justifyContent: 'space-between' } : { justifyContent: 'center' }]}>

          {!joinStatus && (
            <Button
              onPress={() => {
                joinButtonPress();
              }}
              title={"JOIN"}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              accessibilityLabel="Click to join SnapTogether"
            />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
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
    width: 300,
  },
  buttonText: {
    color: "white",
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default AboutSheet;
