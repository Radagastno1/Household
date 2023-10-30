import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../contexts/themeContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootNavigator";

interface ButtonProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "HouseholdAccount",
    undefined
  >;
}

export default function CreateHouseholdButton({ navigation }: ButtonProps) {
  const { theme } = useTheme();
  return (
    <>
      <TouchableOpacity
        style={theme.cardButton as any}
        onPress={() => navigation.navigate("HandleHousehold")}
      >
        <Text style={theme.buttonText}>Skapa nytt hushåll</Text>
      </TouchableOpacity>
    </>
  );
}
