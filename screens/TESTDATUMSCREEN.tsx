import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../store/store";
import {
  getCurrentDate,
  getCurrentMonthDates,
  getCurrentWeekDates,
  getLastMonthDates,
  getLastWeekDates,
} from "../utils/DateHandler";

export default function TESTDATUMSCREEN() {
  const tasks = useAppSelector((state) => state.task.tasks);
  const profiles = useAppSelector((state) => state.profile.profiles);
  const completions = useAppSelector(
    (state) => state.taskCompletion.completions,
  );
  // --------------- DAGENS DATUM  ----------------
  const { todaysDate } = getCurrentDate();
  // --------------- DENNA VECKAN ----------------
  const { startOfCurrentWeek, endOfCurrentWeek } = getCurrentWeekDates();

  // --------------- FÖRRA VECKAN ----------------
  const { startOfLastWeek, endOfLastWeek } = getLastWeekDates();

  // --------------- DENNA MÅNADEN ----------------
  const { startOfCurrentMonth, endOfCurrentMonth } = getCurrentMonthDates();

  // --------------- FÖRRA MÅNADEN ----------------
  const { startOfLastMonth, endOfLastMonth } = getLastMonthDates();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dates}>
        <Text style={styles.title}>DENNA VECKAN</Text>
        <Text>{startOfCurrentWeek}</Text>
        <Text>{endOfCurrentWeek}</Text>
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>FÖRRA VECKAN</Text>
        <Text>{startOfLastWeek}</Text>
        <Text>{endOfLastWeek}</Text>
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>DENNA MÅNADEN</Text>
        <Text>{startOfCurrentMonth}</Text>
        <Text>{endOfCurrentMonth}</Text>
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>FÖRRA MÅNADEN</Text>
        <Text>{startOfLastMonth}</Text>
        <Text>{endOfLastMonth}</Text>
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>
          DAGENS DATUM OCH FÖRRA MÅNADENS STARTDATUM
        </Text>
        <Text>{todaysDate}</Text>
        <Text>{startOfLastMonth}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  dates: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    backgroundColor: "lightgray",
    margin: 10,
    padding: 10,
  },
  title: {
    textAlign: "center",
    padding: 2,
    fontSize: 18,
  },
});
