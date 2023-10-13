import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Avatar = {
  id: string;
  name: string;
};

const avatars: Avatar[] = [
  { id: "A", name: "Avatar A" },
  { id: "B", name: "Avatar B" },
  { id: "C", name: "Avatar C" },
  { id: "D", name: "Avatar D" },
  { id: "E", name: "Avatar E" },
  { id: "F", name: "Avatar F" },
  { id: "G", name: "Avatar G" },
  { id: "H", name: "Avatar H" },
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
            ]}
            onPress={() => setSelectedAvatar(avatar.id)}
          >
            <Text style={styles.avatarText}>{avatar.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Skapa</Text>
      </TouchableOpacity>
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
    marginBottom: 190,
    padding: 10,
  },
  button: {
    backgroundColor: "yellow",
    padding: 10,
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
    width: 300,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
  avatarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  avatar: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  selectedAvatar: {
    backgroundColor: "lightblue",
  },
  avatarText: {
    fontSize: 18,
  },
});

// import { View, Text, StyleSheet, Button } from "react-native";
// import React from "react";

// export default function CreateProfileScreen({ navigation }: any) {
//   return (
//     <View style={styles.container}>
//       <Text>Här skapas en profil</Text>
//       <Button
//         title="Skapa profil"
//         onPress={() => navigation.navigate("HouseholdAccount")}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
