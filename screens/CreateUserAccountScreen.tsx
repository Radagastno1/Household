import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import ErrorModule from "../modules/errorModule";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addUserAsync } from "../store/user/userSlice";
import { UserCreate } from "../types";

type CreateUserProps = RootNavigationScreenProps<"Signup">;

export default function CreateUserAccountScreen({
  navigation,
}: CreateUserProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordMismatchWarning, setPasswordMismatchWarning] = useState("");
  const [error, setError] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [missingFieldsWarning, setMissingFieldsWarning] = useState("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] =
    useState(false);
  const [confirmationPasswordInput, setConfirmationPasswordInput] =
    useState("");
  const emailExistsError = useAppSelector((state) => state.user.error);

  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const handleCreateAccount = async () => {
    if (newPassword !== confirmationPasswordInput) {
      setPasswordMismatchWarning("Lösenordet matchar inte");
    } else if (!newEmail || !newPassword) {
      setMissingFieldsWarning("Fyll i alla obligatoriska fält.");
    } else if (!isValidEmail(newEmail)) {
      setError(true);
      setErrorPopup(true);
    } else {
      const newUser: UserCreate = {
        email: newEmail,
        password: newPassword,
      };
      dispatch(addUserAsync(newUser));
    }
  };

  const isValidEmail = (newEmail: string) => {
    return newEmail.includes("@") && newEmail.includes(".");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={styles.container}>
          <View style={theme.signInHeader as any}>
            <Text style={styles.headerText}>Skapa konto</Text>
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              label={
                !newEmail && missingFieldsWarning ? (
                  <Text
                    style={{ color: colorScheme === "dark" ? "black" : "red" }}
                  >
                    <Text style={{ color: "red" }}>Email</Text>
                    Email"
                  </Text>
                ) : (
                  "Email"
                )
              }
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <TextInput
              label={
                !newPassword && missingFieldsWarning ? (
                  <Text style={{ color: "red" }}>Lösenord*</Text>
                ) : (
                  "Lösenord"
                )
              }
              style={styles.input}
              secureTextEntry={!passwordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />

            <TextInput
              label={
                !confirmationPasswordInput && missingFieldsWarning ? (
                  <Text style={{ color: "red" }}>Bekräfta lösenord*</Text>
                ) : (
                  "Bekräfta lösenord"
                )
              }
              style={styles.input}
              secureTextEntry={!confirmationPasswordVisible}
              value={confirmationPasswordInput}
              onChangeText={setConfirmationPasswordInput}
              right={
                <TextInput.Icon
                  icon={confirmationPasswordVisible ? "eye" : "eye-off"}
                  onPress={() =>
                    setConfirmationPasswordVisible(!confirmationPasswordVisible)
                  }
                />
              }
            />

            {passwordMismatchWarning ? (
              <Text style={styles.warning}>{passwordMismatchWarning}</Text>
            ) : null}
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={theme.button as any}
              onPress={handleCreateAccount}
            >
              <Text style={theme.buttonText}>Skapa konto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={theme.button as any}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={theme.buttonText}>Tillbaka</Text>
            </TouchableOpacity>
          </View>
        </View>
        {error && (
          <ErrorModule
            errorMessage={"Ange en giltig email"}
            buttonMessage="Försök igen"
            onClose={() => {
              setError(false);
              setErrorPopup(false);
            }}
          />
        )}
        {emailExistsError ? (
          <ErrorModule
            errorMessage={emailExistsError}
            buttonMessage="Försök igen"
            onClose={() => setErrorPopup(false)}
          />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  input: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 5,
    fontSize: 16,
    color: "black",
  },
  warning: {
    color: "red",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "white",
    padding: 5,
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
});
