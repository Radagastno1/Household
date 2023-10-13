import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function CreateUserAccountScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>SignUp Page</Text>
      <Button
        title="Need to Login?"
        onPress={() => navigation.navigate("Login")}
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
