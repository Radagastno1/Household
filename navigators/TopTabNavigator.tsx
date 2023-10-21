import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import StatisticScreen from "../screens/StatisticScreen";
import CustomTabBar from "../store/shared/CustomTabBar";
import TESTDATUMSCREEN from "../screens/TESTDATUMSCREEN";

export type TopTabParamList = {
  HouseholdTasks: undefined;
  DennaVeckan: undefined;
  TestaDatum: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const currentDate = new Date();
// denna och alla andra övriga uträkningar över veckor och månader behöver vara i sin egna fil!!!
const currentMonth = (currentDate.getMonth() + 1).toString();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator tabBar={CustomTabBar}>
      <TopTab.Screen
        name="HouseholdTasks"
        component={HouseholdTasksScreen}
        options={({ route }) => ({
          title: (route.params as unknown as { name?: string })?.name || "Idag",
        })}
      />
      <TopTab.Screen name="DennaVeckan" component={StatisticScreen} />
      <TopTab.Screen name={"TestaDatum"} component={TESTDATUMSCREEN} />
    </TopTab.Navigator>
  );
}
