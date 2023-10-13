import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function CreateProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Här skapas en profil</Text>
      <Button
        title="Skapa profil"
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
