import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";

export default function WelcomeScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView>
            <ImageBackground style={styles.backgroundImage} source={require("../../assets/welcome-background.png")}>
                <Button 
                    style={styles.buttonContainer}
                    title="Take a bite!" 
                    titleStyle={styles.title}
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate("Topics")}
                    accessibilityLabel="Navigate to Topics screen"
                />
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        width: 200,
        marginTop: 680,
    }, 
    title: {
        fontFamily: "Avenir Next",
        fontWeight: "500",  
        color: "#FFFFFF"
    }, 
    button: {
        borderRadius: 30,
        backgroundColor: "#0FADFF"
    }
})