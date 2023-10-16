import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import StatisticScreen from "../screens/StatisticScreen";
import CustomTabBar from "../shared/CustomTabBar";

const TopTab = createMaterialTopTabNavigator();

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
      <TopTab.Screen name="Stat1" component={StatisticScreen} />
    </TopTab.Navigator>
  );
}
