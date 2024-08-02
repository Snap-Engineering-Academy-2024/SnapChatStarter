import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const DraggableButtonList = ({ onPressHandlers }) => {
  const [data, setData] = useState([
    { key: "1", label: "Astrology", color: "#841584" },
    { key: "2", label: "Snap Together Badge", color: "brown" },
  ]);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isActive ? "blue" : item.color },
        ]}
        onLongPress={drag}
        onPress={() => onPressHandlers[item.label]()}
      >
        <Text style={styles.buttonText}>{item.label}</Text>
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
    height: 100,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DraggableButtonList;
