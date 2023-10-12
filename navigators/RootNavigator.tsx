import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import CreateUserAccountScreen from "../screens/CreateUserAccountScreen";
import HandleHouseholdScreen from "../screens/HandleHouseholdScreen";
import HouseholdAccountScreen from "../screens/HouseholdAccountScreen";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignInScreen from "../screens/SignInScreen";
import StatisticScreen from "../screens/StatisticScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";

export type RootStackParamList = {
  SignInScreen: undefined;
  CreateUserAccountScreen: undefined;
  HouseholdAccountScreen: undefined;
  HandleHouseholdScreen: undefined;
  HouseholdTasksScreen: undefined;
  TaskDetailScreen: undefined;
  CreateTaskScreen: undefined;
  StatisticScreen: undefined;
  SettingsScreen: undefined;
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
            <Stack.Screen
              name="HouseholdAccountScreen"
              component={HouseholdAccountScreen}
              options={{ title: "Välkommen" }}
            />
            <Stack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{ title: "Inställningar" }}
            />
            <Stack.Screen
              name="HouseholdTasksScreen"
              component={HouseholdTasksScreen}
              options={{ title: "Hushållet" }}
            />

            <Stack.Screen
              name="HandleHouseholdScreen"
              component={HandleHouseholdScreen}
              options={{ title: "Skapa hushåll" }}
            />
            <Stack.Screen //fråga david hur tänka kring navigationen här med statistik och swipe
              name="StatisticScreen"
              component={StatisticScreen}
              options={{ title: "Hushållet" }}
            />
            <Stack.Screen
              name="TaskDetailScreen"
              component={TaskDetailScreen}
              options={{ title: "Detaljer" }}
            />
            <Stack.Screen
              name="CreateTaskScreen"
              component={CreateTaskScreen}
              options={{ title: "Skapa syssla" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ title: "Logga in" }}
            />
            <Stack.Screen
              name="CreateUserAccountScreen"
              component={CreateUserAccountScreen}
              options={{ title: "Skapa konto" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
