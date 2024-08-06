import { Image, Text, View, Button, StyleSheet, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import PopupCommInfo from "../components/PopupCommInfo";
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import defaultPhoto from "../../assets/snapchat/notificationPic.png";


const handleSignOut = async () => {
  try {
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const [badges, setBadges] = useState([]);

  const navigation = useNavigation();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const [popupTrigger, setPopupTrigger] = useState(false);


  useEffect(() => {
    setAstrology(userSign.sign);
  }, []);

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

  useEffect(() => {
    setBadges(staticBadges);
  }, []);

  const renderProductCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <Text style={styles.cardTitle}>{item.title.slice(0, 20)}</Text>
      <Text style={styles.cardTitle}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView>
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
                   <Image
                      source={{ uri: "https://i.imgur.com/Mf9d31I_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
                      style={{ width: 300, height: 200, borderRadius: 25, marginLeft: 40, marginBottom: 20, borderRadius: 0}}
                    />
                    <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 20, marginLeft: 25 }}>Community Ping</Text>
                    <Image
                      source={{ uri: "https://static-prod.adweek.com/wp-content/uploads/2021/05/VansBitmojiHero.jpg" }}
                      style={{ width: 350, height: 200, borderRadius: 25, marginLeft: 40 }}
                    />
                    <Text style={{ marginLeft: 53, marginRight: 20, marginBottom: 100 }}>NEW FEATURE FROM SNAPCHAT: Join a community that you identify most with and be pinged when you cross paths with someone within the same community that has the same interests as you.</Text>
                  </>
                ),
                title: '',
                subtitle: '',
              },
              {
                backgroundColor: 'white',
                image: (
                  <>
                    <Text style={{ fontSize: 30, textAlign: 'center', marginLeft: 50 }}>Explore Feature</Text>
                    <Image
                      // source={{ uri: "https://images.ctfassets.net/o1znirz7lzo4/7L9eorD4YKmaCOOKPi3BDm/8c1c03915dfd38420ce0176288b3fb68/New_Bitmoji_Avatar_Launch_Hero_Image.png?q=40&h=1080" }}
                      style={{ width: 350, height: 200, borderRadius: 25, marginLeft: 60, marginRight: 20 }}
                    />
                    <Text style={{ marginLeft: 50, marginRight: 30 }}>When you opt into having ping notifications, anytime you open up Snap we will see if there's anyone within your radius who'll possibly friend match with.</Text>
                  </>
                ),
                title: '',
                subtitle: '',
              },
              {
                backgroundColor: 'white',
                image: (
                  <>
                    <Text style={{ fontSize: 30, textAlign: 'center', marginRight: 20 }}>Connect!</Text>
                    <Image
                      source={{ uri: "https://mystickermania.com/cdn/stickers/logo/snapchat-heart-logo-512x512.png" }}
                      style={{ width: 350, height: 320, borderRadius: 25, marginRight: 20 }}
                    />
                    <Text style={{ marginLeft: 60, marginRight: 80 }}>Private information is anonymous until both parties confirm that they want to be friends. That's when the magic starts!</Text>
                  </>
                ),
                title: '',
                subtitle: '',
              },
            ]}
          />
        </PopupCommInfo>


        <Image
          source={{ uri: "https://i.imgur.com/YtlzPfc_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }} //header 
          style={{ width: 380, height: 350 }}
        />

       <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://i.imgur.com/y6nKGQF_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }} //pfp
          style={{ width: 100, height: 100, borderRadius: 15, marginRight: 20 }}
        />
        <View>
          <Text style={styles.realName}>Tyson Aguilar</Text>
          <Text style={styles.username}>tysonaguilar</Text>
        </View>
      </View>


        <Button
          onPress={() => {
            navigation.navigate("Astrology");
          }}
          title={astrology}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
         
        <View style={styles.buttonContainer}> 
        <TouchableOpacity
          style={styles.buttonStyle_Stats}>
          <Text style={styles.buttonText2}>👻 1,709</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle_Stats}>
          <Text style={styles.buttonText2}>♑︎Capricorn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle_Stats}>
          <Text style={styles.buttonText2}>+ Add College</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}> 
        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => {
            navigation.navigate("Select Identity!");
          }}>
          <Text style={styles.buttonText2}>+ Add Community</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => {
            setPopupTrigger(true);
          }}>
          <Text style={styles.buttonText2}>Community Ping Info</Text>
        </TouchableOpacity>

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
