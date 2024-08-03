import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  return (
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
  );
};

const styles = StyleSheet.create({
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
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    padding: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  badgeContainer: {
    backgroundColor: "#00f",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProfileSections;
