import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTab from "./UserTab";
import ConversationScreen from "../screens/ConversationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DiscoverCard from "../components/DiscoverCard";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FriendStory from "../screens/FriendStory";

const Stack = createStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserTab" component={UserTab} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FriendStory"
          component={FriendStory}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen

          name="DiscoverCard"
          component={DiscoverCard}
          options={{ headerShown: true }}
        />
        <Stack.Screen  
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false}}/>

          <Stack.Screen
          name="Settings" 
          component={SettingsScreen} 
          options={{headerShown: true}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
