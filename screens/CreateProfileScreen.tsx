import React, { useState } from "react";
import { Theme, Avatars, AvatarColors } from "../data/theme";
import { Button } from "react-native-paper";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Avatar = {
  id: string;
  name: string;
};

const avatars: Avatar[] = [
  { id: Avatars.Bee, name: "Bee" },
  { id: Avatars.Frog, name: "Frog" },
  { id: Avatars.Monkey, name: "Monkey" },
  { id: Avatars.Cat, name: "Cat" },
  { id: Avatars.Koala, name: "Koala" },
  { id: Avatars.Beetle, name: "Beetle" },
  { id: Avatars.Fox, name: "Fox" },
  { id: Avatars.Pig, name: "Pig" },
];

export default function CreateProfileScreen({ navigation }: any) {
  const [householdName, setHouseholdName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const saveProfile = () => {
    navigation.navigate("HouseholdAccount");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.rectContainer}>
          <Text style={styles.rectText}>{householdName} Hushållets namn</Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.rectContainer}>
          <Text style={styles.rectText}>Profil namn</Text>
        </View>
      </View>
      <TextInput
        placeholder="Skriv ditt profilnamn"
        style={styles.input}
        onChangeText={(text) => setHouseholdName(text)}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.rectContainer}>
          <Text style={styles.rectText}>Välj din avatar</Text>
        </View>
      </View>
      <View style={styles.avatarsContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatar,
              selectedAvatar === avatar.id ? styles.selectedAvatar : null,
              { backgroundColor: AvatarColors[avatar.id as Avatars] },
            ]}
            onPress={() => setSelectedAvatar(avatar.id as Avatars)}
          >
            <Text style={styles.avatarText}>{avatar.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button style={Theme.button as any} onPress={saveProfile}>
        <Text style={Theme.buttonText}>Skapa</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  rectContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: 370,
    justifyContent: "center",
    alignItems: "center",
  },
  rectText: {
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 150,
    padding: 10,
  },

  avatarsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 20,
  },
  selectedAvatar: {
    backgroundColor: "lightblue",
  },
  avatarText: {
    fontSize: 18,
  },
});
