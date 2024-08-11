import React from "react";
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { colors } from "../../assets/themes/colors";

const IntroSafeHavenModal = ({ isIntroModalVisible, handleContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isIntroModalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleContinue} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://i.postimg.cc/Y9qMc66r/Weclome-to-Safe-Haven.png' }}
            style={styles.image}
          />
          <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
      },
      modalContent: {
        width: '88%',
        height: 330,
        backgroundColor: 'white',
        borderRadius: 25,
        position: 'relative',
        justifyContent: 'flex-end',
      },
      image: {
        height: '85%',
        width: '95%',
        resizeMode: 'contain',
        marginLeft:15,
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        padding: 10,
        backgroundColor: colors.belowPage,
        borderRadius: 20,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
      },
      closeButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      continueButton: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        backgroundColor: '#0FADFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default IntroSafeHavenModal;
