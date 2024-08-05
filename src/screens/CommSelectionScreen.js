import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PopupCommInfo from "../components/PopupCommInfo";

export default function CommSelectionScreen() {
  const navigation = useNavigation();
  const [activePopup, setActivePopup] = useState(null);

  const communities = [
    {
      id: 'transgender',
      title: 'Transgender',
      description: 'Information about the Transgender community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'cisgender',
      title: 'Cisgender',
      description: 'Information about the Cisgender community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'intersexual',
      title: 'Intersexual',
      description: 'Information about the Intersexual community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'pansexual',
      title: 'Pansexual',
      description: 'Information about the Pansexual community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
  ];

  

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {communities.map((community) => (
          <PopupCommInfo key={community.id} trigger={activePopup === community.id} setTrigger={() => setActivePopup(null)}>
            <Text style={{ fontSize: 30, margin: 20 }}>{community.title}</Text>
            <Image
              source={{ uri: community.image }}
              style={{ width: 350, height: 300, borderRadius: 25 }}
            />

            <Text style={{marginTop: 20}}>{community.description}</Text>

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'lightyellow', marginTop: 90 }}>
            <Text style={{fontSize: 20, marginTop: 50, }}>Would you like to join the community?</Text>

            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle3}>
              <Text style={styles.buttonText3}>Don't Join</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle3} 
            onPress={() => {
                navigation.replace("InterestSelection");
              }}>
              <Text style={styles.buttonText3}>Join!</Text>
            </TouchableOpacity>

            
            </View>
           

            </View>
        


          </PopupCommInfo>
        ))}

        <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20, marginBottom: 15 }}>Identity</Text>

        <Image
          source={{ uri: "https://pbs.twimg.com/media/FULacdXX0AMqQKq?format=jpg&name=4096x4096" }}
          style={{ width: 350, height: 200, borderRadius: 25 }}
        />
        <Text style={{ marginTop: 20 }}>
          Welcome to Community Ping ~ Where you can join your community and find others in your area that share similar interests with you.
        </Text>

        <TouchableOpacity style={styles.filterButton}>
          <Text>Filter</Text>
        </TouchableOpacity>

        <Text
          style={{
            marginRight: 230,
            fontWeight: "300",
            fontSize: 30,
            marginTop: 30,
          }}>
          Sexuality
        </Text>

        {communities.map((community) => (
          <TouchableOpacity
            key={community.id}
            style={styles.buttonStyle2}
            onPress={() => setActivePopup(community.id)}
          >
            <Text style={styles.buttonText2}>{community.title}</Text>
            <Text> Small Description Here Blah Blah</Text>
          </TouchableOpacity>
        ))}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginTop: 40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignItems: "center",
  },
  buttonStyle2: {
    width: '80%',
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 30,
    // borderRadius: 200,
    elevation: 3,
    backgroundColor: "#FFFC00",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText2: {
    // fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 0.5,
    color: "black",
  },
  buttonStyle3: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 0,
    width: '40%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#FFFC00",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText3: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: "black",
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 300,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "lightgrey",
    borderColor: "black",
    borderWidth: 1,
  },
});


