import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { getHouseholdsFromDB } from "../api/household";
import {
  getAllProfilesByHouseholdId,
  getAllProfilesByUserId,
} from "../api/profile";
import { useTheme } from "../contexts/themeContext";
import { AvatarUrls, Avatars } from "../data/avatars";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { editHouseHoldeName, sethouseholdActive } from "../store/household/householdSlice";
import {
    editProfileName,
  fetchAllProfilesByHousehold,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household, Profile } from "../types";


type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const activeUser = useAppSelector((state) => state.user.user);
  const [households, setHouseholds] = useState<Household[] | undefined>([]);
  const [profiles, setProfiles] = useState<(Profile[] | undefined)[]>([]);
  console.log("Nu är användaren ", activeUser, "inloggad");

//------------------------------------------------------------------------------
  const activeProfiles = useAppSelector((state) => state.profile.profiles);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const isOwner = activeProfile?.isOwner;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfileName, setUpdatedProfilename] = useState(
    activeProfile?.profileName,
  );

  const [updatedHouseholdName, setUpdatedHouseholdname] = useState(
    activeProfile?.profileName,
  );

  const handleSaveClick = () => {
    if (activeProfile) {
      dispatch(
        editProfileName({
          profileId: activeProfile?.id,
          newProfileName: updatedProfileName ?? activeProfile.profileName,
        }),
      );
      setIsEditing(false);
      console.log("NYA PROFILNAMNET", { updatedProfileName });
    }
  };

  const handleHouseholdSaveClick = async (household: Household) => {
    if (household) {
      dispatch(
        editHouseHoldeName({
          householdId: household.id,
          newHouseholdName: updatedHouseholdName ?? household.name,
        }),
      );
      setIsEditing(false);
      console.log("NYA PROFILNAMNET", { updatedHouseholdName });
    }
  };
  const cancelEditing = (household: Household) => {
    setIsEditing(false);
    setUpdatedHouseholdname(household.name); // Reset the edited name to the original name
  };

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const multibleHousehold = await GetHouseholds();

        setHouseholds(multibleHousehold);
        console.log("households: ", multibleHousehold);
        // get all householdIds under user
        const householdsIds = await GetHouseholdIdsFromActiveUser();
        const profilesByHouse = await Promise.all(
          householdsIds.map((houseId) => GetCurrentUserProfilesForEachHousehold(houseId)),
        );
        setProfiles(profilesByHouse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []); //runs only onece

  async function GetHouseholdIdsFromActiveUser() {
    const householdsId: string[] = [];
    const profiles = await getAllProfilesByUserId(activeUser.id);
    profiles?.map((profile) => {
      const id = profile.householdId;
      householdsId.push(id);
    });
    return householdsId;
  }

  async function GetHouseholds() {
    // Anropa GetProfilesFromActiveUser och använd .then
    return GetHouseholdIdsFromActiveUser()
      .then(async (householdsIds) => {
        const households: Household[] = [];
        await Promise.all(
          householdsIds.map(async (household) => {
            const fetchHousehold = await getHouseholdsFromDB(household);
            if (fetchHousehold) {
              households.push(fetchHousehold);
            }
          }),
        );
        return households;
      })
      .catch((error) => {
        console.error("Error fetching households:", error);
        return [];
      });
  }

  const dispatch = useAppDispatch();
  //   const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const householdSlice = useAppSelector((state) => state.household);
  const allHouseholds = householdSlice.households;

  const handleEnterHousehold = async (household: Household) => {
    dispatch(sethouseholdActive(household));
    try {
      // Fetch all profiles for the household
      await dispatch(fetchAllProfilesByHousehold(household.id, activeUser));
      //här måste man sätta aktiva profilen
      dispatch(
        setProfileByHouseholdAndUser({
          userId: activeUser.id,
          householdId: household.id,
        }),
      );

      console.log("aktiva profilen: ");
      // Navigate to the ProfileAccount screen
      navigation.navigate("ProfileAccount", {
        householdId: household.id,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  async function GetCurrentUserProfilesForEachHousehold(householdId: string) {
    const allprofilesForEachHousehold = await getAllProfilesByHouseholdId(householdId);
  const currentUserProfilesForAllHouseholds = allprofilesForEachHousehold?.filter((profile)=>profile.userId === activeUser.id);
    return currentUserProfilesForAllHouseholds;
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
        // Do not reset the position here
      }
    },
  });

  const translateX = pan.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [-50, 0, 50],
    extrapolate: 'clamp',
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
            title={
              activeUser ? `Välkommen ${activeUser.username}` : "Välkommen"
            }
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              {!isEditing &&  profiles[index] && (
                //  profiles[index]!.map((profile, profileIndex) => (
                  <Image
                    key={0}
                    source={{
                      uri: AvatarUrls[profiles[index]![0].avatar as Avatars],
                    }}
                    style={{ height: 20, width: 20 }}
                    alt={`Avatar ${index}`}
                  />
                //  )
                 )
               }  
            
              </View>

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
          onPress={() => navigation.navigate("Login")}
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
          style={[
            styles.innerButton,
            { transform: [{ translateX }] },
          ]}
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
