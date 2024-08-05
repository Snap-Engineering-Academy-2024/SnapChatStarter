import { Image, Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import PopupCommInfo from "../components/PopupCommInfo";
import Onboarding from 'react-native-onboarding-swiper';

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const [popupTrigger, setPopupTrigger] = useState(false);

  useEffect(() => {
    setAstrology(userSign.sign);
  }, []);

  const Done = ({...props}) => (
    <TouchableOpacity
    {...props}
    >
    <Text style={{fontSize:20, marginHorizontal:50, marginTop: 10}}>Done</Text>
    </TouchableOpacity>
);
const Next = ({...props}) => (
  <TouchableOpacity
  {...props}
  >
  <Text style={{fontSize:20, marginHorizontal:50, marginTop: 10}}>Next</Text>
  </TouchableOpacity>
);
const Skip = ({...props}) => (
  <TouchableOpacity
  {...props}
  >
  <Text style={{fontSize:20, marginHorizontal:50, marginTop: 10}}>Skip</Text>
  </TouchableOpacity>
);

  return (
    <View style={{ alignItems: "center" }}>
      <PopupCommInfo trigger={popupTrigger} setTrigger={setPopupTrigger}>
        <Onboarding
       
          onSkip={() => navigation.replace("Profile")}
          onDone={() => navigation.replace("Profile")}
          DoneButtonComponent={Done}
          SkipButtonComponent={Skip}
          NextButtonComponent={Next}
          nextLabel="Next"
          pages={[
            {
              backgroundColor: 'white',
              bottomBarHeight: 80,
              image: (
                <>
                  <Text style={{ fontSize: 30, textAlign: 'center', marginBotton: 50 }}> Community Ping </Text>
                  <Image
                    source={{ uri: "https://static-prod.adweek.com/wp-content/uploads/2021/05/VansBitmojiHero.jpg" }}
                    style={{ width: 350, height: 200, borderRadius: 25, marginLeft: 25 }}
                  />
                  <Text style={{marginLeft: 35, marginRight: 20}}>Information about Community Ping - MIGUEL this pop up will happen once user is navigated to profile from pressing the "check out new feature!" button on the new feature notification - yellow pill button is temporary:)</Text>
                </>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: 'white',
              image: (
                <>
                  <Text style={{ fontSize: 30, textAlign: 'center', marginLeft: 50}}> Explore Features </Text>
                  <Image
                    source={{ uri: "https://static-prod.adweek.com/wp-content/uploads/2021/05/VansBitmojiHero.jpg" }}
                    style={{ width: 350, height: 200, borderRadius: 25, marginLeft: 60, marginRight: 20 }}
                  />
                  <Text style={{marginLeft: 50, marginRight: 30}}>Small text here on the description of what community ping is:0</Text>
                </>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: 'white',
              image: (
                <>
                  <Text style={{ fontSize: 30, textAlign: 'center', marginRight: 20}}> Explore Features </Text>
                  <Image
                    source={{ uri: "https://static-prod.adweek.com/wp-content/uploads/2021/05/VansBitmojiHero.jpg" }}
                    style={{ width: 350, height: 200, borderRadius: 25, marginLeft: 55 }}
                  />
                  <Text style={{marginLeft: 60, marginRight: 30}}>Small text here on the description of what community ping is:0</Text>
                </>
              ),
              title: '',
              subtitle: '',
            },
          ]}
        />
      </PopupCommInfo>

      <Image
        source={{ uri: "https://i.imgur.com/S28V6YH.jpeg" }}
        style={{ width: 400, height: 250 }}
      />

      <TouchableOpacity 
        style={styles.buttonStyle2} 
        onPress={() => {
          navigation.navigate("CommunitySelection");
        }}>
        <Text style={styles.buttonText2}> + Add Community</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonStyle2} 
        onPress={() => {
          setPopupTrigger(true);
        }}>
        <Text style={styles.buttonText2}> Community Ping Info</Text>
      </TouchableOpacity>

      <Text style={{ justifyContent: "center", fontWeight: "bold", fontSize: 30, marginRight: 100 }}>
        <Image
          source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
          style={{ width: 100, height: 100, borderRadius: 15, marginRight: 20 }}
        />
        UserName
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("Astrology");
        }}
        title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button onPress={handleSignOut} title="Log Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignItems: "center",
  },
  buttonStyle2: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FFFC00',
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 200,
  },
  buttonText2: {
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'black',
  },
});
