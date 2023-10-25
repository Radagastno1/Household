import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getHouseholdsFromDB } from "../api/household";
import { getAllProfilesByUserId } from "../api/profile";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { sethouseholdActive } from "../store/household/householdSlice";
import { fetchAllProfilesByHousehold } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const activeUser = useAppSelector((state) => state.user.user);
  const [households, setHouseholds] = useState<Household[] | undefined>([]);
  console.log("Nu är användaren ", activeUser, "inloggad");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const multibleHousehold = await GetHouseholds();
        setHouseholds(multibleHousehold);
        console.log("households: ", multibleHousehold); // Uppdatera loggningen här
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Anropa den asynkrona funktionen inuti useEffect
  }, []); // Beroendelistan är tom, så useEffect körs en gång när komponenten monteras

  async function GetProfilesFromActiveUser() {
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
    return GetProfilesFromActiveUser()
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

  // const activeUser = "5NCx5MKcUu6UYKjFqRkg";
  const dispatch = useAppDispatch();
  const householdSlice = useAppSelector((state) => state.household);
  const allHouseholds = householdSlice.households;

  const { theme, setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("auto");

  const handleEnterHousehold = async (household: Household) => {
    dispatch(sethouseholdActive(household));
    //denna sen när man hämtat alla hushåll och lagt i state households
    // dispatch(setHouseholdByHouseholdId({ householdId: householdId }));
    try {
      // Fetch all profiles for the household
      await dispatch(fetchAllProfilesByHousehold(household.id, activeUser));

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

        {households?.map((household: Household) => (
          <TouchableOpacity
            key={household.id}
            style={theme.cardButton as any}
            onPress={() => {
              handleEnterHousehold(household);
            }}
          >
            <Text style={theme.buttonText}>{household.name}</Text>
          </TouchableOpacity>
        ))}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    width: "80%",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logOutButton: {
    padding: 10,
    alignItems: "center",
    width: "60%",
    marginTop: 20,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: "lightgrey",
  },
  createHouseholdButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skapaButton: {
    padding: 10,
    alignItems: "center",
    width: "60%",
    borderRadius: 10,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: "#FFD700",
    marginTop: 30,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
  },
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
