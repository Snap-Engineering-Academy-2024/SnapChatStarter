import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PopupCommInfo from "../components/PopupCommInfo";

export default function CommSelectionScreen() {
  const navigation = useNavigation();
  const [theCommunities, setTheCommunities] = useState([]);
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

  useEffect(() => {
    setTheCommunities(communities);
  }, []);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => setActivePopup(item.id)}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {communities.map((community) => (
          <PopupCommInfo key={community.id} trigger={activePopup === community.id} setTrigger={() => setActivePopup(null)}>
            <Text style={styles.popupTitle}>{community.title}</Text>
            <Image
              source={{ uri: community.image }}
              style={styles.popupImage}
            />
            <Text style={styles.popupDescription}>{community.description}</Text>
            <View style={styles.popupFooter}>
              <Text style={styles.popupFooterText}>Would you like to join the community?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle3}>
                  <Text style={styles.buttonText3}>Don't Join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle3} onPress={() => navigation.replace("InterestSelection")}>
                  <Text style={styles.buttonText3}>Join!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </PopupCommInfo>
        ))}

        <Image
          source={{ uri: "https://pbs.twimg.com/media/FULacdXX0AMqQKq?format=jpg&name=4096x4096" }}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Select your identity that best suits you!</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Filter</Text>
        </TouchableOpacity>

        <Text style={{
            marginRight: 270,
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
        }}>Gender</Text>
        {/* {communities.map((community) => (
          <TouchableOpacity
            key={community.id}
            style={styles.buttonStyle2}
            onPress={() => setActivePopup(community.id)}
          >
            <Text style={styles.buttonText2}>{community.title}</Text>
            <Text>Small Description Here Blah Blah</Text>
          </TouchableOpacity>
        ))} */}

        <FlatList
          data={theCommunities}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
        />

        <Text style={styles.sectionTitle}>Sexual Orientation</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginTop: 40,
  },
  buttonStyle2: {
    width: '80%',
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 30,
    elevation: 3,
    backgroundColor: "#FFFC00",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText2: {
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
    marginLeft: 250,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "lightgrey",
    borderColor: "black",
    borderWidth: 1,
  },
  cardContainer: {
    margin: 20,
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    height: 280,
    padding: 10,
    marginBottom: 50,
  },
  cardImage: {
    marginLeft: 10,
    height: 100,
    width: '90%',
    resizeMode: 'contain',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  cardDescription: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
  popupTitle: {
    fontSize: 30,
    margin: 20,
    fontWeight: 'bold',
  },
  popupImage: {
    width: 350,
    height: 300,
    borderRadius: 25,
  },
  popupDescription: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  popupFooter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'lightyellow',
    marginTop: 90,
    padding: 20,
  },
  popupFooterText: {
    fontSize: 20,
    marginTop: 50,
  },
  headerImage: {
    width: 428,
    height: 200,
  },
  headerText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  sectionTitle: {
    marginRight: 175,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
});
