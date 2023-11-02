import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Household, Profile } from "../../types";

interface HeaderProps {
  title: string;
  route: any;
}
const Header = () => {
  const [headerTitle, setHeaderTitle] = useState<string>("Home");

  function getHouseholdName(
    profiles: Profile[],
    profileId: string,
    households: Household[],
  ): string | null {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      const household = households.find((h) => h.id === profile.householdId);
      return household?.name || null;
    }
    return null;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
