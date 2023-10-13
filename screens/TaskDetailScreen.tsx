import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function TaskDetailScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Här visas en task!</Text>
      <Button title="Klar" onPress={() => navigation.navigate("Tab")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
