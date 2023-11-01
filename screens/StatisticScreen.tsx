import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PiechartComponent from "../components/PiechartComponent";
import { useTheme } from "../contexts/themeContext";
import { AvatarUrls, Avatars, getAvatarColorString } from "../data/avatars";
import {
  emptyPieChartsData,
  emptySumPieChartColors,
  emptySumPieChartSeries,
} from "../data/emptyPieCharts";
import { TopTabScreenProps } from "../navigators/navigationTypes";
import { useAppSelector } from "../store/store";
import { StatData } from "../types";
import {
  SummerizeEachTask,
  summarizeDataByColor,
} from "../utils/statisticHandler";

type StatProps =
  | TopTabScreenProps<"StatisticsCurrentWeek">
  | TopTabScreenProps<"StatisticsLastWeek">
  | TopTabScreenProps<"LastMonth">;

function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

export default function StatisticScreen({ route }: StatProps) {
  const { theme } = useTheme();
  const startDate = route.params.startDate;
  const endDate = route.params.endDate;
  const tasks = useAppSelector((state) => state.task.tasks);
  const profiles = useAppSelector((state) => state.profile.profiles);
  const completions = useAppSelector(
    (state) => state.taskCompletion.completions,
  );
  const greyDataSumSeries = emptySumPieChartSeries;
  const greyDataSumColors = emptySumPieChartColors;
  const greyDataSum = emptyPieChartsData;
  const profileSlice = useAppSelector((state) => state.profile.profiles);
  const [statsForTasks, setStatsForTasks] = useState<StatData[]>([]);
  const [totalSumColors, setTotalSumColors] = useState<string[]>([]);
  const [totalSumSeries, setTotalSumSeries] = useState<number[]>([]);
  const [isData, setIsData] = useState<StatData[]>([]);

  const handleFocusEffect = useCallback(() => {
    console.log("USE-EFFECT STATS: ", completions);
    console.log("USE-EFFECT STATS HUR MÅNGA: ", completions.length);
    const summarizedData = SummerizeEachTask(
      completions,
      tasks,
      profiles,
      startDate,
      endDate,
    );
    setStatsForTasks(summarizedData);
    console.log("SUMMARIZEDDATA: ", summarizedData);

    if (summarizedData.length === 0) {
      setIsData(greyDataSum);
    } else {
      setIsData(statsForTasks);
    }

    const data = summarizeDataByColor(summarizedData);
    setTotalSumColors(data.colors);
    setTotalSumSeries(data.series);
    console.log("DATA.SERIES: ", totalSumSeries);
    console.log("DATA.COLORS: ", totalSumColors);
    console.log("Nu renderas datan från statisticScreen: ", statsForTasks);
  }, [completions, tasks, profiles, startDate, endDate]);

  useFocusEffect(handleFocusEffect);
  const chunkedCharts = arrayChunk(isData, 3);

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
              series={greyDataSumSeries}
              sliceColor={greyDataSumColors}
            />
          </View>
        )}

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {profileSlice.map((profile) => (
            <View
              key={profile.id}
              style={[
                {
                  borderColor: getAvatarColorString(profile.avatar),
                  borderWidth: 5,
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 5,
                },
              ]}
            >
              <Image
                source={{ uri: AvatarUrls[profile.avatar as Avatars] }}
                style={{ height: 30, width: 30 }}
              />
            </View>
          ))}
        </View>

        <View style={styles.chartContainer}>
          {chunkedCharts.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((chart, columnIndex) => (
                <View style={styles.piechartContainer} key={columnIndex}>
                  <Text style={theme.taskTitle as any} numberOfLines={2}>
                    {chart.title}
                  </Text>
                  {chart.colors.length > 0 && chart.series.length > 0 && (
                    <PiechartComponent
                      widthAndHeight={100}
                      series={chart.series}
                      sliceColor={chart.colors}
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
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  piechartContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  topChart: {
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "column",
  },
});
