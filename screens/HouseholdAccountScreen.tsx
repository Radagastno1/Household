import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import HouseholdForm from '../components/HouseholdForm';

export default function HouseholdAccountScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Här listas alla households</Text>
      <Button
        title="Hushåll 1"
        onPress={() => navigation.navigate("ProfileAccount")}
      />
      <Button
        title="Skapa ett hushåll"
        onPress={() => navigation.navigate("HandleHousehold")}
      />
      <Button title="Logga ut" onPress={() => navigation.navigate("Auth")} />
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
