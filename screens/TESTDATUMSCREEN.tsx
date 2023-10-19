import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  getStartAndEndDateOfCurrentMonth,
  getStartAndEndDateOfCurrentWeek,
  getStartAndEndDateOfLastMonth,
  getStartAndEndDateOfLastWeek,
} from "../utils/DateHandler";

export default function TESTDATUMSCREEN() {
  const [monday, setMonday] = useState("");
  // --------------- DENNA VECKAN ----------------
  let { startOfWeek, endOfWeek } = getStartAndEndDateOfCurrentWeek();
  console.log(startOfWeek);
  console.log(endOfWeek);

  // --------------- FÖRRA VECKAN ----------------
  const { lastWeekMonday, lastWeekSunday } = getStartAndEndDateOfLastWeek();

  // --------------- DENNA MÅNADEN ----------------
  const { startOfCurrentMonth, endOfCurrentMonth } =
    getStartAndEndDateOfCurrentMonth();

  // --------------- FÖRRA MÅNADEN ----------------
  const { startOfLastMonth, endOfLastMonth } = getStartAndEndDateOfLastMonth();

  function PressMe() {
    const firstDay = getStartAndEndDateOfCurrentWeek().startOfWeek;
    setMonday(firstDay);
  }
  return (
    <View style={styles.container}>
      <View style={styles.dates}>
        <Text style={styles.title}>DENNA VECKAN</Text>
        <Text>{startOfWeek.toString()}</Text>
        <Text>{endOfWeek.toString()}</Text>
        <Button title="Tryck mig!" onPress={PressMe} />
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>FÖRRA VECKAN</Text>
        <Text>{lastWeekMonday.toString()}</Text>
        <Text>{lastWeekSunday.toString()}</Text>
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>DENNA MÅNADEN</Text>
        <Text>{startOfCurrentMonth.toString()}</Text>
        <Text>{endOfCurrentMonth.toString()}</Text>
      </View>
      <View style={styles.dates}>
        <Text style={styles.title}>FÖRRA MÅNADEN</Text>
        <Text>{startOfLastMonth.toString()}</Text>
        <Text>{endOfLastMonth.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
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
