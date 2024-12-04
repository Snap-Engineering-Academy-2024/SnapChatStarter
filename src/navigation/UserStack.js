import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTab from "./UserTab";
import ConversationScreen from "../screens/ConversationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import DiscoverCard from "../components/DiscoverCard";
import SearchScreen from "../screens/SearchScreen";
import AstrologyScreen from "../screens/AstrologyScreen";
import MemoryScreen from "../screens/MemoryScreen";
import CommSelectionScreen from "../screens/CommSelectionScreen";
import InterestFormScreen from  "../screens/InterestFormScreen";
import MeetingConnections from  "../screens/MeetingConnections";
import ChatScreen from "../screens/ChatScreen";
import CommunityChatScreen from "../screens/CommunityChatScreen";


const Stack = createStackNavigator();

export default function App() {
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemoryScreen"
          component={MemoryScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Astrology"
          component={AstrologyScreen}
          options={{ headerShown: true}}

        />
        <Stack.Screen
          name="Identity"
          component={CommSelectionScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Interests"
          component={InterestFormScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Meeting Connections"
          component={MeetingConnections}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CommunityChat"
          component={CommunityChatScreen}
          options={{ headerShown: true }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}