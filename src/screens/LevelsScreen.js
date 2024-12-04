import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { useFonts } from "expo-font";

export default function TopicsScreen() {
  const navigation = useNavigation();
  const [loaded, error] = useFonts({
    "AvenirNext-Regular": require("../../assets/fonts/AvenirNext-Regular.ttf"),
  });

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../../assets/levels-background.png")}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={styles.levelsHeading}>Weekly Roadmap</Text>
          <View style={styles.startButtonWrapper}>
            <Button
              style={styles.colorButtonContainer}
              icon={
                <Image
                  style={styles.startButtonIcon}
                  source={require("../../assets/Ghost Logo (for light backgrounds) 6.png")}
                />
              }
              buttonStyle={styles.colorButton}
              onPress={() => navigation.navigate("Game")}
              accessibilityLabel="Navigate to Game screen"
            />
          </View>
          <View style={styles.secondButtonWrapper}>
            <Button
              icon={styles.lockedButtonIcon}
              buttonStyle={styles.grayButton}
              containerStyle={styles.grayButtonContainer}
            />
          </View>
          <View style={styles.halfwayButtonWrapper}>
            <Button
              icon={styles.lockedButtonIcon}
              buttonStyle={styles.grayButton}
              containerStyle={styles.grayButtonContainer}
            />
          </View>
          <View style={styles.fourthButtonWrapper}>
            <Button
              icon={styles.lockedButtonIcon}
              buttonStyle={styles.grayButton}
              containerStyle={styles.grayButtonContainer}
            />
          </View>
          <View style={styles.fifthButtonWrapper}>
            <Button
              icon={styles.lockedButtonIcon}
              buttonStyle={styles.grayButton}
              containerStyle={styles.grayButtonContainer}
            />
          </View>
          <View style={styles.sixthButtonWrapper}>
            <Button
              icon={styles.lockedButtonIcon}
              buttonStyle={styles.grayButton}
              containerStyle={styles.grayButtonContainer}
            />
          </View>
          <View style={styles.endButtonWrapper}>
            <Button
              icon={styles.endButtonIcon}
              buttonStyle={styles.grayButton}
              containerStyle={styles.grayButtonContainer}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "rgba(21, 23, 22, 1)",
  },
  backgroundWrapper: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    borderRadius: 10,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  levelsHeading: {
    marginTop: 180,
    fontFamily: "AvenirNext-Regular",
    fontSize: 40,
    fontWeight: "300",
    color: "white",
    marginBottom: 106,
  },
  colorButtonContainer: {
    borderWidth: 4,
    borderRadius: 50,
    borderColor: "#FFFFFF",
  },
  startButtonIcon: {
    height: 50,
    width: 50,
  },
  colorButton: {
    height: 82,
    width: 123,
    backgroundColor: "#FEC608",
    borderRadius: 50,
  },
  startButtonWrapper: {
    position: "absolute",
    top: 286,
    left: 75,
  },
  secondButtonWrapper: {
    position: "absolute",
    top: 365,
    right: 15,
  },
  halfwayButtonWrapper: {
    position: "absolute",
    top: 437,
    left: 170,
  },
  fourthButtonWrapper: {
    position: "absolute",
    top: 530,
    left: 16,
  },
  fifthButtonWrapper: {
    position: "absolute",
    top: 600,
    left: 173,
  },
  sixthButtonWrapper: {
    position: "absolute",
    top: 690,
    right: 12,
  },
  endButtonWrapper: {
    position: "absolute",
    top: 725,
    left: 76,
  },
  grayButtonContainer: {
    height: 80,
    width: 104,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: "#FFFFFF",
  },
  lockedButtonIcon: {
    name: "lock",
    type: "font-awesome",
    height: 25,
    color: "rgba(175, 175, 175, 1)",
    margin: 10,
  },
  grayButton: {
    height: 80,
    width: 100,
    backgroundColor: "rgba(229, 229, 229, 1)",
    borderRadius: 50,
  },
  endButtonIcon: {
    name: "trophy",
    type: "font-awesome",
    height: 25,
    width: 25,
    color: "rgba(175, 175, 175, 1)",
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
