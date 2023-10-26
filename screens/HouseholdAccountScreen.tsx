import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { auth } from "../api/config";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {
  getHouseholdsByHouseholdId,
  sethouseholdActive,
} from "../store/household/householdSlice";
import {
  fetchAllProfilesByHousehold,
  getProfilesByUserIdAsync,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const activeUser = useAppSelector((state) => state.user.user);
  // const [households, setHouseholds] = useState<Household[] | undefined>([]);
  // const [profiles, setProfiles] = useState<(Profile[] | undefined)[]>([]);
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.profile.profiles);
  const households = useAppSelector((state) => state.household.households);
  console.log("Nu är användaren ", activeUser, "inloggad");

  // Andra useFocusEffect
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (activeUser) {
          console.log("anropar thunken");
          dispatch(getProfilesByUserIdAsync(activeUser.uid));
          // if (profiles) {
          //   console.log("nu kollar den efter profiler", profiles);
          //   profiles.forEach((profile) =>
          //     dispatch(
          //       getHouseholdsByHouseholdId({
          //         householdId: profile.householdId,
          //       }),
          //     ),
          //   );
          // }
        }
      };
      fetchData();
    }, [profiles]),
  );
  // async function GetHouseholdIdsFromActiveUser() {
  //   const householdsId: string[] = [];
  //   if (activeUser) {
  //     console.log("aktiva user: ", activeUser);
  //     const profiles = await getAllProfilesByUserId(activeUser?.uid);
  //     profiles?.map((profile) => {
  //       const id = profile.householdId;
  //       householdsId.push(id);
  //     });
  //     return householdsId;
  //   }
  // }

  // async function GetHouseholds() {
  //   // Anropa GetProfilesFromActiveUser och använd .then
  //   return GetHouseholdIdsFromActiveUser()
  //     .then(async (householdsIds) => {
  //       const households: Household[] = [];
  //       await Promise.all(
  //         householdsIds!.map(async (household) => {
  //           const fetchHousehold = await getHouseholdsFromDB(household);
  //           if (fetchHousehold) {
  //             households.push(fetchHousehold);
  //           }
  //         }),
  //       );
  //       return households;
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching households:", error);
  //       return [];
  //     });
  // }

  //   const activeProfile = useAppSelector((state) => state.profile.activeProfile);

  const handleEnterHousehold = async (household: Household) => {
    dispatch(sethouseholdActive(household));
    try {
      // Fetch all profiles for the household
      if (activeUser) {
        await dispatch(
          fetchAllProfilesByHousehold(household.id, activeUser.uid),
        );

        //här måste man sätta aktiva profilen
        dispatch(
          setProfileByHouseholdAndUser({
            userId: activeUser.uid,
            householdId: household.id,
          }),
        );
      }
      console.log("aktiva profilen: ");
      // Navigate to the ProfileAccount screen
      navigation.navigate("ProfileAccount", {
        householdId: household.id,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        // Loggning ut framgångsrikt
        console.log("Användaren har loggats ut");
        // Du kan också navigera användaren till din utloggningsskärm här om så önskas
        // navigation.navigate("LogoutScreen");
      })
      .catch((error) => {
        // Logga ut misslyckades, visa felmeddelande
        console.error("Fel vid utloggning:", error.message);
        Alert.alert(
          "Fel vid utloggning",
          "Det uppstod ett fel vid utloggningen.",
        );
      });
  }

  // async function GetProfilesForEachHousehold(householdId: string) {
  //   const profiles = await getAllProfilesByHouseholdId(householdId).then(
  //     (profiles) => {
  //       return profiles;
  //     },
  //   );
  //   return profiles;
  // }

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
        // Do not reset the position here
      }
    },
  });

  const translateX = pan.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [-50, 0, 50],
    extrapolate: "clamp",
  });

  //   const panResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (e, gestureState) => {
  //       pan.setValue(gestureState.dx);
  //     },
  //     onPanResponderRelease: (e, gestureState) => {
  //       if (Math.abs(gestureState.dx) > 50) {
  //         handleToggleTheme();
  //       }

  //       Animated.spring(pan, {
  //         toValue: 0,
  //         friction: 5,
  //         useNativeDriver: false,
  //       }).start();
  //     },
  //   });

  //   const translateX = pan.interpolate({
  //     inputRange: [-50, 0, 50],
  //     outputRange: [-50, 0, 50],
  //     extrapolate: 'clamp',
  //   });

  //   const panResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (e, gestureState) => {
  //       pan.setValue(gestureState.dx);
  //     },
  //     onPanResponderRelease: (e, gestureState) => {
  //       if (gestureState.dx > 50) {
  //         handleToggleTheme();
  //         Animated.timing(pan, {
  //           toValue: 0,
  //           duration: 300,
  //           useNativeDriver: false,
  //         }).start();
  //       } else {
  //         Animated.spring(pan, {
  //           toValue: 0,
  //           friction: 5,
  //           useNativeDriver: false,
  //         }).start();
  //       }
  //     },
  //   });

  //   const translateX = pan.interpolate({
  //     inputRange: [0, 50],
  //     outputRange: [0, 50],
  //     extrapolate: 'clamp',
  //   });

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
              style={[
                theme.cardButton as any,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
              onPress={() => {
                handleEnterHousehold(household);
              }}
            >
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                {profiles[index] && profiles[index]!.length > 0 && (
                  <Image
                    key={0}
                    source={{
                      uri: AvatarUrls[profiles[index]![0].avatar as Avatars],
                    }}
                    style={{ height: 20, width: 20 }}
                    alt={`Avatar ${index}`}
                  />
                )}
                {profiles[index] && profiles[index]!.length > 1 && (
                  <Text>...</Text>
                )}
              </View> */}

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
});
function getAllProfilesByUserId(uid: string) {
  throw new Error("Function not implemented.");
}
