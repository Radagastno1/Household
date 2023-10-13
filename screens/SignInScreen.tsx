import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function SignInScreen({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button
        title="Need an account?"
        onPress={() => navigation.navigate("Signup")}
      />
      <Button
        title="Faked login"
        onPress={() => navigation.navigate("HomeStack")}
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