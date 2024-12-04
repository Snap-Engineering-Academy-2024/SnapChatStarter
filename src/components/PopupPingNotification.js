import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


function Popup({ trigger, setTrigger, children }) {
  if (!trigger) return null; // Early return if trigger is false

  return (
    <View style={styles.popup}>
      <View style={styles.popupInner}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setTrigger(false)}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupInner: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  closeText: {
    color: 'red',
    fontSize: 16,
  },
});

export default Popup;
