import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HouseholdAccountScreen from "../screens/HouseholdAccountScreen";
import ProfileAccountScreen from "../screens/ProfileAccountScreen";
import HandleHouseholdScreen from "../screens/HandleHouseholdScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import TopTabNavigator from "./TopTabNavigator";
import CustomHeader from "../shared/CustomHeader";

const Stack = createNativeStackNavigator();

  
export default function HomeStackNavigator() {
    
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HouseholdAccount"
        component={HouseholdAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileAccount"
        component={ProfileAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HandleHousehold"
        component={HandleHouseholdScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ id: "household1" }}
      />
      <Stack.Screen name="Tab" component={TopTabNavigator} 
      options={({route,navigation})=>({
        header: () => <CustomHeader title={(route.params as { name?: string })?.name || "Custom Header"} navigation={navigation.navigation}/>,
      })}
      />
        
    </Stack.Navigator>
  );
}
