import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
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
  getProfilesByHouseholdIdAsync,
} from "../store/profile/profileSlice";
import { addProfileWithRequest } from "../store/request/requestSlice";
import ErrorModule from "../modules/errorModule";

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
  const householdId = route.params.householdId;
  const isOwner = route.params.isOwner;
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const todaysDate = new Date();

  const profiles = useAppSelector((state) => state.profile.profiles);

  const activeUser = useAppSelector((state) => state.user.user);

  const selectedHousehold = useAppSelector((state) =>
    state.household.households.find(
      (household) => household.id === householdId,
    ),
  );

  useEffect(() => {
    dispatch(getProfilesByHouseholdIdAsync(householdId));
  }, []);

  const isAvatarOccupied = (avatarId: string) => {
    if (profiles) {
      return profiles.some((profile) => profile.avatar === avatarId);
    }
  };

  const saveProfile = () => {
    if (!householdName) {
      setErrorText("Ange ett namn");
      setErrorPopup(true);
    } else if (isOwner && activeUser) {
      const avatarsColor = AvatarColors[Avatars.Bee];

      const newProfile = {
        id: todaysDate.getUTCMilliseconds.toString().slice(-4),
        profileName: householdName,
        userId: activeUser.uid,
        householdId: householdId,
        avatar: Avatars.Bee,
        avatarsColors: avatarsColor,
        isOwner: true,
        isActive: true,
      };

      dispatch(addProfileAsync(newProfile)).then(() => {
        navigation.navigate("HouseholdAccount");
      });
    } else if (!selectedAvatar) {
      setErrorText("Valij en avatar");
      setErrorPopup(true);
    } else if (activeUser && !isOwner) {
      if (activeUser.email && selectedAvatar && activeUser) {
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
        dispatch(
          addProfileWithRequest({
            newProfile: newProfile,
            userMail: activeUser.email,
            householdId: householdId,
          }),
        ).then(() => {
          navigation.navigate("HouseholdAccount");
        });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  style={[styles.avatar, { backgroundColor: "lightgray" }]}
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
          {isOwner ? (
            <TouchableOpacity
              style={theme.button as any}
              onPress={() => saveProfile()}
            >
              <Text style={[theme.buttonText, { fontSize: 20 }]}>SKAPA</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={theme.button as any}
              onPress={() => saveProfile()}
            >
              <Text style={[theme.buttonText, { fontSize: 20 }]}>SKAPA</Text>
            </TouchableOpacity>
          )}
          <Button
            style={theme.button as any}
            onPress={() => navigation.navigate("HandleHousehold")}
          >
            <Text style={theme.buttonText}>Tillbaka</Text>
          </Button>
        </View>
        {errorPopup && errorText ? (
          <ErrorModule
            errorMessage={errorText}
            buttonMessage="Försök igen"
            onClose={() => setErrorPopup(false)}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
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
