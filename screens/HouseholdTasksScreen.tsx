import { View, Text, StyleSheet, Button } from "react-native";

// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg

export default function HouseholdTasksScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Här listas alla tasks</Text>
      <Button title="Task 1" onPress={() => navigation.navigate("ShowTask")} />
      <Button
        title="Skapa task"
        onPress={() => navigation.navigate("HandleTask")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
