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
  const dispatch = useAppDispatch() 
  const connectedHouseholds = activeUser.households || []; 

  const enterHousehold = (householdId: string) => {
    dispatch(setHouseholdByHouseholdId({householdId: householdId}))
    navigation.navigate("ProfileAccount")
  };

  return (
    <View style={styles.container}>
      <Text>Här listas alla households:</Text>
      {connectedHouseholds.map((household: Household, index: number) => (
        <Text key={index}>{household.name}</Text>
      ))}
      <Button
        title="Skapa nytt hushåll"
        onPress={() => navigation.navigate("CreateProfile")}
      />
      <Button
        title="Hushåll 1"
        onPress={() => enterHousehold("household2")
      }
      />
      <Button title="Logga ut" onPress={() => navigation.navigate("Auth")} />
    </View>
  );
}
