import { AntDesign } from "@expo/vector-icons";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { RootStackParamList } from "../navigators/RootNavigator";
import { TopTabParamList } from "../navigators/TopTabNavigator";

interface NewTaskButtonProps {
  isOwner: boolean;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TopTabParamList, "HouseholdTasks", undefined>,
    NativeStackNavigationProp<RootStackParamList>
  >;
}

export default function NewTaskButton({
  isOwner,
  navigation,
}: NewTaskButtonProps) {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();

  return (
    <View style={styles.buttonContainer}>
      {isOwner === true && (
        <Button
          icon={() => <AntDesign name="pluscircleo" size={20} color="black" />}
          mode="outlined"
          onPress={() => navigation.navigate("HandleTask", { taskId: "0" })}
          style={[
            styles.button,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? "white"
                  : theme.cardButton.backgroundColor,
            },
          ]}
          labelStyle={theme.buttonText}
        >
          Lägg Till
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  button: {
    paddingLeft: 3,
    borderRadius: 20,
    height: 45,
    width: 130,
    backgroundColor: "white",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
