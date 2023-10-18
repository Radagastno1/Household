import { View } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";

type Props = {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
};

export default function PiechartComponent(props: Props) {
  return (
    <View>
      <PieChart
        widthAndHeight={props.widthAndHeight}
        series={props.series}
        sliceColor={props.sliceColor}
      />
    </View>
  );
}
