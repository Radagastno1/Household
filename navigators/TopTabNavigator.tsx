import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdTasksScreen from "../screens/HouseholdTasksScreen";
import StatisticScreen from "../screens/StatisticScreen";
import CustomTabBar from "../store/shared/CustomTabBar";
import {
  getCurrentWeekDates,
  getLastMonthDates,
  getLastWeekDates,
} from "../utils/DateHandler";
import { useAppSelector } from "../store/store";
import { sortTaskCompletionsByDate } from "../utils/statisticHandler";

export type TopTabParamList = {
  HouseholdTasks: undefined;
  DennaVeckan: undefined;
  StatisticsCurrentWeek: { startDate: string; endDate: string };
  StatisticsLastWeek: { startDate: string; endDate: string };
  LastMonth: { startDate: string; endDate: string };
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const { startOfCurrentWeek, endOfCurrentWeek } = getCurrentWeekDates();
const { startOfLastWeek, endOfLastWeek } = getLastWeekDates();
const { startOfLastMonth, endOfLastMonth } = getLastMonthDates();

export default function TopTabNavigator() {
  const completions = useAppSelector(
    (state) => state.taskCompletion.completions,
  );

  const lastWeek = sortTaskCompletionsByDate(
    startOfLastWeek,
    endOfLastWeek,
    completions,
  );

  const lastMonth = sortTaskCompletionsByDate(
    startOfLastMonth,
    endOfLastMonth,
    completions,
  );
  console.log("LAST MONTH: ", lastMonth);

  useEffect(() => {
    if (lastWeek) {
      console.log("LAST WEEK: ", lastWeek);
    }
  }, [completions, startOfCurrentWeek, startOfLastWeek, startOfLastMonth]);
  return (
    <TopTab.Navigator tabBar={CustomTabBar}>
      <TopTab.Screen
        name="HouseholdTasks"
        component={HouseholdTasksScreen}
        options={() => ({
          tabBarLabel: "Idag",
        })}
        // options={({ route }) => ({
        //   title: (route.params as unknown as { name?: string })?.name || "Idag",
        // })}
      />
      <TopTab.Screen
        name="StatisticsCurrentWeek"
        component={StatisticScreen}
        initialParams={{
          startDate: startOfCurrentWeek,
          endDate: endOfCurrentWeek,
        }}
        options={() => ({
          tabBarLabel: "Denna Vecka",
        })}
      />
      {lastWeek.length > 0 && (
        <TopTab.Screen
          name={"StatisticsLastWeek"}
          component={StatisticScreen}
          initialParams={{
            startDate: startOfLastWeek,
            endDate: endOfLastWeek,
          }}
          options={() => ({
            tabBarLabel: "Förra Vecka",
          })}
        />
      )}
      {lastMonth.length > 0 && (
        <TopTab.Screen
          name={"LastMonth"}
          component={StatisticScreen}
          initialParams={{
            startDate: startOfLastMonth,
            endDate: endOfLastMonth,
          }}
          options={() => ({
            tabBarLabel: "Förra månaden",
          })}
        />
      )}
    </TopTab.Navigator>
  );
}
