import { ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
// import { useDispatch } from "react-redux";
import { users } from "../data";
// import { loginUser } from "../store/user/userActions";

export const SignInScreen = () => {
  // const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function getPasswordForUsername(username: string) {
    const user = users.find((u) => u.username === username);
    return user ? user.password : "";
  }

  function clearFieldsAndTogglePassword(event: GestureResponderEvent): void {
    //Do it like this for now since we don´t have a database
    if (!showPassword) {
      const passwordForUsername = getPasswordForUsername(username);
      if (passwordForUsername) {
        // If the password exists, show it
        setPassword(passwordForUsername);
        setShowPassword(true);
      }
    } else {
      // If the password is already shown, clear it
      setPassword("");
      setShowPassword(false);
    }
  }

  function handleLogin() {
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    //write this in terminal until HouseholdAccountScreen works
    if (user) {
      console.log("Authentication successful");
      console.log("User data:", user);

      // navigation.navigate('HouseholdAccountScreen');
    } else {
      console.error("Authentication failed");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor="yellow" />

        <View
          style={{
            backgroundColor: "yellow",
            padding: 20,
            alignItems: "center",
          }}
        ></View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.container}>
              <Video
                source={require("../assets/bee-animation.mp4")}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                shouldPlay
                isLooping
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
              />
            </View>
          </View>
          <Text
            style={{
              color: "black",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            BUZZTER
          </Text>
        </View>

        <TextInput
          placeholder="Användarnamn"
          onChangeText={(text) => setUsername(text)}
          value={username}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 0,
            padding: 5,
            fontSize: 18,
            color: "black",
            backgroundColor: "white",
          }}
        />

        <TextInput
          placeholder="Lösenord"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            margin: 5,
            padding: 10,
            fontSize: 18,
            color: "black",
            backgroundColor: "white",
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "yellow",
            padding: 10,
            alignItems: "center",
            margin: 20,
            borderRadius: 10,
          }}
          onPress={handleLogin}
          // onPress={() => {
          //    navigation.navigate("HouseholdAccountScreen");
          // }}
        >
          <Text style={{ color: "black", fontSize: 18 }}>Logga in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 5,
            alignItems: "center",
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={() => {
            // navigation.navigate("CreateAccountScreen");
          }}
        >
          <Text style={{ color: "black", fontSize: 18 }}>Skapa konto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 5,
            alignItems: "center",
            margin: 10,
          }}
          onPress={clearFieldsAndTogglePassword}
        >
          <Text style={{ color: "black", fontSize: 18 }}>
            {showPassword ? "Ta bort lösenord" : "Glömt lösenord?"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -39,
  },
  video: {
    width: 400,
    height: 150,
  },
});
export default SignInScreen;
