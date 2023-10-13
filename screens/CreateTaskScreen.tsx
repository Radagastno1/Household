import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function CreateTaskScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Skapa ett task här!</Text>
      <Button
        title="Skapa"
        onPress={() => navigation.navigate("TodaysTasks")}
      />
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
