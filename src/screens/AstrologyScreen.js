import { Image, Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default function AstrologyScreen() {
  const [astrology, setAstrology] = useState(null);
  const [horoscope, setHoroscope] = useState();
  const [signAbout, setSignAbout] = useState();
  const [signElement, setSignElement] = useState();
  const [signCompatibility, setSignCompatibility] = useState();
  const userSign = findAstrologySign();

  useEffect(() => {
    setAstrology(userSign.sign);
  }),
    [];

  useEffect(() => {
    if (astrology === null) return;
    getHoroscope();
    getSignDescription();
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

  async function getSignDescription() {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-host", "horoscope-astrology.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", process.env.EXPO_PUBLIC_X_RAPIDAPI_KEY);

    const url = `https://horoscope-astrology.p.rapidapi.com/sign?s=${astrology.toLowerCase()}`;
    const options = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        setSignAbout(result.about);
        setSignElement(result.element);
        setSignCompatibility(result.compatibility);
      })
      .catch((error) => console.error("Error message:", error));
  }

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", paddingTop: 25 }}>
        <Text style={styles.contentTitles}>Your Sign</Text>
        <Text style={styles.sign}>{astrology}</Text>
        <Text style={styles.contentTitles}>Element</Text>
        <Text style={styles.contentText}>{signElement}</Text>
        <Text style={styles.contentTitles}>About</Text>
        <Text style={styles.contentText}>{signAbout}</Text>
        <Text style={styles.contentTitles}>Compatible Signs</Text>
        <Text style={styles.contentText}>{signCompatibility}</Text>
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
    color: "gold",
  },
  sign: {
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: "Papyrus",
    fontSize: 25,
    color: "lightyellow",
  },
  contentText: {
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: "Papyrus",
    fontSize: 18,
    color: "lightyellow",
  },
});
