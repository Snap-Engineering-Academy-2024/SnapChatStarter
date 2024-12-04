import { Image, Text, View, Button, StyleSheet, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import PopupCommInfo from "../components/PopupCommInfo";
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from '../utils/hooks/supabase';
import defaultPhoto from "../../assets/snapchat/notificationPic.png";


const handleSignOut = async () => {
  try {
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
function formatInterests (arr)
{
  let holdString = "";
  for (let i =0; i < arr.length; i++ )
  {
    holdString += arr[i];
    if (i !== arr.length-1)
      holdString += "|";
  }
  return holdString;
}

export default function ProfileScreen() {
  const [badges, setBadges] = useState([]);

  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [community, setCommunity] = useState("Test");
  const [interests, setInterests] = useState(["Wee", "Wee", "Wee"]);
  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles') // Replace with your table name
        .select('community, interests')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      console.log(data.community);
      if (data.community === null)
        {
          console.log("Shows add community");
        }
        else
        {
          setPopupTrigger(true);
          setCommunity(data.community);
          setInterests(data.interests)
          console.log("Shows specific community")
        }

    } catch (error) {
      console.error('Error fetching user data:', error.message);
      
    }
  };



  // useEffect(() => {
  //   setAstrology(userSign.sign);
  //   const checkCondition = async () => {
  //     if (user != null)
  //       await fetchUserData();
  //   };

  // }, [popupTrigger, user]);
  useEffect(() => {
    const fetchData = async () => {
      setAstrology(userSign.sign);

      if (user != null) {
        await fetchUserData();
      }
    };

    fetchData();
  }, [user]);


  const Done = ({ ...props }) => (
    <TouchableOpacity {...props}>
      <Text style={{ fontSize: 20, marginHorizontal: 50, marginTop: 10 }}>Done</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity {...props}>
      <Text style={{ fontSize: 20, marginHorizontal: 50, marginTop: 10 }}>Next</Text>
    </TouchableOpacity>
  );

  const Skip = ({ ...props }) => (
    <TouchableOpacity {...props}>
      <Text style={{ fontSize: 20, marginHorizontal: 50, marginTop: 10 }}>Skip</Text>
    </TouchableOpacity>
  );

  
  const staticBadges = [
    {
      id: 1,
      title: "Community Charm",
      description: "Joined a Community!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmqoyhZloidNX8kejEVjmZWiG5tXA3Jt0Oxg&s"
    },
    {
      id: 2,
      title: "Badge 2",
      description: "",
      image: "https://example.com/product2.jpg"
    },
    {
      id: 3,
      title: "Badge 3",
      description: "",
      image: "https://example.com/product3.jpg"
    }
  ];


  const renderProductCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <Text style={styles.cardTitle}>{item.title.slice(0, 20)}</Text>
      <Text style={styles.cardTitle}>{item.description}</Text>
    </View>
  );

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
        //style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
        style={{ width: 400, height: 250}}
      />
<<<<<<<<< Temporary merge branch 1
      <Text
        style={{
          justifyContents: "center",
          textAlign: "center",
        }}
      >
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@"), // gets part before @ of email address, should use profile username instead
          )}
      </Text>
=========
      <Text style={{ justifyContents: "center", fontWeight: "bold", fontSize: 30, marginRight: 35}}>
      <Image
        source={{ uri: "https://i.imgur.com/FxsJ3xy.jpg" }}
        style={{ width: 100, height: 100, borderRadius: 15, marginRight: 100}}
      />
        UserName</Text>
>>>>>>>>> Temporary merge branch 2
      <Button
        onPress={() => {
          navigation.navigate("Astrology");
        }}
        title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button onPress={handleSignOut} title="Log Out" />
      <Pressable>
        <Button
          onPress={() => {
            if (!popupTrigger)
              navigation.navigate("Select Identity!");
          }}>
          <Text style={styles.buttonText2}>
          {popupTrigger ? formatInterests(interests) : '+ Add Community'}
          </Text>
            
          </TouchableOpacity>
        }

      </View>

      <Text style={{marginRight: 280, fontWeight:'bold', marginTop: 30, marginBottom: 10}}>My Stories</Text>
      <Image
          source={{ uri: "https://i.imgur.com/HCIsOeC_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }} //header 
          style={{ width: 360, height: 170 }}
        />

      <Text style={{marginRight: 280, fontWeight:'bold', marginTop: 30, marginBottom: 10}}>Friends</Text>
      <Image
          source={{ uri: "https://i.imgur.com/60qiS5e_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }} //header 
          style={{ width: 350, height: 230 }}
        />


      <Text style={{marginRight: 300, fontWeight:'bold', marginTop: 30}}>Charms</Text>

        <FlatList
          data={badges}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
        />

        <Button onPress={handleSignOut} title="Log Out" />


        <View style={{ marginBottom: 20 }}></View>
      </View>
    </ScrollView>
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
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FFFC00',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonStyle_Stats: {
    margin: 10,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'lightgrey',
    
  },
  buttonText2: {
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'black',
  },
  cardContainer: {
    margin: 20,
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    height: 160,
    padding: 10,
    marginBottom: 50,
  },
  cardImage: {
    height: 100,
    width: '90%',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginRight: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginRight: 50,
    marginBottom: 0,
  },
  realName: {
    fontWeight: "bold",
    fontSize: 30,
  },
  username: {
    fontSize: 16,
    color: 'gray',
  },
});
