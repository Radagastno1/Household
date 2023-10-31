import React from "react";
import { ScrollView } from "react-native";
import { Household, HouseholdRequest, Profile, User } from "../types";
import HouseholdItem from "./HouseholdItem";

interface ListProps {
  households: Household[];
  profilesToUser: Profile[];
  requests: HouseholdRequest[];
  activeUser: User;
}

export default function HouseholdList({
  households,
  profilesToUser,
  requests,
  activeUser,
}: ListProps) {
  return (
    <ScrollView style={{ marginTop: 10 }}>
      {households?.map((household, index) => {
        const profile = profilesToUser.find(
          (profile) =>
            profile.householdId === household.id &&
            profile.userId === activeUser?.uid,
        );
        const request = requests.find(
          (request) => request.householdId === household.id,
        );
        return (
          <HouseholdItem
            key={index}
            index={index}
            household={household}
            profile={profile as Profile}
            request={request as HouseholdRequest}
            activeUser={activeUser}
          />
        );
      })}
    </ScrollView>
  );
}
