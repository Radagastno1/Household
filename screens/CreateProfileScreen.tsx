import React, { useState } from "react";
import { AvatarColors, Avatars } from "../data/avatars";
import { Button } from "react-native-paper";
import { households } from "../data";
import { useDispatch } from 'react-redux';
import { setProfile } from "../store/profile/profileSlice";


import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { useAppSelector } from "../store/store";

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

export default function CreateProfileScreen({ navigation, route }: any) {
  
  const [householdName, setHouseholdName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { id } = route.params;
  const household = households.find((h) => h.id === id);
  const {theme } = useTheme();
  const dispatch = useDispatch();
  const todaysDate = new Date();
  const activeUser = useAppSelector((state) => state.userAccount.user)

  const saveProfile = () => {
    const avatar = selectedAvatar || '';
    const avatarsColor = selectedAvatar ? AvatarColors[selectedAvatar as Avatars] : '';
    const newProfile = {
      id:  todaysDate.getUTCMilliseconds.toString().slice(-4),
      profileName: householdName, 
      userId: activeUser.id,
      householdId: id,
      avatar: avatar,
      avatarsColors: avatarsColor,
      isOwner: false,
      isActive: false,
    };
     
    dispatch(setProfile(newProfile));
    navigation.navigate("HouseholdAccount");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.rectContainer}>
          <Text style={styles.rectText}>{household?.name}</Text>
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

      <Button style={theme.button as any} onPress={saveProfile}>
        <Text style={theme.buttonText}>Skapa</Text>
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
