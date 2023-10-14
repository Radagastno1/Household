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
  profileId: string,
) {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.customHeader}>
        {/* <Appbar.BackAction onPress={_backHome} /> */}
        <View style={styles.title}>
          <Appbar.Content title="Househållet Namn" />
        </View>
        <View style={styles.imageContainer}>
          <Appbar.Action
            icon={({ size, color }) => (
              <Image
                source={require("../assets/bee-home.png")}
                style={styles.beeHomeImage}
              />
            )}
            onPress={() => navigation.navigate("HouseholdAccount")}
          />
        </View>
      </Appbar.Header>

      <Card style={styles.card}>
        <View style={styles.taskItem}>
          <View>
            <Text variant="titleLarge">Syssla1</Text>
          </View>
          <View>
            <Text variant="bodyMedium">avatarer1</Text>
          </View>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.taskItem}>
          <View>
            <Text variant="titleLarge">Syssla2</Text>
          </View>
          <View>
            <Text variant="bodyMedium">avatarer2</Text>
          </View>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.taskItem}>
          <View>
            <Text variant="titleLarge">Syssla3</Text>
          </View>
          <View>
            <Text variant="bodyMedium">avatarer3</Text>
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
  customHeader: {
    height: 40,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  beeHomeImage: {
    width: 20,
    height: 30,
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
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
