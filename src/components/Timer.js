import { StyleSheet, Text, View } from "react-native";

export default function Timer(props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={styles.digits}>{"00"}:</Text>
      <Text style={styles.digits}>
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </Text>
      <Text style={styles.digits}>
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  digits: {
    color: "white",
    fontSize: 16,
    fontFamily: "Avenir Next",
    fontWeight: "500",
    lineHeight: 20,
    wordWrap: "break-word",
  },
});
