import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity, Image, Platform } from "react-native";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { RootStackParamList } from "../navigators/RootNavigator";
import { View, StyleSheet } from "react-native";
import { profiles } from "../data/index";
import { Profile } from "../types";
import React from "react";
import { TabBar, TabView } from "react-native-tab-view";
// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg

export default function HouseholdTasksScreen(
  { navigation }: any,
  profile: Profile,
) {
  const _backHome = () => console.log("Shown more");

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View
          style={{ flex: 1, alignItems: "center", }}
        >
          <Appbar.Content title="Househållet Namn" />
        </View>
        <Appbar.Action
          icon={({ size, color }) => (
            <Image
              source={require("../assets/bee-home.png")}
              style={{ width: 20, height: 30,justifyContent:"center" }}
            />
          )}
          onPress={_backHome}
        />
      </Appbar.Header>

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
        {/* {profile.isOwner &&( */}
        <Button
          icon=""
          mode="outlined"
          onPress={() => console.log("Lägg Till")}
          style={styles.button}
        >
          Lägg Till
        </Button>
        {/* )} */}
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
