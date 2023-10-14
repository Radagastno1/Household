import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CircleProps {
  number: number;
  backgroundColor: string;
  color: string;
}

export default function CircleComponent({
  number,
  backgroundColor,
  color,
}: CircleProps) {
  return (
    <View style={[styles.circle, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.number, { color: color }]}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 18,
  },
});
