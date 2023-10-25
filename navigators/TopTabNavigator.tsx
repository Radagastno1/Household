import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import StatisticScreen from "../screens/StatisticScreen";
import CustomTabBar from "../store/shared/CustomTabBar";
import TESTDATUMSCREEN from "../screens/TESTDATUMSCREEN";
import {
  getCurrentDate,
  getCurrentWeekDates,
  getLastMonthDates,
  getLastWeekDates,
} from "../utils/DateHandler";
import STAT2 from "../screens/STAT2";
import STAT3 from "../screens/STAT3";

export type TopTabParamList = {
  HouseholdTasks: undefined;
  DennaVeckan: undefined;
  FörraVeckan: { startDate: string; endDate: string };
  FÖRRAMÅNADEN: { startDate: string; endDate: string };
  TestaDatum: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const { startOfCurrentWeek, endOfCurrentWeek } = getCurrentWeekDates();
const { startOfLastWeek, endOfLastWeek } = getLastWeekDates();
const { startOfLastMonth, endOfLastMonth } = getLastMonthDates();

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
      <TopTab.Screen
        name={"FörraVeckan"}
        component={STAT2}
        initialParams={{ startDate: startOfLastWeek, endDate: endOfLastWeek }}
      />
      <TopTab.Screen
        name={"FÖRRAMÅNADEN"}
        component={STAT3}
        initialParams={{ startDate: startOfLastMonth, endDate: endOfLastMonth }}
      />
      <TopTab.Screen name={"TestaDatum"} component={TESTDATUMSCREEN} />
    </TopTab.Navigator>
  );
}
