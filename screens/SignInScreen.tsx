import { ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import ErrorModule from "../modules/errorModule";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logInUserAsync } from "../store/user/userSlice";
import { User } from "../types";

type SignInProps = RootNavigationScreenProps<"Login">;

export const SignInScreen = ({ navigation }: SignInProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const error = useAppSelector((state) => state.user.error);
  const [errorPopup, setErrorPopup] = useState(false);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [] = useState<User[]>([]);

  const translateY = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -0.5,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  async function handleLogin() {
    dispatch(logInUserAsync({ email: username, password: password })).then(
      () => {
        if (error) {
          setErrorPopup(true);
          setUsername("");
          setPassword("");
        } else {
          return;
        }
      },
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
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
          <>
            <StatusBar style="auto" backgroundColor="#FFD700" />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
              <View style={{ backgroundColor: theme.colors.background }}>
                <View style={theme.signInHeader as any}>
                  <Text style={styles.headerText}>Logga in</Text>
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
                  <Text
                    style={{
                      color: theme.buttonText.color,
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    BUZZTER
                  </Text>
                </View>

                <View style={styles.textContainer}>
                  <TextInput
                    placeholder="Email"
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
                </View>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>

        {errorPopup && error ? (
          <ErrorModule
            errorMessage={error}
            buttonMessage="Försök igen"
            onClose={() => setErrorPopup(false)}
          />
        ) : null}
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  header: {
    backgroundColor: "yellow",
    alignItems: "center",
  },
  textContainer: {
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
export default SignInScreen;
