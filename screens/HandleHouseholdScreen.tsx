import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";

// Genererar en slumpmässig kod
export const generateHouseholdCode = (length: number = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

type HandleHouseholdProps = RootNavigationScreenProps<"HandleHousehold">;

  export default function HandleHouseholdScreen({
    navigation,
  }: HandleHouseholdProps) {
    const createNewHousehold = () => {
      // Generera en kod för det nya hushållet
      const householdCode = generateHouseholdCode();
      
      // Navigera till CreateProfileScreen med kodinfo
      navigation.navigate("CreateProfile", {
        householdId: householdCode,
      });
    }
    

  return (
    <View style={styles.container}>
      <Text>Här skapas ett hushåll</Text>
      <Button
        title="Skapa hushåll"
        onPress={createNewHousehold}
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