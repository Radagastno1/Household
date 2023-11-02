import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Appearance, Text, View } from "react-native";
import CreateHouseholdButton from "../components/CreateHouseholdButton";
import Header from "../components/Header";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { getHouseholdsByHouseholdIdAsync } from "../store/household/householdSlice";
import { getProfilesByUserIdAsync } from "../store/profile/profileSlice";
import { getRequestByHouseholdIdsAsync } from "../store/request/requestSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { User } from "../types";
import ModeThemeButton from "../components/ModeThemeButton";
import LogoutButton from "../components/LogoutButton";
import HouseholdList from "../components/HouseholdList";

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());
  const [profilesLoaded, setProfilesLoaded] = useState(false);
  const [requestsLoaded, setRequestsLoaded] = useState(false);

  const activeUser = useAppSelector((state) => state.user.user);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const profilesToUser = useAppSelector(
    (state) => state.profile.profilesToUser,
  );
  const households = useAppSelector((state) => state.household.households);
  const requests = useAppSelector((state) => state.request.requests);
  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  let householdIds: string[] = [];
  useEffect(() => {
    console.log("START", new Date().toLocaleTimeString());
    dispatch(getProfilesByUserIdAsync(activeUser?.uid ?? "hej"));
  }, []);
  useEffect(() => {
    if (profilesToUser.length === 0) return;
    const householdIds = profilesToUser.map((p) => p.householdId);
    dispatch(getHouseholdsByHouseholdIdAsync(householdIds));
    dispatch(getRequestByHouseholdIdsAsync(householdIds));
  }, [profilesToUser]);

//   useEffect(() => {
//     dispatch(getProfilesByUserIdAsync(activeUser?.uid ?? "hej")).then(() => {
//       setProfilesLoaded(true);
//     });
//     householdIds = profilesToUser.map((p) => p.householdId);
//   }, [!profilesLoaded]);

//   useEffect(() => {
//     dispatch(getHouseholdsByHouseholdIdAsync(householdIds));
//   }, [profilesLoaded]);

//   useFocusEffect(
//     useCallback(() => {
//       dispatch(getRequestByHouseholdIdsAsync(householdIds)).then(() => {
//         setRequestsLoaded(true);
//       });
//     }, [profilesLoaded, !requestsLoaded]),
//   );
  useEffect(() => {
    if (activeProfile) {
      navigation.navigate("ProfileAccount", {
        householdId: activeProfile.householdId,
      });
    }
  }, [activeProfile]);
//   useEffect(() => {
//     if (activeProfile) {
//       navigation.navigate("ProfileAccount", {
//         householdId: activeProfile.householdId,
//       });
//     }
//   }, [activeProfile]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
      }}
    >
      <Header text={"Välkommen"} />
      <View
        style={{
          flex: 1,
          marginTop: 0,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Text style={[theme.buttonText]}>MINA HUSHÅLL</Text>
        <HouseholdList
          households={households}
          profilesToUser={profilesToUser}
          requests={requests}
          activeUser={activeUser as User}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <CreateHouseholdButton navigation={navigation} />
        <LogoutButton />
        <ModeThemeButton />
      </View>
    </View>
  );
}
