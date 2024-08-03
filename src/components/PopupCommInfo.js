import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

const PopupCommInfo = ({ trigger, setTrigger, children }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={trigger}
      onRequestClose={() => {
        setTrigger(!trigger);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setTrigger(false)}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>

          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  popupContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    
  },
  button: {
    backgroundColor: 'lightgrey',
    borderRadius: 200,
    padding: 10,
    flex: 1,
    marginHorizontal: 41,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: 'lightgrey',
    borderRadius: 200,
    padding: 10,
    flex: 1,
    marginHorizontal: 41,
    alignItems: 'center',

  },
  
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default PopupCommInfo;
