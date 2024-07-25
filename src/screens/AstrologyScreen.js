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
  const userSign = findAstrologySign()

  useEffect(()=>{
    setAstrology(userSign.sign)
  }),[]

  useEffect(()=>{
    if(astrology === null) return
    getHoroscope();
    console.log(horoscope)
  }),[astrology]

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
    <View style={{ alignItems: "center", paddingTop: 50 }}>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        {astrology}
      </Text>
      <Text style={{ justifyContents: "center", paddingTop: 50 }}>
        {horoscope}
      </Text>
    </View>
  );
}
