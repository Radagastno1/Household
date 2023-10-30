import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Appearance } from "react-native";
import {
  Alert,
  Animated,
  FlatList,
  Modal,
  Image,
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
import { AvatarUrls, Avatars } from "../data/avatars";
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
import { getRequestByHouseholdIdsAsync } from "../store/request/requestSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logOutUser } from "../store/user/userSlice";
import { Household } from "../types";
import { useSharedValue } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { State } from "react-native-gesture-handler";

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {

  const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());


  const [isRequest, setIsRequest] = useState(false);

  const activeUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const profilesToUser = useAppSelector(
    (state) => state.profile.profilesToUser,
  );
  const households = useAppSelector((state) => state.household.households);

  const requests = useAppSelector((state) => state.request.requests);
  

  const [profilesLoaded, setProfilesLoaded] = useState(false);
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  let householdIds: string[] = [];
  console.log("Nu är användaren ", activeUser, "inloggad");

  useEffect(() => {
    console.log("USEFFECT");

    console.log("anropar thunken");
    dispatch(getProfilesByUserIdAsync(activeUser?.uid ?? "hej")).then(() => {
      setProfilesLoaded(true);
    });
    console.log("nu kollar den efter profiler", profilesToUser);
    householdIds = profilesToUser.map((p) => p.householdId);
  }, [!profilesLoaded]);

  useEffect(() => {
    dispatch(getHouseholdsByHouseholdIdAsync(householdIds));
  }, [profilesLoaded]);

  useEffect(() => {
    dispatch(getRequestByHouseholdIdsAsync(householdIds)).then(() => {
      setRequestsLoaded(true);
    });
  }, [!requestsLoaded, profilesLoaded]);

  useEffect(() => {
    if (activeProfile) {
      navigation.navigate("ProfileAccount", {
        householdId: activeProfile.householdId,
      });
    }
  }, [activeProfile]);

  const handleEnterHousehold = async (household: Household) => {
    dispatch(sethouseholdActive(household));
    console.log("HHOUSEHOLDID ÄR: ", household.id);
    try {
      dispatch(fetchAllProfilesByHousehold(household.id, activeUser!.uid));
      dispatch(
        setProfileByHouseholdAndUser({
          userId: activeUser!.uid,
          householdId: household.id,
        }),
      );
      console.log("FRÅN HOUSEHOLDACCOUNT: ", activeProfile?.id);
      console.log("aktiva profilen: ", activeProfile);
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        console.log("Användaren har loggats ut");
        dispatch(logOutUser());
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
  const [currentTheme, setCurrentTheme] = useState("automatic");
  const handleToggleTheme = () => {
    if (setColorScheme) {
      setColorScheme(currentTheme === "dark" ? "light" : "dark");
      setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };
  const handleToggleSystemTheme = () => {
    const systemColorScheme = Appearance.getColorScheme();
    console.log('System Theme Detected:', systemColorScheme);
    
    if (systemColorScheme) {
      if (systemColorScheme === 'light' && currentTheme === 'dark') {
        setCurrentTheme('light');
        setColorScheme('light');
      } else if (systemColorScheme === 'dark' && currentTheme === 'light') {
        setCurrentTheme('dark');
        setColorScheme('dark');
      }
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
        <Appbar.Header style={{ height: 70, backgroundColor: theme.colors.background }}>
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
          {households?.map((household: Household, index) => {
            const profile = profilesToUser.find(
              (profile) =>
                profile.householdId === household.id &&
                profile.userId === activeUser?.uid,
            );
            const request = requests.find(
              (request) => request.householdId === household.id,
            );

            return (
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    key={0}
                    source={{
                      uri: AvatarUrls[profile?.avatar as Avatars],
                    }}
                    style={{ height: 20, width: 20 }}
                    alt={`Avatar ${index}`}
                  />
                  <Text>{request?.status}</Text>
                </View>

                <View>
                  <Text style={theme.buttonText}>{household.name}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 5 }}>
                  {!isRequest && profile?.isOwner === true ? (
                    <MaterialCommunityIcons
                      name="bell-alert-outline"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <View style={{ width: 24 }}></View>
                  )}
                  {profile?.isOwner === true ? (
                    <MaterialIcons name="edit" size={24} color="black" />
                  ) : (
                    <View style={{ width: 24 }}></View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
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
    top: -5,
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
