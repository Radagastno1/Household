import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import PiechartComponent from "../components/PiechartComponent";

function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

const exemples = [
  {
    name: "Laga maten",
    series: [20, 20, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Diska",
    series: [20, 10, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Dammsuga",
    series: [10, 20, 5],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Laga maten",
    series: [20, 20, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Diska",
    series: [20, 10, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Dammsuga",
    series: [10, 20, 5],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Laga maten",
    series: [20, 20, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Diska",
    series: [20, 10, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Dammsuga",
    series: [10, 20, 5],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Laga maten",
    series: [20, 20, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Diska",
    series: [20, 10, 20],
    colors: ["red", "yellow", "blue"],
  },
  {
    name: "Dammsuga",
    series: [10, 20, 5],
    colors: ["red", "yellow", "blue"],
  },
];

export default function StatisticScreen() {
  const chunkedCharts = arrayChunk(exemples, 3);
  const slices = [20, 15, 20];
  const colors = ["red", "yellow", "blue"];
  return (
    <View style={styles.container}>
      <PiechartComponent
        widthAndHeight={250}
        series={slices}
        sliceColor={colors}
      />
      <FlatList
        alwaysBounceVertical={false}
        data={chunkedCharts}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map((chart) => (
              <View style={styles.piechartContainer}>
                <Text style={styles.taskTitle}>{chart.name}</Text>
                <PiechartComponent
                  widthAndHeight={100}
                  series={chart.series}
                  sliceColor={chart.colors}
                />
              </View>
            ))}
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  piechart: {
    justifyContent: "center",
    backgroundColor: "gray",
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
});
