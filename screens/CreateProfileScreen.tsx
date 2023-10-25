import React, { useEffect, useState,  useCallback } from "react";
import { Image } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { useColorScheme } from "react-native";
import { AvatarColors, AvatarUrls, Avatars } from "../data/avatars";

import { findHouseholdById, sethouseholdActive} from "../store/household/householdSlice";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { addProfile } from "../store/profile/profileSlice";
import { useAppSelector } from "../store/store";

type CreateProfileProps = RootNavigationScreenProps<"CreateProfile">;

type Avatar = {
  id: string;
};

const avatars: Avatar[] = [
  { id: Avatars.Bee },
  { id: Avatars.Frog },
  { id: Avatars.Monkey },
  { id: Avatars.Cat },
  { id: Avatars.Koala },
  { id: Avatars.Beetle },
  { id: Avatars.Fox },
  { id: Avatars.Pig },
];

export default function CreateProfileScreen({
  navigation,
  route,
}: CreateProfileProps) {
  const [householdName, setHouseholdName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { householdId } = route.params;
  // const household = households.find((h) => h.id === householdId);
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const todaysDate = new Date();

  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );


  const householdSlice = useAppSelector((state) => state.household);

  //MOCKAR ETT ID SÅLÄNGE FÖR USERN
  // const mockedUserId = "5NCx5MKcUu6UYKjFqRkg";

  //UTKOMMENTERAR DENNA SÅLÄNGE FÖR FINNS INGET STATE FÖR EN AKTIV USER ÄN
  const activeUser = useAppSelector((state) => state.userAccount.user);

  const activeProfiles = useAppSelector((state) =>
    state.profile.profiles.filter(
      (profile) => profile.householdId === householdId,
    ),
  );

 
  

  



const selectedHousehold = useAppSelector((state) =>
  state.household.households.find((household) => household.id === householdId)
);
 
  const isAvatarOccupied = (avatarId: string) => {
    return activeProfiles.some((profile) => profile.avatar === avatarId);
  };

  const saveProfile = () => {
    console.log("hushållsid är", householdId);
    if (selectedAvatar) {
      const avatarsColor = AvatarColors[selectedAvatar as Avatars];
      const newProfile = {
        id: todaysDate.getUTCMilliseconds.toString().slice(-4),
        profileName: householdName,
        userId: activeUser.id,
        householdId: householdId,
        avatar: selectedAvatar,
        avatarsColors: avatarsColor,
        isOwner: false,
        isActive: false,
      };

      dispatch(addProfile(newProfile));
      navigation.navigate("HouseholdAccount");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View
            style={[
              styles.rectContainer,
              {
                backgroundColor:
                  colorScheme === "dark"
                    ? "white"
                    : theme.cardButton.backgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.rectText,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "white"
                      : theme.cardButton.backgroundColor,
                },
              ]}
            >
              {" "}
              {selectedHousehold?.name}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={theme.button as any}>
            <Text style={theme.buttonText}>Välj ditt profilnamn</Text>
          </View>
        </View>
        <TextInput
          placeholder="Skriv ditt profilnamn"
          // style={styles.input}
          style={[
            styles.input,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? "white"
                  : theme.cardButton.backgroundColor,
            },
          ]}
          onChangeText={(text) => setHouseholdName(text)}
        />
        <View style={styles.avatarsContainer}>
          {avatars.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatar,
                selectedAvatar === avatar.id
                  ? styles.selectedAvatar
                  : undefined,
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
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Button
          style={theme.button as any}
          onPress={saveProfile}
          disabled={!selectedAvatar}
        >
          <Text style={theme.buttonText}>Skapa</Text>
        </Button>
      </View>
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
  avatarImage: {
    width: 40,
    height: 40,
    opacity: 10,
  },
  occupiedAvatar: {
    backgroundColor: "gray",
    opacity: 0.1,
  },
});
