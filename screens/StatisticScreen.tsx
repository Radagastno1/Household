import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PiechartComponent from "../components/PiechartComponent";
import { useAppSelector } from "../store/store";
import { ProfileData, StatData } from "../types";
import { SummerizeEachTask } from "../utils/statisticHandler";

function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

function makeArrayOfSum(value: ProfileData[]) {
  const sumSeries: number[] = [];
  value.forEach((value) => {
    sumSeries.push(value.sum);
  });
  console.log(sumSeries);
  return sumSeries;
}

export default function StatisticScreen() {
  const tasks = useAppSelector((state) => state.task.tasks);
  const profiles = useAppSelector((state) => state.profile.profiles);
  const completions = useAppSelector(
    (state) => state.taskCompletion.completions,
  );

  const statsForTasks: StatData[] = SummerizeEachTask(
    completions,
    tasks,
    profiles,
  );

  const chunkedCharts = arrayChunk(statsForTasks, 3);
  const slices = [20, 15, 20];
  const colors = ["red", "yellow", "blue"];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topChart}>
        <PiechartComponent
          widthAndHeight={250}
          series={slices}
          sliceColor={colors}
        />
      </View>

      <View style={styles.chartContainer}>
        {chunkedCharts.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((chart, columnIndex) => (
              <View style={styles.piechartContainer} key={columnIndex}>
                <Text style={styles.taskTitle}>{chart.title}</Text>
                <PiechartComponent
                  widthAndHeight={100}
                  series={chart.series}
                  sliceColor={chart.colors}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  piechartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  taskTitle: {
    textAlign: "center",
    padding: 2,
  },
  topChart: {
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "column",
  },
});
