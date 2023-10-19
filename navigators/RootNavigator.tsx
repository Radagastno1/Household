import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import HandleHouseholdScreen from "../screens/HandleHouseholdScreen";
import HouseholdAccountScreen from "../screens/HouseholdAccountScreen";

import ProfileAccountScreen from "../screens/ProfileAccountScreen";
import SplashScreen from "../screens/SplashScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import { useAppSelector } from "../store/store";
import TopTabNavigator from "./TopTabNavigator";

import CreateUserAccountScreen from "../screens/CreateUserAccountScreen";
import SignInScreen from "../screens/SignInScreen";
import AuthNavigator from "./AuthNavigator";
import CustomHeader from "../shared/CustomHeader";

export type RootStackParamList = {
  SplashScreen: undefined;
  Auth: typeof AuthNavigator;
  Login: undefined;
  Signup: undefined;
  HandleTask: { taskId: string };
  ShowTask: { taskId: string };
  HouseholdAccount: undefined;
  ProfileAccount: undefined;
  HandleHousehold: undefined;
  CreateProfile: { householdId: string };
  Tab: typeof TopTabNavigator;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoading } = useAppSelector((state) => state.app);

  const userSlice = useAppSelector((state) => state.userAccount.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isLoading ? "SplashScreen" : userSlice ? "Auth" : "Login"
        }
      >
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Signup" component={CreateUserAccountScreen} /> */}
        <Stack.Screen
          name="HouseholdAccount"
          component={HouseholdAccountScreen}
        />
        <Stack.Screen name="ProfileAccount" component={ProfileAccountScreen} />
        <Stack.Screen
          name="HandleHousehold"
          component={HandleHouseholdScreen}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfileScreen}
          initialParams={{ householdId: "fYHVLNiQvWEG9KNUGqBT" }}
        />
        <Stack.Screen name="HandleTask" component={CreateTaskScreen} />
        <Stack.Screen
          name="ShowTask"
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
                  (route.params as { name?: string })?.name || "Custom Header"
                }
                navigation={navigation}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// <NavigationContainer>
//   <Stack.Navigator>
//     {user ? (
//       <>
//         <Stack.Screen
//           name="HouseholdAccountScreen"
//           component={HouseholdAccountScreen}
//           options={{ title: "Välkommen" }}
//         />
//         <Stack.Screen
//           name="HouseholdTasksScreen"
//           component={HouseholdTasksScreen}
//           options={{ title: "Hushållet" }}
//         />

//         <Stack.Screen
//           name="HandleHouseholdScreen"
//           component={HandleHouseholdScreen}
//           options={{ title: "Skapa hushåll" }}
//         />
//         <Stack.Screen //fråga david hur tänka kring navigationen här med statistik och swipe
//           name="StatisticScreen"
//           component={StatisticScreen}
//           options={{ title: "Hushållet" }}
//         />
//         <Stack.Screen
//           name="TaskDetailScreen"
//           component={TaskDetailScreen}
//           options={{ title: "Detaljer" }}
//         />
//         <Stack.Screen
//           name="CreateTaskScreen"
//           component={CreateTaskScreen}
//           options={{ title: "Skapa syssla" }}
//         />
//       </>
//     ) : (
//       <>
//         <Stack.Screen
//           name="SignInScreen"
//           component={SignInScreen}
//           options={{ title: "Logga in" }}
//         />
//         <Stack.Screen
//           name="CreateUserAccountScreen"
//           component={CreateUserAccountScreen}
//           options={{ title: "Skapa konto" }}
//         />
//       </>
//     )}
//   </Stack.Navigator>
// </NavigationContainer>
