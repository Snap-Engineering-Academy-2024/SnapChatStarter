import { Image, Text, View, StyleSheet } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useState, useEffect } from "react";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default function AstrologyScreen() {
  const [astrology, setAstrology] = useState(null);
  const [horoscope, setHoroscope] = useState();
  const userSign = findAstrologySign();

  useEffect(() => {
    setAstrology(userSign.sign);
  }),
    [];

  useEffect(() => {
    if (astrology === null) return;
    getHoroscope();
  }),
    [astrology];

  async function getHoroscope() {
    fetch(
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${astrology}&day=TODAY`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setHoroscope(result.data.horoscope_data))
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", paddingTop: 25 }}>
        <Text style={styles.contentTitles}>Your Sign</Text>
        <Text style={styles.sign}>{astrology}</Text>
        <Text style={styles.contentTitles}>Today's Horoscope</Text>
        <Text style={styles.contentText}>{horoscope}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "purple",
  },
  contentTitles: {
    justifyContents: "center",
    fontFamily: "Papyrus",
    fontWeight: "bold",
    fontSize: 30,
    color: "gold"
  },
  sign: {
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: "Papyrus",
    fontSize: 25,
    color: "lightyellow"
  },
  contentText: {
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: "Papyrus",
    fontSize: 18,
    color: "lightyellow"
  },
});
