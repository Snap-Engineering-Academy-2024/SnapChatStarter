import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTab from "./UserTab";
import ConversationScreen from "../screens/ConversationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DiscoverCard from "../components/DiscoverCard";
import SearchScreen from "../screens/SearchScreen";
import MemoryScreen from "../screens/MemoryScreen";
import CommunityScreen from "../screens/CommunityScreen";
import MapScreen from '../screens/MapScreen';
import LocationList from '../screens/LocationList';

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
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Community"
          component={CommunityScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MemoryScreen"
          component={MemoryScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LocationList" component={LocationList} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
