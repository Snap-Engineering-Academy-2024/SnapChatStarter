import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const interests = {
  Technology: ["Programming", "Gadgets", "AI", "Blockchain"],
  Arts: ["Music", "Painting", "Dance", "Theater"],
  Sciences: ["Physics", "Chemistry", "Biology", "Astronomy"],
  Entertainment: ["Movies", "Gaming", "Travel", "Food"],
};

export default function InterestSelectionScreen() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Interests:", selectedInterests);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Interests</Text>
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    fontSize: 20,
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
    fontSize: 16,
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
});
