import { Button, Text, View } from "react-native";

export default function DeleteTaskModule() {
  return (
    <View>
      <Text>Vill du arkivera sysslan?</Text>
      <Text>
        Om du väljer att radera sysslan permanent, då kommer all statistik
        gällande sysslan också att tas bort.
      </Text>
      <Button title="Ja, arkivera sysslan" />
      <Button title="Nej, radera sysslan permanent" />
    </View>
  );
}
