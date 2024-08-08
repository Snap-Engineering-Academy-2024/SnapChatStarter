import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import { useNavigation } from "@react-navigation/native";

export default function SnapTogetherStories({company, handlePress}) {
  const navigation = useNavigation();
  return (
    <View style={styles.myBitmoji}>
      <Pressable
        style={[styles.profile, styles.buttons]}
        onPress={() => {
          handlePress()
        }}
      >
        <View style = {styles.bitmojiContainer}>
          <Image
          style={styles.bitmojiImage}
          source={{
            uri: company.logo_url
          }}
        />
        </View>
        
      </Pressable>
      <TouchableOpacity style={styles.bitmojiTextContainer}
      onPress={() => {
        navigation.navigate("CompanyPage",{ selectedCompany: company});
      }}
      >
        <Text style={styles.bitmojiText}>{company.username}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  myBitmoji: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
  bitmojiImage: {
    width: 98,
    height: 98,
    borderRadius: 90,
  },
  bitmojiContainer: {
    borderRadius: 100, 
    borderWidth: 3,
    borderColor: '#10adff',
    padding: 3.2, 
    marginBottom: 5, 
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.5,
  },
  Friends: {
    textAlign: "left",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
});
