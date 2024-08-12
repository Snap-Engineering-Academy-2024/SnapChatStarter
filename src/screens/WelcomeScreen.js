import { Text, StyleSheet, ImageBackground, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useFonts } from "expo-font";
import React from "react";

export default function WelcomeScreen() {
    const navigation = useNavigation();
    getFont();
    async function getFont() {
        const [loaded] = await useFonts({
            'PressStart2P-Regular': require('../../assets/fonts/PressStart2P-Regular.ttf'),
        });
    }

    return (
        <ImageBackground style={styles.backgroundImage} source={require("../../assets/welcome-background.png")}>
            <Text style={styles.heading}>Welcome to</Text>
            <Text style={styles.text1}>Brain</Text>
            <Text style={styles.text2}>Bites!</Text>
            <Text style={styles.subheading}>Take a bite anywhere, anytime</Text>
            <Button 
                title="Learn more" 
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate("Game")}
                accessibilityLabel="Navigate to Topics screen"
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        color: "#FFFFFF",
        fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
        fontSize: 30,
        fontWeight: "700",
        marginTop: Platform.OS === "ios" ? 260 : 210,                                                  
        marginRight: Platform.OS === "ios" ? 220 : 210,
    },
    text1: {
        marginTop: Platform.OS === "ios" ? 5 : 20,
        fontFamily: "PressStart2P-Regular",
        fontSize: 50,
        fontWeight: "400",
        color: "gold",
        marginRight: Platform.OS === "ios" ? 140 : 120,
    },
    text2: {
        fontFamily: "PressStart2P-Regular",
        fontSize: 50,
        fontWeight: "400",
        color: "gold",
        marginLeft: Platform.OS === "ios" ? 130 : 110,
        marginBottom: Platform.OS === "ios" ? 5 : 0,
    },
    subheading: {
        color: "#FFFFFF",
        fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
        fontSize: 20,
        fontWeight: "600",
    },
    buttonContainer: {
        width: 200,
        marginTop: Platform.OS === "ios" ? 260 : 200,
    }, 
    buttonTitle: {
        fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
        fontWeight: "500",  
        color: "#FFFFFF"
    }, 
    button: {
        borderRadius: 30,
        backgroundColor: "#0FADFF",
    },
})