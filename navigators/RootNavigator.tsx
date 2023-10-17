import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import HandleHouseholdScreen from "../screens/HandleHouseholdScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import HouseholdAccountScreen from "../screens/HouseholdAccountScreen";
import AuthNavigator from "./AuthNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import { TabBar } from "react-native-tab-view";
import ProfileAccountScreen from "../screens/ProfileAccountScreen";
import TopTabNavigator from "./TopTabNavigator";
import CreateProfileScreen from "../screens/CreateProfileScreen";

//kolla om dela upp navigationen, från profileaccount ny stack?
export type RootStackParamList = {
  Auth: typeof AuthNavigator;
  HandleTask: undefined;
  ShowTask: { taskId: string };
  HouseholdAccount: undefined;
  ProfileAccount: undefined;
  HandleHousehold: undefined;
  CreateProfile: { householdId: string };
  CreateProfileScreen: undefined;
  Tab: typeof TopTabNavigator;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // const { isLoaded } = useUserContext();

  // if (!isLoaded) {
  //   return <SplashScreen />;
  // }
  const user: number = 0;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HouseholdAccount"
              component={HouseholdAccountScreen}
            />
            <Stack.Screen
              name="ProfileAccount"
              component={ProfileAccountScreen}
            />
            <Stack.Screen
              name="HandleHousehold"
              component={HandleHouseholdScreen}
            />
            <Stack.Screen
              name="CreateProfile"
              component={CreateProfileScreen}
              initialParams={{ householdId: "household1" }}
            />
            <Stack.Screen name="HandleTask" component={CreateTaskScreen} />
            <Stack.Screen name="ShowTask" component={TaskDetailScreen} />
            <Stack.Screen name="Tab" component={TopTabNavigator} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
  );
}
