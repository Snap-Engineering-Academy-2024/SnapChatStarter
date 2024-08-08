// import React from 'react';
// import { View, Modal, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
// import { useNavigation } from "@react-navigation/native";

// const PopupCommInfo = ({ trigger, setTrigger, children }) => {
// const navigation = useNavigation();

// //     return (
// //       <ImageBackground
// //       source={{ uri: 'https://i.imgur.com/l1oUU7G_d.jpg?maxwidth=520&shape=thumb&fidelity=high' }}
// //       style={styles.backgroundImage}
// //     >
// //     <Modal
// //       transparent={true}
// //       animationType="slide"
// //       visible={trigger}
// //       onRequestClose={() => {
// //       setTrigger(!trigger);
// //       }}
// //     >
      
// //       <View style={styles.modalBackground}>
// //         <View style={styles.popupContainer}>
// //         <View style={styles.buttonContainer}>
// //             <TouchableOpacity style={styles.button} onPress={() => setTrigger(false)}>
// //               <Text style={styles.buttonText}>Exit</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity style={styles.button2}>
// //               <Text style={styles.buttonText}>Settings</Text>
// //             </TouchableOpacity>

// //           </View>
// //           {children}
          
// //         </View>
        
// //       </View>
      
// //     </Modal>
// //     </ImageBackground>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   modalBackground: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
// //   },
// //   popupContainer: {
// //     width: '100%',
// //     height: '100%',
// //     padding: 20,
// //     backgroundColor: 'white',
// //     borderRadius: 10,
// //     alignItems: 'center',
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     // justifyContent: 'space-between',
// //     width: '100%',
// //     marginBottom: 10,
// //     marginTop: 750,
    
// //   },
// //   button: {
// //     backgroundColor: 'lightgrey',
// //     borderRadius: 200,
// //     padding: 10,
// //     flex: 1,
// //     marginHorizontal: 41,
// //     alignItems: 'center',
// //   },
// //   button2: {
// //     backgroundColor: 'lightgrey',
// //     borderRadius: 200,
// //     padding: 10,
// //     flex: 1,
// //     marginHorizontal: 41,
// //     alignItems: 'center',

// //   },
  
// //   buttonText: {
// //     color: 'black',
// //     fontSize: 14,
// //   },

// //   understandButton: {
// //     backgroundColor: 'lightgrey',
// //     borderRadius: 100,
// //     padding: 10,
// //     flex: 1,
// //     marginVertical: 335,
// //     alignItems: 'center',
// //   },
  
// //   understandText: {
// //     color: 'black',
// //     fontSize: 19,
// //     marginTop: 5,
// //   },
// // });

// // export default PopupCommInfo;

// /