import { View, Text, StyleSheet, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";
import {
  householdReducer,
  setHouseholdByHouseholdId,
  sethousehold,
} from "../store/household/householdSlice";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";

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
    </View>
  );
}
