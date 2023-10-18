import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAppSelector } from "../store/store";
import { Household } from "../types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function HouseholdAccountScreen({ navigation }: any) {
  const activeUser = useAppSelector((state) => state.userAccount.user);
  const connectedHouseholds = activeUser.households || []; // Default to an empty array if it's undefined

  useEffect(() => {
    // Hämta användarens hushåll när komponenten laddas
    // Implementera hämtning av hushåll här och uppdatera connectedHouseholds
  }, []);

  return (
    <View style={styles.container}>
      <Text>Här listas alla households:</Text>
      {connectedHouseholds.map((household: Household, index: number) => (
        <Text key={index}>{household.name}</Text>
      ))}
      <Button
        title="Skapa nytt hushåll"
        onPress={() => navigation.navigate("CreateProfileScreen")}
      />
      <Button
        title="Hushåll 1"
        onPress={() => navigation.navigate("ProfileAccount")}
      />
      <Button title="Logga ut" onPress={() => navigation.navigate("Auth")} />
    </View>
  );
}
