import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CircleProps {
  number: number;
  color: string;
}

export default function CircleComponent({ number, color }: CircleProps) {
  return (
    <View style={[styles.circle, { backgroundColor: color }]}>
      <Text style={styles.number}>{number}</Text>
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
    fontSize: 24,
    color: "black",
  },
});
