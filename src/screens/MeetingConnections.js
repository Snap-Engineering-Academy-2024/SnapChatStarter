import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const MeetingConnections = () => {
    const navigation = useNavigation();
  return (
    
    <SafeAreaView style={styles.container}>
        <ImageBackground 
      source={{ uri: 'https://i.imgur.com/JW36I7L_d.jpg?maxwidth=520&shape=thumb&fidelity=high' }} 
      style={styles.backgroundImage}
    >
        <View style={styles.buttonContainer}> 
      <TouchableOpacity
          style={styles.buttonStyle_Stats}
          onPress={() => navigation.replace("Add Current Interests!")}>
          <Text style={styles.buttonText2}>Yes</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: 750,
  },
  buttonStyle_Stats: {
    margin: 10,
    marginRight: 10,
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'white',
    
  },
  buttonText2: {
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    
    marginLeft: 121,
    marginTop: 470,
  },
});

export default MeetingConnections;
