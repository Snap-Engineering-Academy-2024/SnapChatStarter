import React from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { Dialog } from '@rneui/themed';

export default function AddEvent({ isVisible, onClose }) {

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Dialog.Title title="Dialog Title" />
      <Text>This is a dialog message.</Text>
      <Dialog.Actions>
        <Button title="CLOSE" onPress={onClose} />
      </Dialog.Actions>
    </Dialog>
  )
}


const styles = StyleSheet.create({
    userInfo:{
        backgroundColor:"red",
        height:100,
        width:100,
        position:"absolute"
    }
})
