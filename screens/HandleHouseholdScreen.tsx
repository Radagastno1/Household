import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { app } from "../api/config";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {
  addHouseholdAsync,
  handleJoinHousehold,
} from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import ErrorModule from "../modules/errorModule";

const db = getFirestore(app);

type HandleHouseholdProps = RootNavigationScreenProps<"HandleHousehold">;

export default function HandleHouseholdScreen({
  navigation,
}: HandleHouseholdProps) {
  const { theme } = useTheme();
  const [householdName, setHouseholdName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [codeErrorPopup, setCodeErrorPopup] = useState(false);
  const profilesToUser = useAppSelector(
    (state) => state.profile.profilesToUser,
  );
  const dispatch = useAppDispatch();

  const handleCreateHousehold = async () => {
    try {
      dispatch(addHouseholdAsync(householdName)).then((action) => {
        if (addHouseholdAsync.fulfilled.match(action)) {
          const householdCreated = action.payload;
          if (householdCreated) {
            navigation.navigate("CreateProfile", {
              householdId: householdCreated.id,
              isOwner: true,
            });
          }
        }
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
      const profile = profilesToUser.find(
        (profile) =>
          profile.householdId === household?.id &&
          profile.userId === loggedInUser?.uid,
      );
      if (household && profile?.isOwner) {
        setErrorPopup(true);
      } else if (!household) {
        setCodeErrorPopup(true);
      } else if (household) {
        console.log("activeHousehold is available:", household);
        navigation.navigate("CreateProfile", {
          householdId: household.id,
          isOwner: false,
        });
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
          <Appbar.Header
            style={{ height: 70, backgroundColor: theme.colors.background }}
          >
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

          <TouchableOpacity
            style={theme.button as any}
            onPress={handleCreateHousehold}
          >
            <Text style={{ fontSize: 20 }}>Skapa</Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            style={theme.button as any}
            onPress={() => handleJoin()}
          >
            <Text style={{ fontSize: 20 }}>Gå med</Text>
          </TouchableOpacity>

          <View style={styles.verticalSpace} />
          <TouchableOpacity
            style={theme.button as any}
            onPress={() => navigation.navigate("HouseholdAccount")}
          >
            <Text style={{ fontSize: 20 }}>Tillbaka</Text>
          </TouchableOpacity>
        </View>
        {errorPopup ? (
          <ErrorModule
            errorMessage={"Kan inte gå med eget hus"}
            buttonMessage="Försök igen"
            onClose={() => setErrorPopup(false)}
          />
        ) : null}
        {codeErrorPopup ? (
          <ErrorModule
            errorMessage={"koden finns inte"}
            buttonMessage="Försök igen"
            onClose={() => setErrorPopup(false)}
          />
        ) : null}
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
