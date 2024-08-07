import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";
import DraggableButtonList from "../components/DraggableButtons";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const DATA = [
  {
    title: "My Stories",
    data: [{ name: "Add to My Story", description: "Just for Friends" }],
  },
  {
    title: "Friends",
    data: [
      { name: "Add Friends", description: "New Friends" },
      { name: "My Friends", description: "Old Friends" },
    ],
  },
  {
    title: "Communities",
    data: [
      { name: "Add Your School", description: "Stay In Touch" },
      { name: "SnapTogether", description: "Connect With Your Communities" },
    ],
  },
];

const ProfileSections = ({ onPressHandlers }) => {
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const [astrology, setAstrology] = useState("Taurus");
  const userSign = findAstrologySign();
  const userJoinStatus = findJoinStatus();
  const [name, setName] = useState("Name")
  const [username, setUsername] = useState("username")

  useEffect(() => {
    setAstrology(userSign.sign);
  }, [userSign.sign]);

  const SnapTogetherRedirect = async () => {
    if (userJoinStatus) {
      navigation.navigate("SnapTogether");
    } else {
      setShowAbout(true);
    }
  };
  const badgeOnPressHandlers = {
    [astrology]: () => navigation.navigate("Astrology"),
    "🫶🏻🫶🏽🫶🏿": SnapTogetherRedirect,
  };

  useEffect(() => {
    if (user !== null) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles") // Replace with your table name
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setUsername(data.username || user.email.split("@")[0]);
      setName(data.full_name || user.full_name);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.nameContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/snapchat-logo.png")}
        />
        <View>
          <Text style={{ fontSize: 18 }}>{name}</Text>
          <Text style={{ fontSize: 14 }}>{username}</Text>
        </View>
      </View>
      {/* Badges */}
      <View style={styles.badges}>
          <DraggableButtonList
            onPressHandlers={badgeOnPressHandlers}
            astrology={astrology}
          />
        </View>
      <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => onPressHandlers[item.name]()}
          >
            <View style={styles.iconContainer}>
              <Icon name="school" size={24} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.description}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  // used
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "left",
    gap: 8,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  // used
  image: {
    height: 60,
    width: 60,
  },
  // used
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  // used
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    padding: 5,
    marginRight: 10,
  },
  // used
  textContainer: {
    flex: 1,
  },
  // used
  header: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  // used
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  // used
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProfileSections;