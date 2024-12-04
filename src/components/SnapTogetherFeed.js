import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SnapTogetherFeed({ title, eventImage, handlePress, selectedCompany }) {
  const navigation = useNavigation();

  return (
    <View style = {{ paddingTop:5 }}>
      <View style={styles.FeedContainer}>
      <View style={styles.Square}>
        <Pressable
          onPress={() => {
            handlePress ()
          }}
        >
          <ImageBackground
            style={styles.FeedImage}
            imageStyle={{ borderRadius: 20 }}
            source={{
              uri: eventImage,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("CompanyPage",{ selectedCompany});
              }}
              style={styles.nameBox}
            >
              <Text style={styles.FeedText}>{title}</Text>
            </Pressable>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  FeedContainer: {
    width: "100%",
    display: "flex",
    flex: 2,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  Square: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    width: "100%",
    borderRadius: 20,
    flexWrap: "wrap",
    margin: 6,
  },
  FeedImage: {
    width: 185,
    height: 277,
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  FeedText: {
    fontWeight: "900",
    fontSize: 16,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 15,
    textShadowOpacity: 0.5,
    textAlign: "center",
  },
  nameBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .8)",
    paddingVertical: 8,
    alignItems: "center",
  },
});
