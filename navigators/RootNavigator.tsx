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
import TaskDetailScreen from "../screens/TaskDetailScreen";
import CustomHeader from "../store/shared/CustomHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setActiveUser } from "../store/user/userSlice";
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
  CreateProfile: { householdId: string };
  Tab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.user.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userSlice) => {
      if (userSlice) {
        const uid = userSlice.uid;
        console.log("USER IS LOGGED IN", uid);
        dispatch(setActiveUser(uid));
        setIsLoggedIn(true);
      } else {
        // User is signed out
        console.log("USER IS SIGNED OUT");
        setIsLoggedIn(false);
        // Dispatch no user to redux
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName={
      //   // isLoading ? "SplashScreen" : userSlice ? "Login" : "HouseholdAccount"
      //   // om användaren är inloggad så visa husvyn
      //   // om användaren har vald hus, så gå in dagsvyn
      // }
      >
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="HouseholdAccount"
              component={HouseholdAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileAccount"
              component={ProfileAccountScreen}
            />
            <Stack.Screen
              name="HandleHousehold"
              options={{ headerShown: false }}
              component={HandleHouseholdScreen}
            />
            <Stack.Screen
              name="CreateProfile"
              component={CreateProfileScreen}
              // initialParams={{ householdId: "fYHVLNiQvWEG9KNUGqBT" }}
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
              options={{ presentation: "fullScreenModal" }}
            />
            <Stack.Screen name="Signup" component={CreateUserAccountScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
