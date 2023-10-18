import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import StatisticScreen from "../screens/StatisticScreen";
import CustomTabBar from "../shared/CustomTabBar";

const TopTab = createMaterialTopTabNavigator();
const currentDate = new Date();
// denna och alla andra övriga uträkningar över veckor och månader behöver vara i sin egna fil!!!
const currentMonth = (currentDate.getMonth() + 1).toString();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator tabBar={CustomTabBar}>
      <TopTab.Screen
        name="TodaysTasks"
        component={HouseholdTasksScreen}
        options={({ route }) => ({
          title: (route.params as { name?: string })?.name || "Idag",
        })}
      />
      <TopTab.Screen name="Denna veckan" component={StatisticScreen} />
      <TopTab.Screen name="Förra veckan" component={StatisticScreen} />
      <TopTab.Screen name={currentMonth} component={StatisticScreen} />
    </TopTab.Navigator>
  );
}
