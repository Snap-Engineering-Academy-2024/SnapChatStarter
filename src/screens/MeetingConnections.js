import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';

const App = () => {
  return (
    
    <SafeAreaView style={styles.container}>
        <ImageBackground 
      source={{ uri: 'https://i.imgur.com/JW36I7L_d.jpg?maxwidth=520&shape=thumb&fidelity=high' }} 
      style={styles.backgroundImage}
    >
      {/* <View>
        <Text style={styles.text}>Hello, World!</Text>
      </View> */}
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
});

export default App;
