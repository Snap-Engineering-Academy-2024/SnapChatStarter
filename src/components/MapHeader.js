import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";
import { Search } from "../../assets/snapchat/HeaderIcons";

export default function MapHeader({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={[styles.profile, styles.buttons]}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            style={styles.profileImage}
            source={require("../../assets/snapchat/defaultprofile.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.search, styles.buttons]}
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Search />
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        <Pressable>
          <View style={[styles.more, styles.buttons]}>
            <Image
              source={require("../../assets/setting icon.png")}
              style={styles.image1InButton}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 6,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  buttons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: colors.lighttransparent,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  image1InButton: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
});
