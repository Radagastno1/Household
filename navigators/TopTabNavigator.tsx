import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import StatisticScreen from "../screens/StatisticScreen";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <TopTab.Screen name="TodaysTasks" component={HouseholdTasksScreen} />
      <TopTab.Screen name="Stat1" component={StatisticScreen} />
    </TopTab.Navigator>
  );
}
