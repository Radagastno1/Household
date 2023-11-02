import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useTheme } from "../contexts/themeContext";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../store/store";
import { logOutUser } from "../store/user/userSlice";
import { auth } from "../api/config";

export default function LogoutButton() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        dispatch(logOutUser());
      })
      .catch((error) => {
        console.error("Fel vid utloggning:", error.message);
        Alert.alert(
          "Fel vid utloggning",
          "Det uppstod ett fel vid utloggningen.",
        );
      });
  }

  return (
    <>
      <TouchableOpacity style={theme.cardButton as any} onPress={handleLogOut}>
        <Text style={theme.buttonText}>Logga ut</Text>
      </TouchableOpacity>
    </>
  );
}
