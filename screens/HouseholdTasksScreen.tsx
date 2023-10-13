import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { RootStackParamList } from "../navigators/RootNavigator";

// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg
type Props = NativeStackScreenProps<RootStackParamList, "HouseholdTasksScreen">;
export default function HouseholdTasksScreen() {
  const _goBack = () => console.log("Went back");
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const _handleMore = () => console.log("Shown more");
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Househållet Namn" />
        <Appbar.Action icon="./assets/bee-home.png" onPress={_handleMore} />
      </Appbar.Header>
      <TouchableOpacity onPress={_handleMore}>
        {/* <Image
            source={require("./assets/splash.png")}
           
          /> */}
      </TouchableOpacity>
      <Card style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text variant="titleLarge">Syssla</Text>
          </View>
          <View>
            <Text variant="bodyMedium">avatarer</Text>
          </View>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          icon=""
          mode="outlined"
          onPress={() => console.log("Lägg Till")}
          style={styles.button}
        >
          Lägg Till
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
  },
  button: {
    height: 40,
    width: 120,
  },
});
