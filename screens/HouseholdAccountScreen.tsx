import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Appbar } from "react-native-paper";
import { auth } from "../api/config";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {
  getHouseholdsByHouseholdIdAsync,
  sethouseholdActive,
} from "../store/household/householdSlice";
import {
  fetchAllProfilesByHousehold,
  getProfilesByUserIdAsync,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";
import { useSharedValue } from "react-native-reanimated";

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const activeUser = useAppSelector((state) => state.user.user);
  // const [households, setHouseholds] = useState<Household[] | undefined>([]);
  // const [profiles, setProfiles] = useState<(Profile[] | undefined)[]>([]);
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.profile.profiles);
  const households = useAppSelector((state) => state.household.households);
  const [profilesLoaded, setProfilesLoaded] = useState(false);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  let householdIds: string[] = [];
  console.log("Nu är användaren ", activeUser, "inloggad");

  useEffect(() => {
    console.log("USEFFECT");

    console.log("anropar thunken");
    dispatch(getProfilesByUserIdAsync(activeUser?.uid ?? "hej")).then(() => {
      setProfilesLoaded(true);
    });
    console.log("nu kollar den efter profiler", profiles);
    householdIds = profiles.map((p) => p.householdId);
  }, [!profilesLoaded]);

  useEffect(() => {
    dispatch(getHouseholdsByHouseholdIdAsync(householdIds));
  }, [profilesLoaded]);

  const handleEnterHousehold = async (household: Household) => {
    dispatch(sethouseholdActive(household));
    try {
      await dispatch(
        fetchAllProfilesByHousehold(household.id, activeUser!.uid),
      );
      dispatch(
        setProfileByHouseholdAndUser({
          userId: activeUser!.uid,
          householdId: household.id,
        }),
      );
      console.log("FRÅN HOUSEHOLDACCOUNT: ", activeProfile?.id);
      console.log("aktiva profilen: ", activeProfile);
      if (activeProfile) {
        navigation.navigate("ProfileAccount", {
          householdId: household.id,
        });
      }
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        console.log("Användaren har loggats ut");
      })
      .catch((error) => {
        console.error("Fel vid utloggning:", error.message);
        Alert.alert(
          "Fel vid utloggning",
          "Det uppstod ett fel vid utloggningen.",
        );
      });
  }

  const { theme, setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("auto");
  const handleToggleTheme = () => {
    if (setColorScheme) {
      setColorScheme(currentTheme === "dark" ? "light" : "dark");
      setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const modes = ["light", "auto", "dark"];

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setShowDropdown(false);
  };
  const handleClose = () => {
    setShowDropdown(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
      }}
    >
      <View>
        <Appbar.Header style={{ height: 70, backgroundColor: "white" }}>
          <Appbar.Content
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            title={"Välkommen"}
          />
        </Appbar.Header>
      </View>

      <View
        style={{ marginTop: 0, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <Text style={[theme.buttonText]}>MINA HUSHÅLL</Text>
        </View>

        <ScrollView
          style={{
            maxHeight: "50%",
            marginTop: 10,
          }}
        >
          {households?.map((household: Household, index) => (
            <TouchableOpacity
              key={index}
              style={[
                theme.cardButton as any,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
              onPress={() => {
                handleEnterHousehold(household);
              }}
            >
              <View>
                <Text style={theme.buttonText}>{household.name}</Text>
              </View>

              <View>
                {/* if it is owner */}
                <MaterialIcons name="edit" size={24} color="black" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={theme.cardButton as any}
          onPress={() => navigation.navigate("HandleHousehold")}
        >
          <Text style={theme.buttonText}>Skapa nytt hushåll</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.cardButton as any}
          onPress={handleLogOut}
        >
          <Text style={theme.buttonText}>Logga ut</Text>
        </TouchableOpacity>
        <View style={styles.root}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text>Choose Mode</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              <View style={styles.closeButtonContainer}>
                <Button onPress={handleClose}>
                  <AntDesign name="close" size={12} color="black" />
                </Button>
              </View>
              <FlatList
                data={modes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <Text style={styles.dropdownItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <Text>Selected Mode: {selectedItem}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  themeButtonContainer: {
    padding: 20,
    alignItems: "center",
    width: "60%",
    borderRadius: 20,
    elevation: 2,
    borderWidth: 0,
    marginTop: 20,
    position: "relative",
  },

  themeButton: {
    justifyContent: "space-between",
    alignItems: "center",

    flexDirection: "row",
    position: "relative",
    backgroundColor: "lightgrey",
  },

  innerButton: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
    width: 70,
    alignItems: "center",
  },
  innerButtonText: {
    color: "black",
    padding: 10,
  },
  bottomContent: {
    marginBottom: 0,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    maxWidth: "90%",
    height: 70,
    marginBottom: 10,
  },

  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 16,
    backgroundColor: "lightgray",
    borderRadius: 8,
  },
  dropdownContainer: {
    position: "absolute",
    top: -10,
    left: 150,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 4,
    zIndex: 1,
    width: 60,
  },
  dropdownItem: {
    padding: 4,
  },
  closeButtonContainer: {
    alignItems: "flex-end",
    padding: 4,
  },
});
function getAllProfilesByUserId(uid: string) {
  throw new Error("Function not implemented.");
}
