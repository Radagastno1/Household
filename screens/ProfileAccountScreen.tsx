import React, { useEffect, useState } from "react";
import {useColorScheme } from "react-native";
import { StyleSheet, View, Image, Modal } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import HouseholdProfileModal from "../modules/HouseholdMemberModal";
import {
  deactivateProfileAsync,
  editProfileName,
} from "../store/profile/profileSlice";

import { AvatarUrls, Avatars } from "../data/avatars";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { editHouseHoldeName } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchTasks } from "../store/tasks/taskSlice";

import { setStatusBarBackgroundColor } from "expo-status-bar";
import { hide } from "expo-splash-screen";
import RequestModule from "../modules/RequestModule";

// import { getProfileByHouseholdAndUser } from "../store/profile/profileSlice";

type ProfileProps = RootNavigationScreenProps<"ProfileAccount">;

export default function ProfileAccountScreen({ navigation }: ProfileProps) {
  //du måste kolla getActiveHousehold från householdreducern
  //då har du ett household som du är inne på
  //då hämtar du getProfileForHousehold(userId, householdId);
  //dessa får komma in när det finns att hämta i reducerns state
  //UTKOMMENTERAR DENNA:
  // const userId = "5NCx5MKcUu6UYKjFqRkg";

  const [selectedAvatar] = useState<string>("");
  const [isRequestPending, setRequestPending] = useState(false);

  //  -------------- det aktiva hushållet är rätt här men viewn hinner renderas innan denna körs liksom -----------------------------
  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );
  console.log("aktiva hushållet: ", activeHousehold);

  // const householdId = "fYHVLNiQvWEG9KNUGqBT"; // kommenterade ut denna, bara denna som jag inte satt tillbaka

  const dispatch = useAppDispatch();
  const activeHouseholdCode = activeHousehold?.code || "Ingen kod tillgänglig";

  const requests = useAppSelector((state) => state.request.requests);
  const requestsForThisHousehold = requests.filter((request) => request.householdId === activeHousehold?.id);
  
  //UTKOMMENTERAR DENNA:
  // useEffect(() => {
  //   if (activeHousehold) {
  //     dispatch(
  //       setProfileByHouseholdAndUser({
  //         userId: userId,
  //         householdId: activeHousehold?.id,
  //       }),
  //     );
  //   }
  // }, [activeHousehold]);

  //UTKOMMENTERAR DENNA:
  // const activeProfiles = useAppSelector((state) =>
  //   state.profile.profiles.filter(
  //     (profile) => profile.householdId === activeHousehold?.id,
  //   ),
  // );

  const activeProfiles = useAppSelector((state) => state.profile.profiles);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [isViewingRequest, setIsViewingRequest] = useState(false);

  const [updatedProfileName, setUpdatedProfilename] = useState(
    activeProfile?.profileName,
  );

  const [updatedHouseholdName, setUpdatedHouseholdname] = useState(
    activeProfile?.profileName,
  );

  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const [headerTitle, setHeaderTitle] = useState<string>(
    activeHousehold?.name ?? "",
  );
  const households = useAppSelector((state) => state.household.households);
  useEffect(() => {
    if (activeProfile && activeHousehold) {
      const household = households.find(
        (h) => h.id === activeProfile.householdId,
      );
      if (household) {
        setHeaderTitle(household.name);
      }
      console.log("aktiva hushållsid:", activeHousehold.id);
      console.log("aktiva profilid:", activeProfile.id);
      dispatch(fetchTasks(activeHousehold?.id));
    }
  }, [activeProfile]);

  useEffect(() => {
    if (activeProfile) {
      setUpdatedProfilename(activeProfile.profileName);
      setUpdatedHouseholdname(activeHousehold?.name);
    }
  }, [activeProfile]);

  const handleSaveClick = () => {
    if (activeProfile) {
      dispatch(
        editProfileName({
          profileId: activeProfile?.id,
          newProfileName: updatedProfileName ?? activeProfile.profileName,
        }),
      );
      setIsEditing(false);
      console.log("NYA PROFILNAMNET", { updatedProfileName });
    }
  };

  const handleHouseholdSaveClick = async () => {
    if (activeHousehold) {
      dispatch(
        editHouseHoldeName({
          householdId: activeHousehold.id,
          newHouseholdName: updatedHouseholdName ?? activeHousehold.name,
        }),
      );
      setIsEditing(false);
      console.log("NYA PROFILNAMNET", { updatedHouseholdName });
    }
  };
  const handleLeaveHouseholdClick = () => {
    if (activeProfile) {
      const householdId = activeProfile.householdId;
      const userId = activeProfile.userId;
      const profileName = activeProfile.profileName;

      // Dispatch the deactivateProfile action to update the profile in the database.
      dispatch(deactivateProfileAsync(activeProfile.id)).then((action) => {
        if (deactivateProfileAsync.fulfilled.match(action)) {
          // After deactivation, log the userId, householdId, profileName, and navigate to "HouseholdAccount."
          console.log(
            `UserId: ${userId} has now left the household with householdId: ${householdId}. Profile Name: ${profileName}`,
          );
          navigation.navigate("HouseholdAccount");
        } else {
          // Handle the case where deactivation was not successful, e.g., show an error message.
          console.error("Failed to deactivate profile.");
        }
      });
    }
  };

  function handleRequest() {
    setIsViewingRequest(!isViewingRequest);
    console.log(isViewingRequest);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View
          style={[
            styles.profileTitleContainer,
            { backgroundColor: activeProfile?.avatar },
          ]}
        >
          {/* <Text style={styles.profileTitle}>{}</Text> */}
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: colorScheme === "dark" ? "gray" : theme.colors.text,
            }}
          >
            Profilnamn: {activeProfile?.profileName}
          </Text>
        </View>

        <Image
          source={{ uri: AvatarUrls[activeProfile?.avatar as Avatars] }}
          style={{ height: 20, width: 20 }}
        />
        <View style={{ marginTop: 50 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Tab")}
            style={theme.button as any}
            labelStyle={theme.buttonText}
          >
            Hushållsysslor
          </Button>
          <Card style={styles.card}>
            <View style={styles.taskItem}>
              <View style={styles.nameContainer}>
                {isEditing ? (
                  <TextInput
                    placeholder={activeProfile?.profileName}
                    onChangeText={(text) => {
                      setUpdatedProfilename(text);
                    }}
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                    }}
                  />
                ) : (
                  <Text
                  >
                    {activeProfile?.profileName}
                  </Text>
                )}
              </View>

              <IconButton
                icon="pencil"
                size={20}
                onPress={() => {
                  setIsEditing(true);
                }}
              />
            </View>
          </Card>

          {isEditing ? <Button onPress={handleSaveClick}>Spara</Button> : null}

          <Card style={styles.card}>
            <View style={styles.taskItem}>
              <View style={styles.nameContainer}>
                {isEditing ? (
                  <TextInput
                    placeholder={activeHousehold?.name}
                    onChangeText={(text) => {
                      setUpdatedHouseholdname(text);
                    }}
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                    }}
                  />
                ) : (
                  <Text
                  >
                    {activeHousehold?.name}
                  </Text>
                )}
              </View>
              {/* <View style={styles.nameContainer}>
                {/* tog headertitle som du satt till hushållsnamnet för att testa så det funkar */}
              {/* <Text variant="titleLarge">{headerTitle}</Text>
              </View>  */}

              {/* <IconButton
                icon="pencil"
                size={20}
                onPress={() => {
                  setIsEditing(true);
                }}
              /> */}


              {/* <IconButton icon="pencil" size={20} onPress={() => {}} /> */}
            </View>
          </Card>

          {isEditing ? (
            <Button onPress={handleHouseholdSaveClick}>Spara</Button>
          ) : null}

          <Card style={styles.card} onPress={() => setModalVisible(true)}>
            <View style={styles.taskItem}>
              <View style={styles.nameContainer}>
                <Text variant="titleLarge">Medlemmar</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={styles.taskItem}>
              <View style={styles.nameContainer}>
                <Text variant="titleLarge">
                  Hushållskod: {activeHouseholdCode}
                </Text>
              </View>
            </View>
          </Card>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("HouseholdAccount")}
            style={theme.button as any}
            labelStyle={theme.buttonText}
          >
            Mina hushåll
          </Button>

          <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"center",  width: 360}}>
          <Button
            mode="contained"
            onPress={handleLeaveHouseholdClick}
            style={styles.buttonColor}
            labelStyle={theme.buttonText}
          >
            Gå ur hushåll
          </Button>

          {requestsForThisHousehold.length > 0 && activeProfile?.isOwner && (
            <View style={styles.bell}>
                <IconButton
                  icon="bell-alert-outline"
                  size={32}
                  onPress={handleRequest}
                />
                </View>
              )}
          </View>

    
          <HouseholdProfileModal
            visible={isModalVisible}
            onDismiss={() => setModalVisible(false)}
            householdName={activeHousehold?.name || "Laddar..."}
            profiles={activeProfiles}
            selectedAvatar={selectedAvatar}
          />
          <RequestModule
            visible={isViewingRequest}
            onDismiss={() => setIsViewingRequest(false)}
            householdName={activeHousehold?.name || "Laddar..."}
            // selectedAvatar="Frog"
            // email="test@mail.com"
            requests={requestsForThisHousehold}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTitleContainer: {
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: 390,
  },
  profileTitle: {
    fontSize: 25,
    textAlign: "center",
    color: "black",
  },
  card: {
    margin: 10,
    width: 360,
    height: 65,
    padding: 15,
    borderRadius: 8,
    // backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  buttonColor: {
    backgroundColor: "orange",
    marginTop: 70,
    width: 200,
  },
  bell:{
    marginTop: 70,
    alignItems:"flex-end"
  }
});
