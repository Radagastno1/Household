import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppSelector } from "../store/store";

//här skapar man en task som ägare för hushållet
export default function CreateTaskScreen({ navigation }: any) {
  const tasks = useAppSelector((state) => state.task);
  const firstTask = tasks.tasks[0];

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>{firstTask.title}</Text>

        <TextInput
          placeholder="Titel"
          style={styles.input}
          textAlignVertical="top"
        ></TextInput>
        <TextInput
          placeholder="Beskrivning"
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
        ></TextInput>
      </View>
      <View style={styles.fillOutContainer}></View>
      <Button
        title="Skapa"
        onPress={() => navigation.navigate("TodaysTasks")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 10,
  },
  fillOutContainer: {
    flex: 1,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
});
