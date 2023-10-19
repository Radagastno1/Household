import { View, Text, StyleSheet, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";
import { householdReducer, setHouseholdByHouseholdId, sethousehold } from "../store/household/householdSlice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function HouseholdAccountScreen({ navigation }: any) {
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
            dispatch(setHouseholdByHouseholdId({ householdId: household.id }));
            navigation.navigate("ProfileAccount");
          }}
        />
      ))}
      <Button title="Logga ut" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
