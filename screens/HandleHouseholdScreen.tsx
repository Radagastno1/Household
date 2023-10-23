import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch } from "../store/store"; 
import { setHousehold } from "../store/household/householdSlice";

export const generateHouseholdCode = (length: number = 6) => {
  // Generera slumpmässig kod
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

type HandleHouseholdProps = RootNavigationScreenProps<"HandleHousehold">;

export default function HandleHouseholdScreen({ navigation }: HandleHouseholdProps) {
  const [householdName, setHouseholdName] = useState("");
  const dispatch = useAppDispatch();

  const createNewHousehold = () => {
    const householdCode = generateHouseholdCode();
    
    dispatch(
      setHousehold({
        id: householdCode,
        name: householdName,
        code: householdCode,
      })
    );

    // Navigera till CreateProfileScreen skicka med kod 
    navigation.navigate("CreateProfile", {
      householdId: householdCode,
    });
  }

  return (
    <View style={styles.container}>
      <Text>Här skapas ett hushåll</Text>
      <TextInput
        placeholder="Skriv hushållets namn"
        value={householdName}
        onChangeText={(text) => setHouseholdName(text)}
        style={styles.input}
      />
      <Button title="Skapa hushåll" onPress={createNewHousehold} />
      <Button title="Stäng" onPress={() => navigation.navigate("HouseholdAccount")} />
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
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});
