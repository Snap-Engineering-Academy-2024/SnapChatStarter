import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import CommSelectionScreen from "../screens/CommSelectionScreen";
import InterestFormScreen from  "../screens/InterestFormScreen";



const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthHome" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AddFriend" component={AddFriendScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="CommunitySelection" component={CommSelectionScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="InterestSelection" component={InterestFormScreen} options={{ headerShown: false}}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
