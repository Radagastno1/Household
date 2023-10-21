import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Checkbox, Modal, Portal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
// import theme from "../data/theme";
import { useTheme } from "../contexts/themeContext";
import { useAppSelector } from "../store/store";
import { createAccount } from "../store/user/userAccountSlice";
import { User } from "../types";



const CreateUserAccountScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [visible, setVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] =
    useState(false);
  const [passwordMismatchWarning, setPasswordMismatchWarning] = useState("");
  const [missingFieldsWarning, setMissingFieldsWarning] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPasswordInput, setConfirmationPasswordInput] =
    useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { theme } = useTheme(); // la till theme här

  const dispatch = useDispatch();

  const userAccountState = useAppSelector((state) => state.userAccount);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCreateAccount = () => {
    if (!isChecked) {
      setShowWarning(true);
    } else if (newPassword !== confirmationPasswordInput) {
      setPasswordMismatchWarning("Lösenordet matchar inte");
    } else if (!newName || !newUserName || !newPassword) {
      setMissingFieldsWarning("Fyll i alla obligatoriska fält.");
    } else {
      // Create the new user object
      const newUser: User = {
        id: "1",
        name: newName,
        username: newUserName,
        password: newPassword,
      };

      // Dispatch the createAccount action with the new user
      dispatch(createAccount(newUser));

      // If all conditions are met, navigate to "Login"
      navigation.navigate("Login");
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
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
            <Text style={{ color: "red" }}>Användarnamn*</Text>
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
        style={{
          backgroundColor: theme.colors.primary,
          padding: 10,
          alignItems: "center",
          margin: 20,
          borderRadius: 10,
        }}
        onPress={handleCreateAccount}
      >
        <Text style={{ color: "black", fontSize: theme.buttonText.fontSize }}>
          Skapa konto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "black", fontSize: theme.buttonText.fontSize }}>
          Tillbaka
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "yellow",
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
    backgroundColor: "white",
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
});

export default CreateUserAccountScreen;
