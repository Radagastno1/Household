import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../api/config";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import CreateUserAccountScreen from "../screens/CreateUserAccountScreen";
import HandleHouseholdScreen from "../screens/HandleHouseholdScreen";
import HouseholdAccountScreen from "../screens/HouseholdAccountScreen";
import ProfileAccountScreen from "../screens/ProfileAccountScreen";
import SignInScreen from "../screens/SignInScreen";
import SplashScreen from "../screens/SplashScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import CustomHeader from "../store/shared/CustomHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setActiveUser } from "../store/user/userSlice";
import { User } from "../types";
import TopTabNavigator from "./TopTabNavigator";

export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Signup: undefined;
  HandleTask: { taskId: string };
  TaskDetail: { taskId: string };
  HouseholdAccount: undefined;
  ProfileAccount: { householdId: string };
  HandleHousehold: undefined;
  CreateProfile: { householdId: string; isOwner: boolean };
  Tab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [isUserFetched, setUserFetched] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (response) => {
      if (response) {
        const fetchedUser: User = {
          uid: response.uid,
          email: response.email,
        };
        console.log("USER IS LOGGED IN", fetchedUser);
        dispatch(setActiveUser(fetchedUser));
      } else {
        dispatch(setActiveUser(undefined));
        console.log("USER IS SIGNED OUT");
      }
      setUserFetched(true);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isUserFetched ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : user ? (
          <>
            <Stack.Screen
              name="HouseholdAccount"
              component={HouseholdAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileAccount"
              options={{ headerShown: false }}
              component={ProfileAccountScreen}
            />
            <Stack.Screen
              name="HandleHousehold"
              options={{ headerShown: false }}
              component={HandleHouseholdScreen}
            />
            <Stack.Screen
              name="CreateProfile"
              options={{ headerShown: false }}
              component={CreateProfileScreen}
            />
            <Stack.Screen name="HandleTask" component={CreateTaskScreen} />
            <Stack.Screen
              name="TaskDetail"
              options={{ headerShown: false }}
              component={TaskDetailScreen}
            />
            <Stack.Screen
              name="Tab"
              component={TopTabNavigator}
              options={({ route, navigation }) => ({
                header: () => (
                  <CustomHeader
                    title={
                      (route.params as unknown as { name?: string })?.name ||
                      "Custom Header"
                    }
                    navigation={navigation}
                  />
                ),
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              options={{ headerShown: false }}
              component={CreateUserAccountScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
