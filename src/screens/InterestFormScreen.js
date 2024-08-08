// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput, ImageBackground, Animated, scrollY } from "react-native";
// import PopupLocationNotification from "../components/PopupLocationNotification";
// import { useNavigation } from "@react-navigation/native";
// import { useAuthentication } from '../utils/hooks/useAuthentication';
// import { supabase } from '../utils/hooks/supabase';

// const trendingInterests = [
//   { name: "Charli XCX", category: "Music" },
//   { name: "Twilight", category: "Pop Culture & Entertainment" },
//   { name: "Cooking", category: "Hobby" },
//   { name: "Skating", category: "Sport" },
//   { name: "Dance", category: "Hobby" }
// ];

// function InterestSelectionScreen() {
//   const navigation = useNavigation();
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [popupTrigger, setPopupTrigger] = useState(false);
//   const { user } = useAuthentication();

//   const handlePress = async (text) => {
//     await writeToTable(text);
//     setPopupTrigger(true);
//   };

//   const writeToTable = async () => {
//     const { data: existingData, error: fetchError } = await supabase
//       .from('profiles')
//       .select('interests')
//       .eq('id', user.id)
//       .single();

//     if (fetchError) {
//       console.error('Error fetching existing data:', fetchError);
//     } else {
//       const { data: upsertedData, error: upsertError } = await supabase
//         .from('profiles')
//         .upsert({
//           id: user.id,
//           interests: selectedInterests
//         });

//       if (upsertError) {
//         console.error('Error upserting data:', upsertError);
//       } else {
//         console.log('Upsert successful:', upsertedData);
//       }
//     }
//   };

//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleInterest = (interest) => {
//     if (selectedInterests.includes(interest)) {
//       setSelectedInterests(selectedInterests.filter((i) => i !== interest));
//     } else {
//       setSelectedInterests([...selectedInterests, interest]);
//     }
//   };

//   useEffect(() => {
//     if (selectedInterests.length === 3) {
//       console.log(selectedInterests);
//     }
//   }, [selectedInterests]);

//   return (
//     <ImageBackground
//       source={{ uri: 'https://i.imgur.com/l1oUU7G_d.jpg?maxwidth=520&shape=thumb&fidelity=high' }}
//       style={styles.backgroundImage}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Find Interests"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <Image
//           source={{ uri: "https://i.imgur.com/tT6wWW3_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
//           style={styles.headerImage}
//         />
//         <Text style={styles.headerText}>Add 3 of your current interests to connect with others!</Text>
//         <View style={styles.trendingContainer}>
//           <Text style={styles.trendingTitle}>Trending Interests</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeMore}>See More</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.interestsContainer}>
//           {trendingInterests.map((interest) => (
//             <View key={interest.name} style={styles.interestItem}>
//               <View style={styles.interestTextContainer}>
//                 <Text style={styles.interestName}>{interest.name}</Text>
//                 <Text style={styles.interestCategory}>{interest.category}</Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.addButton,
//                   selectedInterests.includes(interest.name) && styles.selectedAddButton,
//                 ]}
//                 onPress={() => toggleInterest(interest.name)}
//               >
//                 <Text style={styles.addButtonText}>
//                   {selectedInterests.includes(interest.name) ? "Added" : "+ Add"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//         {/* <TouchableOpacity style={styles.submitButton} onPress={() => { setPopupTrigger(true); }}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity> */}
//         <Animated.View style={[styles.continueButtonContainer, {
//         transform: [{
//           translateY: scrollY.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, 1],
//             extrapolate: 'clamp'
//           })
//         }]
//       }]}>
//         <TouchableOpacity style={styles.continueButton} 
//         onPress={() => {
//             navigation.navigate("Interests");
//           }}>
//           <Text style={styles.continueButtonText}>
//             <Image
//               source={{ uri: "https://i.imgur.com/71FOGMX_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
//               style={{ width: 40, height: 30 }}
//             />
//           </Text>
//         </TouchableOpacity>
//         </Animated.View>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   searchBar: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 20,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 20,
//     backgroundColor: 'white',
//   },
//   headerImage: {
//     width: 380,
//     height: 280,
//   },
//   headerText: {
//     marginTop: 10,
//     fontSize: 15,
//     textAlign: 'center',
//     color: 'grey',
//   },
//   trendingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingVertical: 10,
//   },
//   trendingTitle: {
//     fontSize: 17,
//     fontWeight: "bold",
//   },
//   seeMore: {
//     fontSize: 14,
//     color: 'black',
//   },
//   interestsContainer: {
//     width: '100%',
//   },
//   interestItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: 'lightgrey',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     paddingRight: 10, 
//     paddingLeft: 10,
//   },
//   interestTextContainer: {
//     flexDirection: 'column',
   
//   },
//   interestName: {
//     fontSize: 16,
//   },
//   interestCategory: {
//     fontSize: 12,
//     color: 'grey',
//   },
//   addButton: {
//     backgroundColor: "#0fadfe",
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//   },
//   selectedAddButton: {
//     backgroundColor: "#0fadfe",
//   },
//   addButtonText: {
//     color: "white",
//     fontSize: 14,
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: "#FFFC00",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 20,
//     borderColor: "black",
//     borderWidth: 1,
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "black",
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   continueButtonContainer: {
//     position: 'absolute',
//     bottom: 30,
//     right: 30,
//     zIndex: 1000,
//   },
//   continueButton: {
//     backgroundColor: '#0fadfe',
//     paddingVertical: 13,
//     paddingHorizontal: 13,
//     borderRadius: 400,
    
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
// });

// export default InterestSelectionScreen;


import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput, ImageBackground } from "react-native";
import PopupLocationNotification from "../components/PopupLocationNotification";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { supabase } from '../utils/hooks/supabase';

const trendingInterests = [
  { name: "Charli XCX", category: "Music" },
  { name: "Twilight", category: "Pop Culture & Entertainment" },
  { name: "Cooking", category: "Hobby" },
  { name: "Skating", category: "Sport" },
  { name: "Dance", category: "Hobby" }
];

function InterestSelectionScreen() {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const { user } = useAuthentication();

  const handlePress = async (text) => {
    await writeToTable(text);
    setPopupTrigger(true);
  };

  const writeToTable = async () => {
    const { data: existingData, error: fetchError } = await supabase
      .from('profiles')
      .select('interests')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching existing data:', fetchError);
    } else {
      const { data: upsertedData, error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          interests: selectedInterests
        });

      if (upsertError) {
        console.error('Error upserting data:', upsertError);
      } else {
        console.log('Upsert successful:', upsertedData);
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  useEffect(() => {
    
  }, [user]);
  useEffect(() => {
    const updateTable = async () => {
      if (selectedInterests.length === 3) {
        console.log(selectedInterests);
        await writeToTable(selectedInterests);
      }
    };
  
    updateTable();
  }, [selectedInterests]);

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/l1oUU7G_d.jpg?maxwidth=520&shape=thumb&fidelity=high' }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Find Interests"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image
          source={{ uri: "https://i.imgur.com/tT6wWW3_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Add 3 of your current interests to connect with others!</Text>
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingTitle}>Trending Interests</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.interestsContainer}>
          {trendingInterests.map((interest) => (
            <View key={interest.name} style={styles.interestItem}>
              <View style={styles.interestTextContainer}>
                <Text style={styles.interestName}>{interest.name}</Text>
                <Text style={styles.interestCategory}>{interest.category}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  selectedInterests.includes(interest.name) && styles.selectedAddButton,
                ]}
                onPress={() => toggleInterest(interest.name)}
              >
                <Text style={styles.addButtonText}>
                  {selectedInterests.includes(interest.name) ? "Added" : "+ Add"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.continueButtonContainer}>
        <TouchableOpacity style={styles.continueButton}
          onPress={() => {
            navigation.navigate("Interests");
          }}>
          <Text style={styles.continueButtonText}>
            <Image
              source={{ uri: "https://i.imgur.com/71FOGMX_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
              style={{ width: 40, height: 30 }}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 900, 
  },
  searchBar: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  headerImage: {
    width: 380,
    height: 280,
  },
  headerText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
  },
  trendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  trendingTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  seeMore: {
    fontSize: 14,
    color: 'black',
  },
  interestsContainer: {
    width: '100%',
  },
  interestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  interestTextContainer: {
    flexDirection: 'column',
  },
  interestName: {
    fontSize: 16,
  },
  interestCategory: {
    fontSize: 12,
    color: 'grey',
  },
  addButton: {
    backgroundColor: "#0fadfe",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedAddButton: {
    backgroundColor: "#0fadfe",
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#FFFC00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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

export default InterestSelectionScreen;
