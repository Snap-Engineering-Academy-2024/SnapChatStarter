import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useAuthentication } from "./useAuthentication";

const zodiac = [
  ["Capricorn", "Aquarius"],
  ["Aquarius", "Pisces"],
  ["Pisces", "Aries"],
  ["Aries", "Taurus"],
  ["Taurus", "Gemini"],
  ["Gemini", "Cancer"],
  ["Cancer", "Leo"],
  ["Leo", "Virgo"],
  ["Virgo", "Libra"],
  ["Libra", "Scorpio"],
  ["Scorpio", "Sagittarius"],
  ["Sagittarius", "Capricorn"],
];

export function findAstrologySign() {
  const [birthday, setBirthday] = useState(["05", "01"]);
  const [sign, setSign] = useState("");
  const day = parseInt(birthday[1]);
  const { user } = useAuthentication();

  useEffect(() => {
    async function fetchUserBirthday() {
      if (user === null) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("birthday")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("Birthday fetch failure");
      } else if (data.birthday) {
        // setBirthday(data.birthday);
        console.log(data.birthday)
      }
    }

    fetchUserBirthday();
  }, [user]);

  //   determine the sign based on birthday
  useEffect(() => {
    switch (birthday[0]) {
      case "01":
        if (day <= 20) {
          setSign(zodiac[0][0]);
        } else {
          setSign(zodiac[0][1]);
        }
        break;
      case "02":
        if (day <= 20) {
          setSign(zodiac[1][0]);
        } else {
          setSign(zodiac[1][1]);
        }
        break;
      case "03":
        if (day <= 20) {
          setSign(zodiac[2][0]);
        } else {
          setSign(zodiac[2][1]);
        }
        break;
      case "04":
        if (day <= 20) {
          setSign(zodiac[3][0]);
        } else {
          setSign(zodiac[3][1]);
        }
        break;
      case "05":
        if (day <= 20) {
          setSign(zodiac[4][0]);
        } else {
          setSign(zodiac[4][1]);
        }
        break;
      case "06":
        if (day <= 20) {
          setSign(zodiac[5][0]);
        } else {
          setSign(zodiac[5][1]);
        }
        break;
      case "07":
        if (day <= 20) {
          setSign(zodiac[6][0]);
        } else {
          setSign(zodiac[6][1]);
        }
        break;
      case "08":
        if (day <= 20) {
          setSign(zodiac[7][0]);
        } else {
          setSign(zodiac[7][1]);
        }
        break;
      case "09":
        if (day <= 20) {
          setSign(zodiac[8][0]);
        } else {
          setSign(zodiac[8][1]);
        }
        break;
      case "10":
        if (day <= 20) {
          setSign(zodiac[9][0]);
        } else {
          setSign(zodiac[9][1]);
        }
        break;
      case "11":
        if (day <= 20) {
          setSign(zodiac[10][0]);
        } else {
          setSign(zodiac[10][1]);
        }
        break;
      case "12":
        if (day <= 20) {
          setSign(zodiac[11][0]);
        } else {
          setSign(zodiac[11][1]);
        }
        break;
    }
  }),
    [];
  return { sign };
}
