import { Button, StyleSheet, Text, View } from "react-native";
import { setHouseholdByHouseholdId } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";

import { RootNavigationScreenProps } from "../navigators/navigationTypes";

import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { fetchAllProfilesByHousehold } from "../store/profile/profileSlice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  //att få state på user verkar inte funka än - det ska in sen
  //för nu så hårdkodar vi ett user id
  // const activeUser = useAppSelector((state) => state.user.user);
  const mockedUserId = "5NCx5MKcUu6UYKjFqRkg";
  const dispatch = useAppDispatch();
  const householdSlice = useAppSelector((state) => state.household);
  const allHouseholds = householdSlice.households;
  // const {setColorScheme} = useSetColorTheme();
  const { setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("auto");

  const handleEnterHousehold = async (householdId: string) => {
    console.log("HUS HÅLLSID: ", householdId);
    dispatch(setHouseholdByHouseholdId({ householdId: householdId }));

    try {
      // Fetch all profiles for the household
      await dispatch(fetchAllProfilesByHousehold(householdId, mockedUserId));

      // Navigate to the ProfileAccount screen
      navigation.navigate("ProfileAccount", {
        householdId: householdId,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  // const handleToggleDarkMode = () => {
  //   // You can change the color scheme dynamically
  //   setColorScheme('dark');
  // };

  const handleToggleTheme = () => {
    if (setColorScheme) {
      // Toggle between "light," "dark," and "auto"
      switch (currentTheme) {
        case "light":
          setColorScheme("dark");
          setCurrentTheme("dark");
          break;
        case "dark":
          setColorScheme("auto");
          setCurrentTheme("auto");
          break;
        case "auto":
          setColorScheme("light");
          setCurrentTheme("light");
          break;
        default:
          break;
      }
    } else {
      console.error("setColorScheme is not defined.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Här listas alla households:</Text>
      {allHouseholds.map((household: Household) => (
        <Button
          key={household.id}
          title={household.name}
          onPress={() => {
            handleEnterHousehold(household.id);
          }}
        />
      ))}
      <Button
        title="Skapa nytt hushåll"
        onPress={() =>
          navigation.navigate("CreateProfile", { householdId: "household1" })
        } // denna e hårdkodad sålänge
      />
      <Button title="Logga ut" onPress={() => navigation.navigate("Login")} />
      <Button title="Toggle Theme" onPress={handleToggleTheme} />
    </View>
  );
}
