import React, { useEffect, useState } from "react";
import { Image, useColorScheme } from "react-native";
import { Button } from "react-native-paper";
import { AvatarColors, AvatarUrls, Avatars } from "../data/avatars";
import { useAppDispatch, useAppSelector } from "../store/store";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import {
  addProfileAsync,
  getProfilesByHouseholdIdAsync
} from "../store/profile/profileSlice";
import { addProfileWithRequest } from "../store/request/requestSlice";

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
  const [selectedBee, setSelectedBee] = useState(false);
  const householdId = route.params.householdId;
  const isOwner = route.params.isOwner;
  // const household = households.find((h) => h.id === householdId);
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const todaysDate = new Date();
  //här hämtas alla profiler för det hushållet det gäller
  const profiles = useAppSelector((state) => state.profile.profiles);

  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );

  const householdSlice = useAppSelector((state) => state.household);

  const activeUser = useAppSelector((state) => state.user.user);

  const selectedHousehold = useAppSelector((state) =>
    state.household.households.find(
      (household) => household.id === householdId,
    ),
  );

  useEffect(() => {
    dispatch(getProfilesByHouseholdIdAsync(householdId));
  }, []);

  //     // Lite slarvigt kanske en stund här men funkar sålänge
  // const hasActiveProfiles = activeProfiles.length > 0;

  // const isOwner = !hasActiveProfiles;
  // const isAvatarOccupied = (avatarId: string) => {
  //   return activeProfiles.some((profile) => profile.avatar === avatarId);
  // };

  // const householdHasOwner = () => {
  //   console.log("antal profiler för hushållet: ", profilesForHousehold.payload.length)
  //   if (profilesForHousehold.payload) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const [lastSelectedAvatar, setLastSelectedAvatar] = useState<string | null>(
    null,
  );
  const isAvatarOccupied = (avatarId: string) => {
    if (profiles) {
      return profiles.some((profile) => profile.avatar === avatarId);
    }
  };

  const saveProfile = () => {
    console.log("skapad profil med hushållsid", householdId);

    if (selectedAvatar && activeUser) {
      if(isOwner){
        const avatarsColor = AvatarColors[selectedAvatar as Avatars];
        const newProfile = {
          id: todaysDate.getUTCMilliseconds.toString().slice(-4),
          profileName: householdName,
          userId: activeUser.uid,
          householdId: householdId,
          avatar: selectedAvatar,
          avatarsColors: avatarsColor,
          isOwner: true,
          isActive: true,
        };
        dispatch(addProfileAsync(newProfile)).then(
          () => {
            navigation.navigate("HouseholdAccount");
          }
        );
      }else{
        if(activeUser.email){
          const avatarsColor = AvatarColors[selectedAvatar as Avatars];
          const newProfile = {
            id: "",
            profileName: householdName,
            userId: activeUser.uid,
            householdId: "",
            avatar: selectedAvatar,
            avatarsColors: avatarsColor,
            isOwner: false,
            isActive: true,
          };
          dispatch(addProfileWithRequest({newProfile:newProfile, userMail:activeUser.email, householdId:householdId})).then(
            () => {
              navigation.navigate("HouseholdAccount");
            }
          );
        }
      }
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
                  colorScheme === theme.colors.background
                    ? ""
                    : theme.cardButton.backgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.rectText,
                {
                  backgroundColor:
                    colorScheme === theme.colors.background
                      ? "white"
                      : theme.cardButton.backgroundColor,
                },
              ]}
            >
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
                colorScheme === theme.colors.background
                  ? "white"
                  : theme.cardButton.backgroundColor,
            },
          ]}
          onChangeText={(text) => setHouseholdName(text)}
        />
        <View>
          {isOwner ? (
            <View>
              <TouchableOpacity
                key={Avatars.Bee}
                style={[
                  styles.avatar,
                  // selectedBee ? styles.selectedAvatar : null
                  selectedAvatar === Avatars.Bee
                    ? { backgroundColor: "lightgray" }
                    : null,
                ]}
                onPress={() => {
                  setSelectedAvatar(Avatars.Bee);
                }}
              >
                <Image
                  source={{ uri: AvatarUrls[Avatars.Bee] }}
                  style={styles.avatarImage}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.avatarsContainer}>
              {avatars.map((avatar) => {
                const isOccupied = isAvatarOccupied(avatar.id);
                const isSelected = selectedAvatar === avatar.id;

                const avatarStyles = [
                  styles.avatar,

                  isOccupied ? styles.occupiedAvatar : undefined,
                  isAvatarOccupied(avatar.id)
                    ? styles.occupiedAvatar
                    : undefined,
                  // isSelected ? styles.selectedAvatar : undefined,
                  isSelected ? { backgroundColor: "lightgray" } : undefined,
                ];

                return (
                  <TouchableOpacity
                    key={avatar.id}
                    style={avatarStyles}
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
                );
              })}
            </View>
          )}
        </View>

        <TouchableOpacity
           style={theme.button as any}
          onPress={saveProfile}
          disabled={!selectedAvatar}
        >
          <Text style={theme.buttonText}>Skapa</Text>
        </TouchableOpacity>
        <Button
          style={theme.button as any}
          onPress={() => navigation.navigate("HandleHousehold")}
          disabled={!selectedAvatar}
        >
          <Text style={theme.buttonText}>Tillbaka</Text>
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
    // backgroundColor: "white",
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
