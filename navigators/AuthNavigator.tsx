import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import CreateUserAccountScreen from "../screens/CreateUserAccountScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="Signup" component={CreateUserAccountScreen} />
    </Stack.Navigator>
  );
}
