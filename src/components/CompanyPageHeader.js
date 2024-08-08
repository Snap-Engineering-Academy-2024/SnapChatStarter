import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Image} from "react-native";
import { colors } from "../../assets/themes/colors";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomSheet, Button } from "@rneui/themed";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CompanyPageHeader({pageName}) {
  const navigation = useNavigation();

  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navigation.navigate("SnapTogether");
          }}
        >
          <Icon name="arrow-back" size={22} color="white"/>
        </TouchableOpacity>
        
      </View>
      <View style={styles.headerCenter}>
        <TouchableOpacity style={styles.location}>
          <View style={styles.locationImageContainer}>
          <Image source={require("../../assets/SnapTogether/HoustonStory.jpg")} style={styles.locationImage}/>
          </View>
          <Text style={styles.locationText}>
            Houston
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.buttons}
        >
          <Icon name="ios-share" size={22} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="settings" size={22} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: SCREEN_HEIGHT / 4
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    gap: 8,
  },
  headerCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap: 8,
  },
  buttons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: colors.interactionGraySubtle,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, .5)"
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    top: "75%"
  },
  location: {
    borderRadius: 100,
    height: 44,
    width: 150,
    backgroundColor: colors.interactionGraySubtle,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, .5)",
    flexDirection: "row",
    gap: 10
  },
  locationText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  locationImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  locationImageContainer: {
    borderRadius: 100, 
    borderWidth: 2.5,
    borderColor: '#10adff',
    padding: 2.5, 
  }
});