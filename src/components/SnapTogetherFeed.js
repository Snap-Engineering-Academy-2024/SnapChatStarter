import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";


export default function SnapTogetherFeed({ title, eventImage, handlePress }) {
  return (
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
            <Text style={styles.FeedText}>{title}</Text>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  FeedContainer: {
    width: "100%",
    display: "flex",
    flex: 2,
    gap: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingTop: 20
  },
  Square: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 20,
    flexWrap: "wrap",
    margin: 6,
  },
  FeedImage: {
    width: 200,
    height: 300,
    display: "flex",
    justifyContent: "center",
    borderRadius: 50,
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
    padding: 8,
    fontWeight: "900",
    fontSize: 16,
    color: "white",
    position: "absolute",
    right: 15,
    bottom: 15,
    textShadowColor: "black",
    textShadowRadius: 15,
    textShadowOpacity: 0.5,
    backgroundColor: "black",
    shadowColor: "black",
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
  },
});
