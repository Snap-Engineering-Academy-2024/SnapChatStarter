import { color } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const sign = {
  "Aquarius": "♒︎",
  "Aries": "♈︎",
  "Capricorn": "♑",
  "Cancer": "♋︎",
  "Gemini": "♊︎",
  "Leo": "♌︎",
  "Libra": "♎︎",
  "Pisces": "♓︎",
  "Sagittarius": "♐︎",
  "Scorpio": "♏︎",
  "Taurus": "♉︎",
  "Virgo": "♍︎",

}

const DraggableBadgeList = ({ badgeOnPressHandlers, astrology, snapScore = "1,738" }) => {
  const [data, setData] = useState([
    { key: "1", label: snapScore, color: "#ececee", logo: "👻", textColor: "black" },
    { key: "2", label: astrology, color: "#ececee", logo: sign[astrology], textColor: "black" },
    { key: "3", label: "SnapTogether", color: "#ececee", logo: "💜", textColor: "#9900ff", borderColor: "#9900ff" },
  ]);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === "2" ? { ...item, label: astrology } : item
      )
    );
  }, [astrology]);

  const renderItem = ({ item, drag, isActive }) => {
    const label = item.label;
    const logo = item.logo
    const textColor = item.textColor

    return (
      <TouchableOpacity
        style={[
          styles.badge,
          { backgroundColor: isActive ? "blue" : item.color,  },
          item.borderColor ? {borderWidth: 1, borderColor: item.borderColor} : {borderWidth: 0}
          
        ]}
        onLongPress={drag}
        onPress={() => badgeOnPressHandlers[label]?.()}
      >
        <Text style={[styles.badgeIcon, {color: textColor}]}>{logo}</Text>
        <Text style={[styles.badgeText, {color: textColor}]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.draggableContainer}>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  draggableContainer: {
    height: 40,
    marginBottom: 20,
  },
  badge: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    flex: 1,
    flexDirection: "row",
    gap: 5
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  badgeIcon: {
    fontSize: 14,
    fontWeight: "bold",
  }
});

export default DraggableBadgeList;
