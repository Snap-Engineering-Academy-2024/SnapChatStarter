import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PopupCommInfo from "../components/PopupCommInfo";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { supabase } from '../utils/hooks/supabase';



export default function CommSelectionScreen() {
  const navigation = useNavigation();
  const [theGenders, setTheGenders] = useState([]);
  const [theOrientations, setTheOrientations] = useState([]);
  const [theBackgrounds, setTheBackgrounds] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const { user } = useAuthentication();

const writeToTableComm = async (text) => {
  // Step 1: Fetch the existing record
  const { data: existingData, error: fetchError } = await supabase
    .from('profiles')
    .select('community')
    .eq('id', user.id)
    .single();

  if (fetchError) {
    console.error('Error fetching existing data:', fetchError);
  } else {
    // Step 2: Set the community field to the new text
    const updatedCommunity = text;

    // Step 3: Upsert the updated record
    const { data: upsertedData, error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id, // Use the user ID to identify the record
        community: updatedCommunity // Set the community field to the new text
      });

    if (upsertError) {
      console.error('Error upserting data:', upsertError);
    } else {
      console.log('Upsert successful:', upsertedData);
    }
  }
};


  const handlePress = async (text) => {
    await writeToTableComm(text);
    navigation.replace("InterestSelection");
  };
  
  const genders = [
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
      id: 'agender',
      title: 'Agender',
      description: 'Information about the Agender community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'another gender',
      title: 'Another gender',
      description: 'Information about another community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
  ];

  const orientations = [
    {
      id: 'bisexual',
      title: 'Bisexual',
      description: 'Information about the Bisexual community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'pansexual',
      title: 'Pansexual',
      description: 'Information about the Pansexual community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'another sexuality',
      title: 'n/a',
      description: 'Information about a sexual identity1    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'another sexuality2',
      title: 'n/a',
      description: 'Information about a sexual identity    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
  ];

  const backgrounds = [
    {
      id: 'background1',
      title: 'background1',
      description: 'Information about the Bisexual community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'background2',
      title: 'background2',
      description: 'Information about the Pansexual community    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'background3',
      title: 'background3',
      description: 'Information about a sexual identity1    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
    {
      id: 'background4',
      title: 'background4',
      description: 'Information about a sexual identity    boobie doobie do',
      image: 'https://i.imgur.com/zGcHKVl.png',
    },
  ];

  useEffect(() => {
    setTheGenders(genders);
  }, []);

  useEffect(() => {
    setTheOrientations(orientations);
  }, []);
  useEffect(() => {
    setTheBackgrounds(backgrounds);
  }, []);

  useEffect(() => {
    
  }, [user]);

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
        {genders.map((gender) => (
          <PopupCommInfo key={gender.id} trigger={activePopup === gender.id} setTrigger={() => setActivePopup(null)}>
            <Text style={styles.popupTitle}>{gender.title}</Text>
            <Image
              source={{ uri: gender.image }}
              style={styles.popupImage}
            />
            <Text style={styles.popupDescription}>{gender.description}</Text>
            <View style={styles.popupFooter}>
              <Text style={styles.popupFooterText}>Would you like to join the community?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle3}>
                  <Text style={styles.buttonText3}>Don't Join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle3} onPress={() => handlePress(gender.id)}>
                  <Text style={styles.buttonText3}>Join!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </PopupCommInfo>
        ))}
        {orientations.map((orientation) => (
          <PopupCommInfo key={orientation.id} trigger={activePopup === orientation.id} setTrigger={() => setActivePopup(null)}>
            <Text style={styles.popupTitle}>{orientation.title}</Text>
            <Image
              source={{ uri: orientation.image }}
              style={styles.popupImage}
            />
            <Text style={styles.popupDescription}>{orientation.description}</Text>
            <View style={styles.popupFooter}>
              <Text style={styles.popupFooterText}>Would you like to join the community?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle3}>
                  <Text style={styles.buttonText3}>Don't Join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle3} onPress={() => handlePress(orientation.id)}>
                  <Text style={styles.buttonText3}>Join!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </PopupCommInfo>
        ))}

        {backgrounds.map((background) => (
          <PopupCommInfo key={background.id} trigger={activePopup === background.id} setTrigger={() => setActivePopup(null)}>
            <Text style={styles.popupTitle}>{background.title}</Text>
            <Image
              source={{ uri: background.image }}
              style={styles.popupImage}
            />
            <Text style={styles.popupDescription}>{background.description}</Text>
            <View style={styles.popupFooter}>
              <Text style={styles.popupFooterText}>Would you like to join the community?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle3}>
                  <Text style={styles.buttonText3}>Don't Join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle3} onPress={() => handlePress(background.id)}>
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
          data={theGenders}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
        />

        <Text style={styles.sectionTitle}>Sexual Orientation</Text>
        <FlatList
          data={theOrientations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
        />

        <Text style={styles.sectionTitle}>Ethnic Background</Text>
        <FlatList
          data={theBackgrounds}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
        />
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
