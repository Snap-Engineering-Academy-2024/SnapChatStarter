import { Image, Text, View, Button } from "react-native";
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
    <View style={{ alignItems: "center", paddingTop: 50 }}>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        {astrology}
      </Text>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        {horoscope}
      </Text>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        {signAbout}
      </Text>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        Element: {signElement}
      </Text>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        Compatible signs: {signCompatibility}
      </Text>
    </View>
  );
}
