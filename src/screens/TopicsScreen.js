import { SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TopicsScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView>
            <Button
            onPress={() => {
            navigation.navigate("Levels");
            }}
            title="Levels"
            accessibilityLabel="Navigate to Levels page"
            />
        </SafeAreaView>
    );
}