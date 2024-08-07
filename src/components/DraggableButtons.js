import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const DraggableBadgeList = ({ badgeOnPressHandlers, astrology }) => {
  const [data, setData] = useState([
    { key: "1", label: astrology, color: "white" },
    { key: "2", label: "🫶🏻🫶🏽🫶🏿", color: "white" },
  ]);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === "1" ? { ...item, label: astrology } : item
      )
    );
  }, [astrology]);

  const renderItem = ({ item, drag, isActive }) => {
    const label = item.label;

    return (
      <TouchableOpacity
        style={[
          styles.badge,
          { backgroundColor: isActive ? "blue" : item.color },
        ]}
        onLongPress={drag}
        onPress={() => badgeOnPressHandlers[label]?.()} // Safely call the handler if it exists
      >
        <Text style={styles.badgeText}>{label}</Text>
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
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "purple",
    fontSize: 15,
  },
});

export default DraggableBadgeList;
