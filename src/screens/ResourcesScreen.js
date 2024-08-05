import { SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResourcesScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView>
            <Text>Resources here</Text>
        </SafeAreaView>
    );
}