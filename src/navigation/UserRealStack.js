import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserStack from "./UserStack";
import TestScreen from "../screens/TestScreen";
import ConversationScreen from "../screens/ConversationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export default function() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="UserStack" component={UserStack} />
                <Stack.Screen name="Test" component={TestScreen} options={{headerShown: true}} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}/>            
            </Stack.Navigator>
        </NavigationContainer>
    )
}