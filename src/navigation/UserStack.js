import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTab from "./UserTab";
import ConversationScreen from "../screens/ConversationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import DiscoverCard from "../components/DiscoverCard";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FriendStory from "../screens/FriendStory";
import AstrologyScreen from "../screens/AstrologyScreen";
import MemoryScreen from "../screens/MemoryScreen";
import EventScreen from "../screens/EventScreen"; //New component by Sona and Christian
import WelcomeScreen from "../screens/WelcomeScreen";
import TopicsScreen from "../screens/TopicsScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import LevelsScreen from "../screens/LevelsScreen";
import GameScreen from "../screens/GameScreen";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserTab" component={UserTab} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={styles.cleanHeader}
        />
        <Stack.Screen
          name="FriendStory"
          component={FriendStory}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AddFriend"
          component={AddFriendScreen}
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
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MemoryScreen"
          component={MemoryScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Astrology"
          component={AstrologyScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={styles.cleanHeader}
        />
        <Stack.Screen
          name="Topics"
          component={TopicsScreen}
          options={styles.cleanHeader}
        />
        <Stack.Screen
          name="Resources"
          component={ResourcesScreen}
          options={styles.cleanHeader}
        />
        <Stack.Screen
          name="Levels"
          component={LevelsScreen}
          options={styles.cleanHeader}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={styles.cleanHeader}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cleanHeader: {
    headerShown: true,
    headerTransparent: true,
    headerTitle: "",
    headerBackTitle: "",
    headerTintColor: "white",
  },
})
