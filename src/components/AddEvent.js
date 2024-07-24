import React from 'react';
import { Dialog, Button, Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const CustomDialog = ({ isVisible, onClose }) => {
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
  );
};

const styles = StyleSheet.create({
  // Define your styles here
});

export default CustomDialog;