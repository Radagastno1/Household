import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAllProfilesByUserId } from "../api/profile";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { setHouseholdByHouseholdId } from "../store/household/householdSlice";
import { fetchAllProfilesByHousehold } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household, Profile } from "../types";

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
  //att få state på user verkar inte funka än - det ska in sen
  //för nu så hårdkodar vi ett user id
  // const activeUser = useAppSelector((state) => state.user.user);
  const activeUser = useAppSelector((state) => state.user.user);
  console.log("Nu är användaren ", activeUser, "inloggad");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const householdsIds = await GetProfilesFromActiveUser();
        console.log("householdIds: ", householdsIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeUser]);

  async function GetProfilesFromActiveUser() {
    const householdsId: string[] = [];
    const profiles = await getAllProfilesByUserId(activeUser.id);
    profiles?.map((profile) => {
      const id = profile.householdId;
      householdsId.push(id);
    });
    return householdsId;
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
        householdId: householdId,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  // const handleToggleDarkMode = () => {
  //   // You can change the color scheme dynamically
  //   setColorScheme('dark');
  // };

  const handleToggleTheme = () => {
    if (setColorScheme) {
      switch (currentTheme) {
        case "light":
          setColorScheme("dark");
          setCurrentTheme("dark");
          break;
        case "dark":
          setColorScheme("auto");
          setCurrentTheme("auto");
          break;
        case "auto":
          setColorScheme("light");
          setCurrentTheme("light");
          break;
        default:
          break;
      }
    } else {
      console.error("setColorScheme is not defined.");
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
        ))}

        <TouchableOpacity
          style={theme.cardButton as any}
          onPress={() => navigation.navigate("HandleHousehold")}
          // onPress={() =>
          //   navigation.navigate("CreateProfile", {
          //     householdId: "household1",
          //   })
          // }
        >
          {/* <Button title="" /> */}
          <Text style={theme.buttonText}>Skapa nytt hushåll</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.cardButton as any}
          onPress={() => navigation.navigate("Login")}
        >
          {/* <Button title="" /> */}
          <Text style={theme.buttonText}>Logga ut</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.button as any}
          onPress={handleToggleTheme}
        >
          {/* <Button title="" /> */}
          <Text style={theme.buttonText}>Toggle Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.button as any}
          onPress={handleToggleTheme}
        >
          {/* <Button title="" /> */}
          <Text style={theme.buttonText}>Auto Theme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
