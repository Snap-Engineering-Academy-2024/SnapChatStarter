import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image , TextInput} from "react-native";
import PopupLocationNotification from "../components/PopupLocationNotification";
import { useNavigation } from "@react-navigation/native";


const interests = {
  SelectedInterests:[],
  Technology: ["Programming", "Gadgets", "AI", "Blockchain"],
  Arts: ["Music", "Painting", "Dance", "Theater"],
  Sciences: ["Physics", "Chemistry", "Biology", "Astronomy"],
  Entertainment: ["Movies", "Gaming", "Travel", "Food"],
};

export default function InterestSelectionScreen() {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");



  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // const handleSubmit = () => {
  //   console.log("Selected Interests:", selectedInterests);
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
  <PopupLocationNotification trigger={popupTrigger} setTrigger={setPopupTrigger}>
     <Text style={{fontSize: 40, marginTop: 20 }}>Community Ping</Text>
     <Text style={{fontSize: 20, marginTop: 20 }}>Warning: Location Privacy</Text>
     <Image
      source={{ uri: "https://i.imgur.com/wWeONMN_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
      style={{ width: 300, height: 500, borderRadius: 15}}
    />
    <TouchableOpacity style={styles.understandButton} onPress={() => {navigation.navigate("Profile"); }}>
          <Text style={styles.understandText}>I Understand</Text>
        </TouchableOpacity>
  </PopupLocationNotification>

  <TextInput
    style={styles.searchBar}
    placeholder="Search Interests"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />

  <Text style={styles.title}>Select Your Top 3 Interests</Text>
  {Object.keys(interests).map((category) => (
    <View key={category} style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.interestsContainer}>
        {interests[category].map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest) && styles.selectedInterestButton,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text
              style={[
                styles.interestText,
                selectedInterests.includes(interest) && styles.selectedInterestText,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ))}
  <TouchableOpacity style={styles.submitButton} onPress={() => {setPopupTrigger(true); }}>
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
</ScrollView>

      <PopupLocationNotification trigger={popupTrigger} setTrigger={setPopupTrigger}>
         <Text style={{fontSize: 40, marginTop: 20 }}>Community Ping</Text>
         <Text style={{fontSize: 20, marginTop: 20 }}>Warning: Location Privacy</Text>
         <Image
          source={{ uri: "https://i.imgur.com/wWeONMN_d.jpg?maxwidth=520&shape=thumb&fidelity=high" }}
          style={{ width: 300, height: 500, borderRadius: 15}}
        />
        <TouchableOpacity style={styles.understandButton} onPress={() => {navigation.navigate("Profile"); }}>
              <Text style={styles.understandText}>I Understand</Text>
            </TouchableOpacity>

      </PopupLocationNotification>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryContainer: {
    width: '100%',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  interestButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  selectedInterestButton: {
    backgroundColor: "#FFFC00",
  },
  interestText: {
    fontSize: 14,
    color: "black",
  },
  selectedInterestText: {
    fontWeight: "bold",
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
  understandButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 100,
    padding: 10,
    flex: 1,
    marginVertical: 35,
    alignItems: 'center',
  },
  understandText: {
    color: 'black',
    fontSize: 19,
  },
});
