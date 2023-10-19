import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function HandleHouseholdScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Här skapas ett hushåll</Text>
      <Button
        title="Skapa hushåll"
        onPress={() => navigation.navigate("CreateProfile", {id: "household9"} )}
      />
      <Button
        title="Stäng"
        onPress={() => navigation.navigate("HouseholdAccount")}
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
