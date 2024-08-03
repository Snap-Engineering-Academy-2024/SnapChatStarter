import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const DraggableBadgeList = ({ onPressHandlers, astrology = "Astrology" }) => {
  const [data, setData] = useState([
    { key: "1", label: astrology, color: "white" },
    { key: "2", label: "🫶🏻🫶🏽🫶🏿", color: "white" },
  ]);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={[
          styles.badge,
          { backgroundColor: isActive ? "blue" : item.color },
        ]}
        onLongPress={drag}
        onPress={() => onPressHandlers[item.label]()}
      >
        <Text style={styles.badgeText}>{item.label}</Text>
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
    height: 60,
    marginBottom: 20,
  },
  badge: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderWidth: .5,
    borderColor: "grey",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "purple",
    fontWeight: "bold",
  },
});

export default DraggableBadgeList;
