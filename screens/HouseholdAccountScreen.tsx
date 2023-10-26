import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Button, Appbar, IconButton, Avatar } from "react-native-paper";
import { auth } from "../api/config";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {
  editHouseHoldeName,
  getHouseholdsByHouseholdIdAsync,
  sethouseholdActive,
} from "../store/household/householdSlice";
import {
  fetchAllProfilesByHousehold,
  getProfilesByUserIdAsync,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";
import { AvatarUrls, Avatars } from "../data/avatars";

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const activeUser = useAppSelector((state) => state.user.user);
  const colorScheme = useColorScheme();
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

  const [editingStates, setEditingStates] = useState(
    Array(households?.length).fill(false),
  );

  const [updatedHouseholdName, setUpdatedHouseholdname] = useState(
    activeProfile?.profileName,
  );

  const cancelEditing = (index: number) => {
    const updatedEditingStates = [...editingStates];
    updatedEditingStates[index] = false;
    setEditingStates(updatedEditingStates); // Reset the edited name to the original name
  };

  const handleHouseholdSaveClick = async (editHouseholdId: string) => {
    if (editHouseholdId) {
      dispatch(
        editHouseHoldeName({
          householdId: editHouseholdId,
          newHouseholdName: updatedHouseholdName ?? editHouseholdId,
        }),
      );
      // Update the editing state for the edited household
      setEditingStates(Array(households?.length).fill(false));
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

  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      pan.setValue(gestureState.dx);
    },
    onPanResponderRelease: (e, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        handleToggleTheme();
      }
    },
  });

  const translateX = pan.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [-50, 0, 50],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
              style={[theme.cardButton as any, { alignItems: "flex-start" }]}
              onPress={() => {
                if (!editingStates[index]) {
                  handleEnterHousehold(household);
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {!editingStates[index] && profiles[index] && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      key={0}
                      source={{
                        uri: AvatarUrls[profiles[index].avatar as Avatars],
                      }}
                      style={{ height: 20, width: 20 }}
                      alt={`Avatar ${index}`}
                    />

                    <Text
                      style={[
                        styles.profileTitle,
                        {
                          color:
                            colorScheme === "dark"
                              ? "white"
                              : theme.colors.text,
                          marginLeft: 10,
                          flex: 1,
                        },
                      ]}
                    >
                      {household.name}
                    </Text>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => {
                        // Toggle the editing state for the clicked household
                        const updatedEditingStates = [...editingStates];
                        updatedEditingStates[index] = !editingStates[index];
                        setEditingStates(updatedEditingStates);
                      }}
                    />
                  </View>
                )}
              </View>

              {editingStates[index] ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <TextInput
                      placeholder={household.name}
                      onChangeText={(text) => {
                        setUpdatedHouseholdname(text);
                      }}
                      style={{
                        color: colorScheme === "dark" ? "white" : "black",
                        borderWidth: 1,
                        borderColor: "lightgray",
                        borderRadius: 5,
                        padding: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Button
                      mode="elevated"
                      onPress={() => cancelEditing(index)}
                    >
                      Avbryt
                    </Button>
                  </View>
                  <View>
                    <Button
                      mode="elevated"
                      onPress={() => handleHouseholdSaveClick(household.id)}
                    >
                      Spara
                    </Button>
                  </View>
                </View>
              ) : null}
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

        <TouchableOpacity
          style={[
            styles.themeButtonContainer,
            {
              backgroundColor: theme.button.backgroundColor,
            },
          ]}
          onPress={handleToggleTheme}
        >
          <View style={styles.themeButton}>
            <View>
              <Text style={styles.themeButtonText}>
                {currentTheme === "dark" ? "dark" : "light"}
              </Text>
            </View>
            <Animated.View
              style={[styles.innerButton, { transform: [{ translateX }] }]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.innerButtonText}>auto</Text>
            </Animated.View>
            <View>
              <Text style={styles.themeButtonText}>
                {currentTheme === "light" ? "light" : "dark"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
  themeButtonText: {
    color: "black",
    fontSize: 16,
    margin: 10,
  },
  themeButton: {
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
  },

  innerButton: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
    zIndex: 20,
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
  profileTitle: {
    fontSize: 25,
    textAlign: "center",
    color: "black",
  },
});
