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
import { useDispatch } from "react-redux";
import { getUsersFromDB } from "../api/user"; // Import the getUsersFromDB function
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { loginUser } from "../store/user/userSlice";
import { User } from "../types";

type SignInProps = RootNavigationScreenProps<"Login">;

export const SignInScreen = ({ navigation }: SignInProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [] = useState<User[]>([]);

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

  // So you don't have to write the password when logging in (remove this later)
  function clearFieldsAndTogglePassword(event: GestureResponderEvent): void {
    if (!showPassword) {
      // You can call the getUsersFromDB function with the provided username
      getUsersFromDB(username).then((users) => {
        if (users && users.length > 0) {
          const user = users[0];
          // If the user exists in the database, show the password
          setPassword(user.password);
          setShowPassword(true);
        } else {
          console.error("User not found in the database.");
        }
      });
    } else {
      // If the password is already shown, clear it
      setPassword("");
      setShowPassword(false);
    }
  }

  function handleLogin() {
    getUsersFromDB(username)
      .then((users) => {
        if (users && users.length > 0) {
          const user = users[0];

          if (user.password === password) {
            dispatch(loginUser(user));
            console.log("Authentication successful");
            console.log("User data:", user);
            navigation.navigate("HouseholdAccount");
          } else {
            console.error("Authentication failed: Invalid password");
          }
        } else {
          console.error("Authentication failed: User not found");
        }
      })
      .catch((error) => {
        console.error("Error while fetching users:", error);
      });
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 0],
                outputRange: [0, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <StatusBar backgroundColor="yellow" />

          <View style={{ backgroundColor: theme.colors.background }}>
            <View style={styles.container}>
              <View style={theme.button as any}>
                <Text style={styles.headerText}>Logga in</Text>
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

            <View style={styles.textContainer}>
              <Text
                style={{
                  color: theme.buttonText.color,
                  fontSize: 24,
                  fontWeight: "bold",
                  // marginTop: 30,
                  textAlign: "center",
                }}
              >
                BUZZTER
              </Text>

              <TextInput
                placeholder="Användarnamn"
                onChangeText={(text) => setUsername(text)}
                value={username}
                style={theme.buttonText}
              />

              <TextInput
                placeholder="Lösenord"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={theme.buttonText}
              />

              <TouchableOpacity
                style={theme.button as any}
                onPress={handleLogin}
              >
                <Text style={theme.buttonText}>Logga in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={theme.signupButton as any}
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text style={theme.buttonText}>Skapa konto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={theme.signupButton as any}
                onPress={clearFieldsAndTogglePassword}
              >
                <Text style={theme.buttonText}>
                  {showPassword ? "Ta bort lösenord" : "Glömt lösenord?"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginBottom: 39,
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
    // color: theme.buttonText.color,
    // backgroundColor: theme.colors.background,
  },
  loginButton: {
    // backgroundColor: theme.colors primary,
    // padding: 10,
    // alignItems: "center",
    // margin: 20,
    // borderRadius: 10,
  },
  loginButtonText: {
    // color: theme.buttonText.color,
    // fontSize: theme.buttonText.fontSize,
  },
  // signupButton: {
  //   // backgroundColor: theme.colors background,
  //   padding: 5,
  //   alignItems: "center",
  //   margin: 10,
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   // borderColor: theme.buttonText.color,
  // },
  signupButtonText: {
    // color: theme.buttonText.color,
    // fontSize: theme.buttonText.fontSize,
  },
  // forgotPasswordButton: {
  //   // backgroundColor: theme.colors background,
  //   // flex: 1,
  //   padding: 5,
  //   alignItems: "center",
  //   margin: 10,
  // },
  // forgotPasswordButtonText: {

  //   // color: theme.buttonText.color,
  //   // fontSize: theme.buttonText.fontSize,
  // },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  header: {
    backgroundColor: "yellow",
    // padding: 10,
    alignItems: "center",
    // marginTop: 30,
  },
  textContainer: {
    padding: 20,
  },
});
export default SignInScreen;
