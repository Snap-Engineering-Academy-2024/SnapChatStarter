import React, { useEffect, useState, useRef } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, ImageBackground, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { supabase } from '../utils/hooks/supabase';

export default function CommSelectionScreen() {
  const navigation = useNavigation();
  const [theGenders, setTheGenders] = useState([]);
  const [theOrientations, setTheOrientations] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedOrientation, setSelectedOrientation] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [choice, setChoice] = useState(null);
  const { user } = useAuthentication();

  const writeToTableComm = async () => {
    const { data: existingData, error: fetchError } = await supabase
      .from('profiles')
      .select('community')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching existing data:', fetchError);
    } else {
      const updatedCommunity = choice;

      const { data: upsertedData, error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          community: updatedCommunity
        });

      if (upsertError) {
        console.error('Error upserting data:', upsertError);
      } else {
        console.log('Upsert successful:', upsertedData);
      }
    }
  };
  function handleClick (text)
  {
    setChoice(text);
  }
  const handlePress = async () => {
    await writeToTableComm();
    navigation.replace("Interests");
  };

  const genders = [
    {
      id: 'n/aGender',
      title: 'Prefer Not to Respond',
      description: 'Will not associate with a community.',
      image: 'https://i.imgur.com/2lscqsC_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'cisgender female',
      title: 'Cisgender Female',
      description: 'Identifies with the gender assigned to her at birth.',
      image: 'https://i.imgur.com/ivr8j5I_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'cisgender male',
      title: 'Cisgender Male',
      description: 'Identifies with the gender assigned to him at birth',
      image: 'https://i.imgur.com/avZBiIT_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'transgender',
      title: 'Transgender',
      description: 'Different gender from the one assigned at birth.',
      image: 'https://i.imgur.com/41jJ7kP_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'bisgender',
      title: 'Bigender',
      description: 'Information about the Bigender community boobie doobie do',
      image: 'https://i.imgur.com/6HKmTPb_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'agender',
      title: 'Agender',
      description: 'Information about the Agender community boobie doobie do',
      image: 'https://i.imgur.com/jIR7GpM_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'genderfluid',
      title: 'Genderfluid',
      description: 'Information about the Genderfluid community boobie doobie do',
      image: 'https://i.imgur.com/Xh5GPp5_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
  ];

  const orientations = [
    {
      id: 'n/aOrientation',
      title: 'Prefer Not to Respond',
      description: 'Will not associate with a community.',
      image: 'https://i.imgur.com/2lscqsC_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'heterosexual',
      title: 'Heterosexual',
      description: 'Information about the Heterosexual community boobie doobie do',
      image: 'https://i.imgur.com/28OQ5ry_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'pansexual',
      title: 'Pansexual',
      description: 'Information about the Pansexual community boobie doobie do',
      image: 'https://i.imgur.com/oSYZBD0_d.jpg?maxwidth=520&shape=thumb&fidelity=high',
    },
    {
      id: 'another sexuality2',
      title: 'n/a',
      description: 'Information about a sexual identity boobie doobie do',
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
    setTheOrientations(orientations);
  }, []);

  
  
  const handleGenderPress = (id) => {
    setSelectedGender(id);
    setSelectedOrientation(null);
  };

  const handleOrientationPress = (id) => {
    setSelectedOrientation(id);
    setSelectedGender(null);
  };

  const handleContinue = () => {
    console.log('Selected Gender:', selectedGender);
    console.log('Selected Orientation:', selectedOrientation);
  };

  const renderProductCard = (item, handlePress, selectedId) => (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        selectedId === item.id && { borderColor: '#2196F3' }
      ]}
      onPress={() => handleClick(item.id)}
    >
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://i.imgur.com/yVDecp2_d.jpg?maxwidth=520&shape=thumb&fidelity=high' }} 
      style={styles.backgroundImage}
    >
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: "https://i.imgur.com/msUPFJT_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Select any identities that best suit you!</Text>
          <Text style={{ marginRight: 275, fontWeight: "bold", fontSize: 20, marginTop: 20 }}>Gender</Text>
          <FlatList
            data={theGenders}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderProductCard(item, handleGenderPress, selectedGender)}
          />
          <Text style={styles.sectionTitle}>Sexual Orientation</Text>
          <FlatList
            data={theOrientations}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderProductCard(item, handleOrientationPress, selectedOrientation)}
          />
        </View>
      </ScrollView>
      <Animated.View style={[styles.continueButtonContainer, {
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          })
        }]
      }]}>
        <TouchableOpacity style={styles.continueButton} 
        onPress={() => {
            handlePress();
          }}>
          <Text style={styles.continueButtonText}>
            <Image
              source={{ uri: "https://i.imgur.com/71FOGMX_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
              style={{ width: 40, height: 30 }}
            />
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 90,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  cardContainer: {
    margin: 20,
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    height: 230,
    padding: 10,
    marginBottom: 10,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  selectedCard: {
    borderColor: 'blue',
  },
  cardImage: {
    marginLeft: 10,
    height: 150,
    width: '90%',
    resizeMode: 'contain',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  cardDescription: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  headerImage: {
    width: 418,
    height: 220,
    marginTop: 20,
  },
  headerText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
  },
  sectionTitle: {
    marginRight: 175,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
  continueButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1000,
  },
  continueButton: {
    backgroundColor: '#0fadfe',
    paddingVertical: 13,
    paddingHorizontal: 13,
    borderRadius: 400,
    
  },
  continueButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
