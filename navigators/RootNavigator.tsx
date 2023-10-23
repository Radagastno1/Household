import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { useAppSelector } from "../store/store";
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

  const userSlice = useAppSelector((state) => state.userAccount.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isLoading ? "SplashScreen" : userSlice ? "Login" : "Login"
        }
      >
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}

        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{ presentation: "fullScreenModal" }}
        />

        <Stack.Screen name="Signup" component={CreateUserAccountScreen} />
        <Stack.Screen
          name="HouseholdAccount"
          component={HouseholdAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProfileAccount" component={ProfileAccountScreen} />
        <Stack.Screen
          name="HandleHousehold"
          component={HandleHouseholdScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfileScreen}
          initialParams={{ householdId: "fYHVLNiQvWEG9KNUGqBT" }}
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
