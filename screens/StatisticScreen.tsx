import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PiechartComponent from "../components/PiechartComponent";
import { useAppSelector } from "../store/store";
import { StatData } from "../types";
import { getCurrentWeekDates } from "../utils/DateHandler";
import { useTheme } from "../contexts/themeContext";
import {
  SummerizeEachTask,
  summarizeDataByColor,
} from "../utils/statisticHandler";
import { useFocusEffect } from "@react-navigation/native";

interface StatDatesProps {
  startDate: string;
  endDate: string;
}

function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

export default function StatisticScreen() {
  const { startOfCurrentWeek, endOfCurrentWeek } = getCurrentWeekDates();
  const tasks = useAppSelector((state) => state.task.tasks);
  const profiles = useAppSelector((state) => state.profile.profiles);
  const completions = useAppSelector(
    (state) => state.taskCompletion.completions,
  );
  const [statsForTasks, setStatsForTasks] = useState<StatData[]>([]);
  const [totalSumColors, setTotalSumColors] = useState<string[]>([]);
  const [totalSumSeries, setTotalSumSeries] = useState<number[]>([]);

  const handleFocusEffect = useCallback(() => {
    console.log("USE-EFFECT STATS: ", completions);
    console.log("USE-EFFECT STATS HUR MÅNGA: ", completions.length);
    const summarizedData = SummerizeEachTask(
      completions,
      tasks,
      profiles,
      startOfCurrentWeek,
      endOfCurrentWeek,
    );
    setStatsForTasks(summarizedData);
    const data = summarizeDataByColor(summarizedData);
    setTotalSumColors(data.colors);
    setTotalSumSeries(data.series);
    console.log("DATA.SERIES: ", totalSumSeries);
    console.log("DATA.COLORS: ", totalSumColors);
    console.log("Nu renderas datan från statisticScreen: ", statsForTasks);
  }, [completions, tasks, profiles, startOfCurrentWeek, endOfCurrentWeek]);

  useFocusEffect(handleFocusEffect);

  const chunkedCharts = arrayChunk(statsForTasks, 3);
  const { theme } = useTheme();

  const slices = [20, 15, 20];
  const colors = ["red", "yellow", "blue"];
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={styles.container}>
        {totalSumColors.length > 0 && totalSumSeries.length > 0 ? ( // Kontrollera om totalSumColors har data
          <View style={styles.topChart}>
            <PiechartComponent
              widthAndHeight={250}
              series={totalSumSeries}
              sliceColor={totalSumColors}
            />
          </View>
        ) : (
          <View style={styles.topChart}>
            <PiechartComponent
              widthAndHeight={250}
              series={[100]}
              sliceColor={["gray"]}
            />
          </View>
        )}

        <View style={styles.chartContainer}>
          {chunkedCharts.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((chart, columnIndex) => (
                <View style={styles.piechartContainer} key={columnIndex}>
                  <Text style={styles.taskTitle}>{chart.title}</Text>
                  {chart.colors.length > 0 && chart.series.length > 0 ? (
                    <PiechartComponent
                      widthAndHeight={100}
                      series={chart.series}
                      sliceColor={chart.colors}
                    />
                  ) : (
                    <PiechartComponent
                      widthAndHeight={100}
                      series={[100]}
                      sliceColor={["gray"]}
                    />
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
