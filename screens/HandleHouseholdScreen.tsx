import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";

type HandleHousholdProps = RootNavigationScreenProps<"HandleHousehold">;

export default function HandleHouseholdScreen({
  navigation,
}: HandleHousholdProps) {
  return (
    <View style={styles.container}>
      <Text>Här skapas ett hushåll</Text>
      <Button
        title="Skapa hushåll"
        onPress={() =>
          navigation.navigate("CreateProfile", {
            householdId: "fYHVLNiQvWEG9KNUGqBT",
          })
        }
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
