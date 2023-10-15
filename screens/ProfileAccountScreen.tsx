import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ProfileAccountScreen({ navigation }: any) {
  const profile = useSelector((state: RootState) => state.profile.profile);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={profile.avatarsColors} />
      <View
        style={[
          styles.profileTitleContainer,
          { backgroundColor: profile.avatarsColors },
        ]}
      >
        <Text style={styles.profileTitle}>{profile.profileName}</Text>
      </View>
      <Text>Avatar: {profile.avatar}</Text>
      <Text>Här visas Profilens info</Text>
      <Button
        title="Gå till tasks"
        onPress={() => navigation.navigate("Tab")}
      />
      <Button
        title="Tillbaka till listade hushåll"
        onPress={() => navigation.navigate("HouseholdAccount")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTitleContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  profileTitle: {
    fontSize: 25,
    textAlign: "center",
    color: "white", // Vit textfärg på den färgade bakgrunden
  },
});
