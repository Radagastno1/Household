import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function ProfileAccountScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Här visas Profilens info</Text>
      <Button
        title="Gå till tasks"
        onPress={() => navigation.navigate("Tab")}
      />
      <Button
        title="Tillbaka till listade hushåll"
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
