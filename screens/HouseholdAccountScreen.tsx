import { View, Text, StyleSheet, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";
import {
  householdReducer,
  setHouseholdByHouseholdId,
  sethousehold,
} from "../store/household/householdSlice";

import { RootNavigationScreenProps } from "../navigators/navigationTypes";

import { useSetColorTheme } from "../contexts/themeContext";
import { useTheme } from "../contexts/themeContext";
import { useState } from "react";


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
  const activeUser = useAppSelector((state) => state.userAccount.user);
  const dispatch = useAppDispatch();
  const householdSlice = useAppSelector((state) => state.household);
  const allHouseholds = householdSlice.households;
  // const {setColorScheme} = useSetColorTheme();
  const {setColorScheme}= useTheme();
  const [currentTheme, setCurrentTheme] = useState('auto');

  // const handleToggleDarkMode = () => {
  //   // You can change the color scheme dynamically
  //   setColorScheme('dark');
  // };

  const handleToggleTheme = () => {
    if (setColorScheme) {
      // Toggle between "light," "dark," and "auto"
      switch (currentTheme) {
        case 'light':
          setColorScheme('dark');
          setCurrentTheme('dark');
          break;
        case 'dark':
          setColorScheme('auto');
          setCurrentTheme('auto');
          break;
        case 'auto':
          setColorScheme('light');
          setCurrentTheme('light');
          break;
        default:
          break;
      }
    } else {
      console.error('setColorScheme is not defined.');
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
            console.log("HUS HÅLLSID: ", household.id);
            dispatch(setHouseholdByHouseholdId({ householdId: household.id }));
            navigation.navigate("ProfileAccount", {
              householdId: household.id,
            });
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
