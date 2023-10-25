import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAllProfilesByUserId } from "../api/profile";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { sethouseholdActive } from "../store/household/householdSlice";
import {
  fetchAllProfilesByHousehold,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household, Profile } from "../types";
import { getHouseholdsFromDB } from "../api/household";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const activeUser = useAppSelector((state) => state.user.user);
  const [households, setHouseholds] = useState<Household[]>([]);
  const [profiles, setProfiles] = useState<(Profile[] | undefined)[]>([]);

  console.log("Nu är användaren ", activeUser, "inloggad");

  useEffect(() => {
    const fetchDataAndSetHouseholds = async () => {
      try {
        const householdsIds = await GetProfilesFromActiveUser();
        const multibleHousehold = await GetHouseholds(householdsIds);

        console.log("householdIds: ", householdsIds);
        return multibleHousehold;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetch = async () => {
      console.log("här är jag");
      return await fetchData();
    };

    fetch().then((result) => {
      setHouseholds(result);
    });

    console.log("households: ", households);
  }, [activeUser]);

  //get the profiles from the activeUser, then the list of householdsId from those profiles
  async function GetHouseholdIdByFromActiveUserProfiles() {
    //all the profiles the user has
    const profiles = await getAllProfilesByUserId(activeUser.id);

    const householdIds = [
      ...new Set(profiles?.map((profile) => profile.householdId)),
    ];
    return householdIds;
  }

  async function GetHouseholds(householdsIds: string[]) {
    const households: Household[] = [];
    householdsIds.forEach(async (household) => {
      const fetchHousehold = await getHouseholdsFromDB(household);
      if (fetchHousehold) {
        households.push(fetchHousehold);
      }
    });

    return households;
  }

  // const activeUser = "5NCx5MKcUu6UYKjFqRkg";
  const dispatch = useAppDispatch();
  const householdSlice = useAppSelector((state) => state.household);
  const allHouseholds = householdSlice.households;
  // const {setColorScheme} = useSetColorTheme();
  const { theme } = useTheme();
  const { setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("auto");

  const handleEnterHousehold = async (householdId: string) => {
    console.log("HUS HÅLLSID: ", householdId);
    dispatch(setHouseholdByHouseholdId({ householdId: householdId }));

    try {
      // Fetch all profiles for the household
      await dispatch(fetchAllProfilesByHousehold(householdId, activeUser));

      // Navigate to the ProfileAccount screen
      navigation.navigate("ProfileAccount", {
        householdId: household.id,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  const handleToggleTheme = () => {
    if (setColorScheme) {
      setColorScheme(currentTheme === "dark" ? "light" : "dark");
      setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <Text style={theme.buttonText}>MINA HUSHÅLL</Text>

        {allHouseholds.map((household: Household) => (
          <TouchableOpacity
            key={household.id}
            style={theme.cardButton as any}
            onPress={() => {
              handleEnterHousehold(household.id);
            }}
          >
            {/* <Button title="" /> */}
            <Text style={theme.buttonText}>{household.name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 30, alignItems: "center" }}>
        <TouchableOpacity
          style={[theme.cardButton as any]}
          onPress={() => navigation.navigate("HandleHousehold")}
        >
          <Text style={theme.buttonText}>Skapa nytt hushåll</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[theme.cardButton as any]}
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
            <TouchableOpacity
              style={styles.innerButton}
              onPress={handleToggleTheme}
            >
              <Text style={styles.innerButtonText}>auto</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.themeButtonText}>
                {currentTheme === "dark" ? "dark" : "light"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
