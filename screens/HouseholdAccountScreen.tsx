import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  getAllProfilesByHouseholdId,
  getAllProfilesByUserId,
} from "../api/profile";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {  useAppSelector } from "../store/store";
import { Household, Profile } from "../types";
import { getHouseholdsFromDB } from "../api/household";
import { Appbar} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { AvatarUrls, Avatars } from "../data/avatars";

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  //att få state på user verkar inte funka än - det ska in sen
  //för nu så hårdkodar vi ett user id
  // const activeUser = useAppSelector((state) => state.user.user);
  const activeUser = useAppSelector((state) => state.user.user);
  const [households, setHouseholds] = useState<Household[]>([]);
  const [profiles, setProfiles] = useState<(Profile[] | undefined)[]>([]);

  console.log("Nu är användaren ", activeUser, "inloggad");

  useEffect(() => {
    const fetchDataAndSetHouseholds = async () => {
      try {
        //-------------works--------
        const householdsIds = await GetHouseholdIdByFromActiveUserProfiles();
        console.log("householdIds: ", householdsIds);

        // Fetch households for each householdId
        const households = await Promise.all(
          householdsIds.map((householdId) => getHouseholdsFromDB(householdId)),
        );
        // Filter out undefined values
        const filteredHouseholds = households.filter(
          (household) => household !== undefined,
        ) as Household[];

        const profilesByHouse = await Promise.all(
          householdsIds.map((houseId) => GetProfilesForEachHousehold(houseId)),
        );

        setHouseholds(filteredHouseholds);
        setProfiles(profilesByHouse);

        // Fetch profiles for each household
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndSetHouseholds();
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

  async function GetProfilesForEachHousehold(householdId: string) {
    const profiles = await getAllProfilesByHouseholdId(householdId);
    return profiles;
  }

  const { theme } = useTheme();
  const { setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("auto");

  const handleEnterHousehold = async (householdId: string) => {
    try {
      navigation.navigate("ProfileAccount", {
        householdId: householdId,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        position: "relative",
      }}
    >
      <View>
        <Appbar.Header style={{ height: 70, backgroundColor: "white" }}>
          <Appbar.Content
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            title={`Welcome ${activeUser.username}`}
          />
        </Appbar.Header>
      </View>

      <ScrollView
        style={{
          maxHeight: "40%",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {households?.map((household: Household, index) => (
            <TouchableOpacity
              key={index}
              style={[
                theme.cardButton as any,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
              onPress={() => {
                handleEnterHousehold(household.id);
              }}
            >
              {/* {profiles[index]?.map((profile, profileIndex) => (
                <View key={profileIndex}>
                  <Image
                    source={{
                      uri: AvatarUrls[profile.avatar as Avatars],
                    }}
                    style={{ height: 20, width: 20 }}
                    alt={`Avatar ${index}`}
                  />
                </View>
              ))} */}

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          </View>
            
              {/* <Button title="" /> */}
              <Text style={theme.buttonText}>{household.name}</Text>
              <View>
                {/* if it is owner */}
                <MaterialIcons name="edit" size={24} color="black" />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              theme.cardButton as any,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <View>
              <Text>avatar</Text>
            </View>
            {/* <Button title="" /> */}
            <Text style={theme.buttonText}>test</Text>
            <View>
              <MaterialIcons name="edit" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              theme.cardButton as any,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <View>
              <Text>avatar</Text>
            </View>
            {/* <Button title="" /> */}
            <Text style={theme.buttonText}>test</Text>
            <View>
              <MaterialIcons name="edit" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 30, alignItems: "center" }}>
        <TouchableOpacity
          style={[theme.cardButton as any]}
          onPress={() => navigation.navigate("HandleHousehold")}
        >
          {/* <Button title="" /> */}
          <Text style={theme.buttonText}>Skapa nytt hushåll</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[theme.cardButton as any]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  additionalHousehold: {
    flexDirection: "row",
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
});
