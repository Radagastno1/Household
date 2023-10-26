import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import { Checkbox, Modal, Portal, TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addUserAsync } from "../store/user/userSlice";
import { UserCreate } from "../types";

type CreateUserProps = RootNavigationScreenProps<"Signup">;

export default function CreateUserAccountScreen({
  navigation,
}: CreateUserProps) {
  const [visible, setVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [passwordMismatchWarning, setPasswordMismatchWarning] = useState("");
  const [missingFieldsWarning, setMissingFieldsWarning] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] =
    useState(false);
  const [confirmationPasswordInput, setConfirmationPasswordInput] =
    useState("");

  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCreateAccount = async () => {
    if (!isChecked) {
      setShowWarning(true);
    } else if (newPassword !== confirmationPasswordInput) {
      setPasswordMismatchWarning("Lösenordet matchar inte");
    } else if (!newName || !newUserName || !newPassword) {
      setMissingFieldsWarning("Fyll i alla obligatoriska fält.");
    } else {
      console.log("ELSE");
      const newUser: UserCreate = {
        // displayName: newName,
        email: newUserName,
        password: newPassword,
      };
      dispatch(addUserAsync(newUser));
      navigation.navigate("Login");
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View style={theme.button as any}>
          <Text style={styles.headerText}>Skapa konto</Text>
        </View>

        <TextInput
          label={
            !newName && missingFieldsWarning ? (
              <Text style={{ color: "red" }}>Namn*</Text>
            ) : (
              "Namn"
            )
          }
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          label={
            !newUserName && missingFieldsWarning ? (
              <Text style={{ color: colorScheme === "dark" ? "black" : "red" }}>
                <Text style={{ color: "red" }}>Användarnamn*</Text>
                Användarnamn"
              </Text>
            ) : (
              "Användarnamn"
            )
          }
          style={styles.input}
          value={newUserName}
          onChangeText={setNewUserName}
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

        <TouchableWithoutFeedback onPress={toggleCheckbox}>
          <View style={styles.checkboxContainer}>
            <Checkbox status={isChecked ? "checked" : "unchecked"} />
            <Text style={styles.checkboxText}>
              Jag accepterar{" "}
              <Text
                style={{ color: "blue", textDecorationLine: "underline" }}
                onPress={showModal}
              >
                villkoren
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <View style={styles.modalContainer}>
              <Text>Här står villkoren</Text>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={showWarning} onDismiss={() => setShowWarning(false)}>
            <View style={styles.warningContainer}>
              <Text>Du måste acceptera villkoren för att skapa konto.</Text>
              <TouchableOpacity
                onPress={() => setShowWarning(false)}
                style={styles.okButton}
              >
                <Text style={{ color: "black" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>

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
          <Text style={styles.loginButtonText}>Tillbaka</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 16,
    color: "black",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 5,
  },
  warningContainer: {
    backgroundColor: "white",
    padding: 5,
  },
  okButton: {
    backgroundColor: "yellow",
    padding: 5,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
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
  loginButtonText: {
    color: "black",
    fontSize: 16,
  },
});
