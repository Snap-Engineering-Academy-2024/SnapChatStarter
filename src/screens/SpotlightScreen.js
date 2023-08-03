import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

export default function SpotlightScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Text>SpotlightScreen</Text>
      <View style={{ flex: 0 }}>
        <Button title="Show modal" onPress={toggleModal} />

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 0 }}>
            <Text>This is a test of a Modal</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    </View>
  );
}
