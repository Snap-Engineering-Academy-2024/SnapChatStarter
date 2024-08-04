import React from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions,SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StoryModal = ({ showStory, setShowStory, selectedCompany }) => {
  return (
    <Modal
      visible={showStory}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowStory(false)}
    >
      <View style={styles.centeredView}>
        <SafeAreaView style={styles.modalView}>
          <Text style={styles.title}>{selectedCompany.username}</Text>
          <TouchableOpacity
            onPress={() => setShowStory(false)}
          >
           <View style={styles.imageContainer}>
              {selectedCompany.header_url && (
                <Image
                  source={{ uri: selectedCompany.poster_url }}
                  style={styles.companyPhoto}
                />
              )}
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: "100%",
    width: "100%",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    color: "white",
    alignSelf: "flex-start"
  },
  companyPhoto: {
    width: SCREEN_WIDTH / 1,
    height: SCREEN_HEIGHT / 1.5,
    borderRadius: 10,
    marginTop: 16,
  },
  imageContainer: {
    flex: 1, // Ensure the container takes up full height
    justifyContent: 'center', // Center the image vertically
    alignItems: 'center', // Center the image horizontally
  },
});

export default StoryModal;
