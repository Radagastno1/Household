import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/themeContext";
import { AvatarUrls, Avatars } from "../data/avatars";
import { sethouseholdActive } from "../store/household/householdSlice";
import { useColorScheme } from "react-native";

import {
  fetchAllProfilesByHousehold,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household, HouseholdRequest, Profile, User } from "../types";


interface HouseholdItemProps {
  index: number;
  household: Household;
  profile: Profile;
  request: HouseholdRequest;
  activeUser: User;
}

export default function HouseholdItem({
  index,
  household,
  profile,
  request,
  activeUser,
  
}: HouseholdItemProps) {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const colorScheme = useColorScheme();

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

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
    <TouchableOpacity
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
      </View>

      <View>
        <Text style={theme.buttonText}>{household.name}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5 }}>
          {request && profile?.isOwner === true ? (
            <MaterialCommunityIcons
              name="bell-alert-outline"
              size={24}
              color={theme.colors.text} 
            />
          ) : (
            <View style={{ width: 24 }}></View>
          )}
        </View>
    </TouchableOpacity>
    </View>
  );
}
