import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { app } from "../api/config";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {
  generateHouseholdCode,
  handleJoinHousehold,
} from "../store/household/householdSlice";
import { useAppSelector } from "../store/store";

const db = getFirestore(app);

type HandleHouseholdProps = RootNavigationScreenProps<"HandleHousehold">;

export default function HandleHouseholdScreen({
  navigation,
}: HandleHouseholdProps) {
  const { theme } = useTheme();
  const [householdName, setHouseholdName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleCreateHousehold = async () => {
    const householdCollectionRef = collection(db, "households");
    const randomCode = generateHouseholdCode();

    try {
      const docRef = await addDoc(householdCollectionRef, {
        name: householdName,
        code: randomCode,
      });

      const householdId = docRef.id;

      await setDoc(doc(db, "households", householdId), {
        id: householdId,
        name: householdName,
        code: randomCode,
      });

      console.log("Household created with ID:", householdId);

      navigation.navigate("CreateProfile", {
        householdId: householdId,
        isOwner:true
      });
    } catch (error) {
      console.error("Error creating household:", error);
    }
  };

  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );

  const handleJoin = async () => {
    if (joinCode) {
      console.log("Dispatching joinHouseholdByCode with code:", joinCode);
      const household = await handleJoinHousehold(joinCode);

      if (household) {
        console.log("activeHousehold is available:", household);
        navigation.navigate("CreateProfile", {
          householdId: household.id,
          isOwner:false
        });
      } else {
        console.log("activeHousehold is not available yet.");
      }
    } else {
      console.error("Join code is required.");
    }
  };
  const loggedInUser = useAppSelector((state) => state.user.user);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View>
        <View>
          <Appbar.Header style={{ height: 70, backgroundColor: "white" }}>
            {loggedInUser && <Appbar.Content title="Välkommen!" />}
          </Appbar.Header>
        </View>

        <View style={styles.centeredContent}>
          <Text style={theme.buttonText}>Skapa ett hushåll</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={theme.buttonText}
              placeholder="Hushållets namn"
              value={householdName}
              onChangeText={(text) => setHouseholdName(text)}
            />
          </View>

          <Button
            style={theme.button as any}
            labelStyle={{
              color: "black",
              fontSize: 16,
            }}
            onPress={handleCreateHousehold}
          >
            Skapa
          </Button>

          <View style={styles.verticalSpace} />

          <View style={styles.horizontalLine}>
            <View style={styles.line} />
            <Text style={styles.ellerText}>eller</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.verticalSpace} />

          <Text style={theme.buttonText}>Gå med ett hushåll</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={theme.buttonText}
              placeholder="Skriv in din kod"
              value={joinCode}
              onChangeText={(text) => setJoinCode(text)}
            />
          </View>

          <Button
            style={theme.button as any}
            labelStyle={{
              color: "black",
              fontSize: 16,
            }}
            onPress={handleJoin}
          >
            Gå med
          </Button>

          <View style={styles.verticalSpace} />

          <Button
            style={styles.centeredButton}
            labelStyle={{
              color: "black",
              fontSize: 16,
            }}
            onPress={() => navigation.navigate("HouseholdAccount")}
          >
            Tillbaka
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  headerContainer: {
    height: 70,
    backgroundColor: "white",
  },
  centeredContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  centeredButton: {
    backgroundColor: "white",
    width: "100%",
  },
  verticalSpace: {
    height: 20,
  },
  horizontalLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 10,
  },
  ellerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
