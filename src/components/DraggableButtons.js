import { color } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const sign = {
  Aquarius: require("../../assets/sign-images/aquarius.png"),
  Aries: require("../../assets/sign-images/aries.png"),
  Cancer: require("../../assets/sign-images/cancer.png"),
  Capricorn: require("../../assets/sign-images/capricorn.png"),
  Gemini: require("../../assets/sign-images/gemini.png"),
  Leo: require("../../assets/sign-images/leo.png"),
  Libra: require("../../assets/sign-images/libra.png"),
  Pisces: require("../../assets/sign-images/pisces.png"),
  Sagittarius: require("../../assets/sign-images/sagittarius.png"),
  Scorpio: require("../../assets/sign-images/scorpio.png"),
  Taurus: require("../../assets/sign-images/taurus.png"),
  Virgo: require("../../assets/sign-images/virgo.png"),
};

const DraggableBadgeList = ({
  badgeOnPressHandlers,
  astrology,
  snapScore = "1,738,000",
}) => {
  const [data, setData] = useState([
    {
      key: "1",
      label: snapScore,
      color: "#ececee",
      logo: require("../../assets/snapchat/ghostlogo.png"),
      textColor: "black",
    },
    {
      key: "2",
      label: astrology,
      color: "#ececee",
      logo: sign[astrology],
      textColor: "black",
    },
    {
      key: "3",
      label: "SnapTogether",
      color: "#ececee",
      logo: require("../../assets/SnapTogether/SnapTogetherLogoPurple.png"),
      textColor: "#9900ff",
      borderColor: "#9900ff",
    },
  ]);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === "2" ? { ...item, label: astrology, logo: sign[astrology] } : item
      )
    );
  }, [astrology]);

  const renderItem = ({ item, drag, isActive }) => {
    const label = item.label;
    const logo = item.logo;
    const textColor = item.textColor;

    return (
      <Pressable
        style={[
          styles.badge,
          { backgroundColor: isActive ? "blue" : item.color },
          item.borderColor
            ? { borderWidth: 1, borderColor: item.borderColor }
            : { borderWidth: 0 },
        ]}
        onLongPress={drag}
        onPress={() => badgeOnPressHandlers[label]?.()}
      >
        <Image source={logo} style={styles.badgeIcon} />
        <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
      </Pressable>
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
    gap: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  badgeIcon: {
    width: 22,
    height: 22,
    fontWeight: "bold",
  },
});

export default DraggableBadgeList;
