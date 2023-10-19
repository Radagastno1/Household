import React, { useState, useEffect } from "react";
import { AvatarColors, Avatars, AvatarUrls } from "../data/avatars";
import { Button } from "react-native-paper";
import { households } from "../data";
import { useDispatch } from 'react-redux';
import { setProfile, editAvatarSelection } from "../store/profile/profileSlice";
import { Image } from "react-native";

import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/themeContext";
import { useAppSelector } from "../store/store";


type Avatar = {
  id: string;
};

const avatars: Avatar[] = [
  { id: Avatars.Bee },
  { id: Avatars.Frog},
  { id: Avatars.Monkey },
  { id: Avatars.Cat },
  { id: Avatars.Koala },
  { id: Avatars.Beetle },
  { id: Avatars.Fox },
  { id: Avatars.Pig },
];

export default function CreateProfileScreen({ navigation, route }: any) {
  const [householdName, setHouseholdName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { id } = route.params;
  const household = households.find((h) => h.id === id);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const todaysDate = new Date();

  const activeUser = useAppSelector((state) => state.userAccount.user);

  const activeProfiles = useAppSelector((state) => state.profile.profiles.filter((profile) => profile.householdId === id));

  useEffect(() => {
  }, [id, dispatch]);

  const isAvatarOccupied = (avatarId: string) => {
    return activeProfiles.some((profile) => profile.avatar === avatarId);
  };
  

  const saveProfile = () => {
    console.log("hushållsid är", id)
    if (selectedAvatar) {
      const avatarsColor = AvatarColors[selectedAvatar as Avatars];
      const newProfile = {
        id: todaysDate.getUTCMilliseconds.toString().slice(-4),
        profileName: householdName,
        userId: activeUser.id,
        householdId: id,
        avatar: selectedAvatar,
        avatarsColors: avatarsColor,
        isOwner: false,
        isActive: false,
      };

      dispatch(setProfile(newProfile));
      navigation.navigate("HouseholdAccount");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.rectContainer}>
          <Text style={styles.rectText}>{id}</Text>
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
      <View style={styles.avatarsContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
          key={avatar.id}
          style={[
            styles.avatar,
            selectedAvatar === avatar.id ? styles.selectedAvatar : undefined,
            isAvatarOccupied(avatar.id) ? styles.occupiedAvatar : undefined,
            { backgroundColor: AvatarColors[avatar.id as Avatars] },
          ]}
          onPress={() => {
            if (!isAvatarOccupied(avatar.id)) {
              setSelectedAvatar(avatar.id as Avatars);
            }
          }}
        >
          <Image
            source={{ uri: AvatarUrls[avatar.id as Avatars] }}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        ))}
      </View>
      <Button style={theme.button as any} onPress={saveProfile} disabled={!selectedAvatar}>
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
  occupiedAvatar: {
    backgroundColor: "darkgray", // Byt ut med den färg du önskar
  }
  
});

