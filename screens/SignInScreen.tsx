import { ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../data";
import theme from "../data/theme";
import { RootState } from "../store/store";
import { loginUser } from "../store/user/userAuthSlice";

export const SignInScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  function getPasswordForUsername(username: string) {
    const user = users.find((u) => u.username === username);
    return user ? user.password : "";
  }

  const translateY = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    // Start the navigation animation early
    Animated.timing(translateY, {
      toValue: -0.5,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  // So we don´t have to write the password when logging in (remove this later)
  function clearFieldsAndTogglePassword(event: GestureResponderEvent): void {
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

    if (user) {
      dispatch(loginUser(user));
      console.log("Authentication successful");
      console.log("User data:", user);
      navigation.navigate("HouseholdAccount");
    } else {
      console.error("Authentication failed");
    }
  }

  // UserProfileComponent code directly within SignInScreen, can move to its own file
  const currentUser = useSelector((state: RootState) => state.userAccount.user);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <StatusBar backgroundColor="yellow" />

          <View style={{ backgroundColor: theme.colors.primary, padding: 20 }}>
            <View style={styles.header}>
              <Text
                style={{
                  color: theme.buttonText.color,
                  fontSize: theme.buttonText.fontSize,
                  fontWeight: "bold",
                }}
              >
                Logga in
              </Text>
            </View>
          </View>

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

          <Text
            style={{
              color: theme.buttonText.color,
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 30,
              textAlign: "center",
            }}
          >
            BUZZTER
          </Text>

          <TextInput
            placeholder="Användarnamn"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={styles.input}
          />

          <TextInput
            placeholder="Lösenord"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Logga in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.signupButtonText}>Skapa konto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={clearFieldsAndTogglePassword}
          >
            <Text style={styles.forgotPasswordButtonText}>
              {showPassword ? "Ta bort lösenord" : "Glömt lösenord?"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
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
    height: 103,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    margin: 5,
    padding: 10,
    fontSize: 18,
    color: theme.buttonText.color,
    backgroundColor: theme.colors.background,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: theme.buttonText.color,
    fontSize: theme.buttonText.fontSize,
  },
  signupButton: {
    backgroundColor: theme.colors.background,
    padding: 5,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.buttonText.color,
  },
  signupButtonText: {
    color: theme.buttonText.color,
    fontSize: theme.buttonText.fontSize,
  },
  forgotPasswordButton: {
    backgroundColor: theme.colors.background,
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
  forgotPasswordButtonText: {
    color: theme.buttonText.color,
    fontSize: theme.buttonText.fontSize,
  },
  header: {
    backgroundColor: "yellow",
    padding: 10,
    alignItems: "center",
    marginTop: 30,
  },
});
export default SignInScreen;
