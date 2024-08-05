import { SafeAreaView, ImageBackground, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';

export default function TopicsScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.backgroundWrapper}>
                    <ImageBackground 
                        style={styles.backgroundImage} 
                        source={require("../../assets/levels-background.png")}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        <Text style={styles.levelsHeading}>
                            Coding Map
                        </Text>
                        <View style={styles.startButtonWrapper}>
                            <Button
                                style={styles.colorButtonContainer}
                                icon={
                                    <Image 
                                        style={styles.startButtonIcon} 
                                        source={require("../../assets/snapchat-ghost.png")}
                                    />
                                }
                                buttonStyle={styles.colorButton}
                                onPress={() => navigation.navigate("Game")}
                                accessibilityLabel="Navigate to Game screen"
                            />
                        </View>
                        <View style={styles.secondButtonWrapper}>
                            <Button
                                style={styles.grayButtonContainer}
                                icon={styles.lockedButtonIcon}
                                buttonStyle={styles.grayButton}
                            />
                        </View>
                        <View style={styles.halfwayButtonWrapper}>
                            <Button
                                style={styles.grayButtonContainer}
                                icon={styles.lockedButtonIcon}
                                buttonStyle={styles.grayButton}
                            />
                        </View>
                        <View style={styles.fourthButtonWrapper}>
                            <Button
                                style={styles.grayButtonContainer}
                                icon={styles.lockedButtonIcon}
                                buttonStyle={styles.grayButton}
                            />
                        </View>
                        <View style={styles.endButtonWrapper}>
                            <Button
                                style={styles.grayButtonContainer}
                                icon={styles.endButtonIcon}
                                buttonStyle={styles.grayButton}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        backgroundColor: 'rgba(21, 23, 22, 1)',
    },
    backgroundWrapper: {
        width: '80%', 
        height: 'auto', 
        alignItems: 'center',
        borderRadius: 10,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    levelsHeading: {
        marginTop: 45,
        fontFamily: "Avenir Next",
        fontSize: 50,
        fontWeight: "300",
        color: "white",
        marginBottom: 50,
    },
    colorButtonContainer: {
        borderWidth: 4,
        borderRadius: 50,
        borderColor: "#FFFFFF",
    },
    startButtonIcon: {
        height: 50,
        width: 50,
    },
    colorButton: {
        backgroundColor: "#FEC608", 
        borderRadius: 50,
    },
        startButtonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 50,
        marginBottom: 45,
    },
    secondButtonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 100,
        marginBottom: 55,
    },
    halfwayButtonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 100,
        marginBottom: 50,
    },
    fourthButtonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 85,
        marginBottom: 50,
    },
    endButtonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 50,
    },
    grayButtonContainer: {
        borderWidth: 4,
        borderRadius: 50,
        borderColor: "#FFFFFF",
    },
    lockedButtonIcon: {
        name: "lock", 
        type: "font-awesome",
        height: 25,
        color: "rgba(175, 175, 175, 1)",
        margin: 10,
    },
    grayButton: {
        backgroundColor: "rgba(229, 229, 229, 1)", 
        borderRadius: 50,
    },
    endButtonIcon: {
        name: "trophy", 
        type: "font-awesome",
        height: 25,
        width: 25,
        color: "rgba(175, 175, 175, 1)",
        marginVertical: 10,
        marginHorizontal: 5,
    },
});
