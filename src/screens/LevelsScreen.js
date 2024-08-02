import { SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TopicsScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView>
            <Button
            onPress={() => {
            navigation.navigate("Game");
            }}
            title="Game"
            accessibilityLabel="Navigate to Game page"
            />
        </SafeAreaView>
    );
}