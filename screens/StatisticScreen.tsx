import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import React from "react";
import PiechartComponent from "../components/PiechartComponent";

function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

export default function StatisticScreen() {
  const chunkedCharts = arrayChunk(exemples, 3);
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
                <Text style={styles.taskTitle}>{chart.name}</Text>
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
