import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import HouseholdProfileModal from "../modules/HouseholdMemberModal";
import {
  deactivateProfileAsync,
  editProfile,
  editProfileAsync,
  editProfileName,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";

import { AvatarUrls, Avatars } from "../data/avatars";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { editHouseHoldAsync, editHouseHoldeName, setActiveHouseholdAsync, updateHousehold } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchTasks } from "../store/tasks/taskSlice";
import { useFocusEffect } from "@react-navigation/native";
import RequestModule from "../modules/RequestModule";
import {
  acceptProfileToHouseholdAsync,
  denyProfileToHouseholdAsync,
} from "../store/request/requestSlice";
import { HouseholdRequest } from "../types";
import { getHouseholdsFromDBbyProfileId, getHouseholdsFromDBbySingleProfileId } from "../api/household";
import { updateProfile } from "firebase/auth";

// import { getProfileByHouseholdAndUser } from "../store/profile/profileSlice";

type ProfileProps = RootNavigationScreenProps<"ProfileAccount">;

export default function ProfileAccountScreen({ navigation }: ProfileProps) {
  const [selectedAvatar] = useState<string>("");
  const [isRequestPending, setRequestPending] = useState(false);
  const [householdRequests, setHouseholdRequests] = useState<
    HouseholdRequest[]
  >([]);

  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );

  const dispatch = useAppDispatch();
  const activeHouseholdCode = activeHousehold?.code || "Ingen kod tillgänglig";

  const activeProfiles = useAppSelector((state) => state.profile.profiles);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const requests = useAppSelector((state) => state.request.requests);

  const [isProfileNameEditing, setIsProfileNameEditing] = useState(false);
  const [isHousehouldNameEditing, setIsHousehouldNameEditing] = useState(false);
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
      dispatch(fetchTasks(activeHousehold?.id));
    }
  }, [activeProfile]);

  useFocusEffect(
    useCallback(() => {
      if (requests) {
        const requestsForThisHousehold = requests.filter(
          (request) => request.householdId === activeHousehold?.id,
        );
        if (requestsForThisHousehold) {
          setHouseholdRequests(requestsForThisHousehold);
        }
      }
    }, []),
  );

  useEffect(() => {
    if (activeProfile) {
      setUpdatedProfilename(activeProfile.profileName);
      setUpdatedHouseholdname(activeHousehold?.name);
    }
  }, [activeProfile]);

//   const handleSaveClick = () => {
//     if (activeProfile) {
//       dispatch(
//         editProfileName({
//           profileId: activeProfile?.id,
//           newProfileName: updatedProfileName ?? activeProfile.profileName,
//         }),
//       );
    
    
//       setIsProfileNameEditing(false);
//       console.log("NYA PROFILNAMNET", { updatedProfileName });
//     }
//   };

const handleSaveClick = () => {
    if (activeProfile) {
        const editedProfile ={
            id: activeProfile.id,
            profileName:updatedProfileName ?? activeProfile.profileName,
            userId: activeProfile.userId,
            householdId: activeProfile.householdId,
            avatar: activeProfile.avatar,
            isOwner: activeProfile.isOwner,
            isActive:activeProfile.isActive,
        };
      dispatch(
       editProfileAsync( editedProfile),
      );
    
    dispatch(editProfile(editedProfile));
      setIsProfileNameEditing(false);
      console.log("NYA PROFILNAMNET", { updatedProfileName });
    }
  };

  const acceptRequest = (requestId: string) => {
    dispatch(acceptProfileToHouseholdAsync({ requestId: requestId }));
  };

  const denyRequest = (requestId: string) => {
    dispatch(denyProfileToHouseholdAsync({ requestId: requestId }));
  };

  const handleHouseholdSaveClick = async () => {
    if (activeHousehold) {
        const editedHousehold = {
            id: activeHousehold.id,
            name: updatedHouseholdName ?? activeHousehold.name,
            code:activeHousehold.code,  
        }
      dispatch(
        editHouseHoldAsync(
            editedHousehold
        ),
      );
     dispatch(updateHousehold(editedHousehold));
      setIsHousehouldNameEditing(false);
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
            `UserId: ${userId} has now left the household with householdId: ${householdId}. Is active: ${activeProfile.isActive}`,
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
        <View>
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
                {isProfileNameEditing ? (
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
                  <Text>{activeProfile?.profileName}</Text>
                )}
              </View>

              <IconButton
                icon="pencil"
                size={20}
                onPress={() => {
                  setIsProfileNameEditing(true);
                }}
              />
            </View>
          </Card>

          {isProfileNameEditing ? (
            <Button onPress={handleSaveClick}>Spara</Button>
          ) : null}

          <Card style={styles.card}>
            <View style={styles.taskItem}>
              <View style={styles.nameContainer}>
                {isHousehouldNameEditing ? (
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
                  <Text>{activeHousehold?.name}</Text>
                )}
              </View>
              {/* <View style={styles.nameContainer}>
                {/* tog headertitle som du satt till hushållsnamnet för att testa så det funkar */}
              {/* <Text variant="titleLarge">{headerTitle}</Text>
              </View>  */}
  {activeProfile?.isOwner === true && (
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => {
                    setIsHousehouldNameEditing(true);
                  }}
                />
              )}
              {/* <IconButton
                icon="pencil"
                size={20}
                onPress={() => {
                  setIsHousehouldNameEditing(true);
                }}
              /> */}

              {/* <IconButton icon="pencil" size={20} onPress={() => {}} /> */}
            </View>
          </Card>

          {isHousehouldNameEditing ? (
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems:"center",
              position: "relative",
              marginTop: 50
            }}
          >
            <Button
              mode="contained"
              onPress={handleLeaveHouseholdClick}
              style={styles.buttonColor}
              labelStyle={theme.buttonText}
            >
              Gå ur hushåll
            </Button>

            {householdRequests.length > 0 && activeProfile?.isOwner && (
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
            acceptRequest={acceptRequest}
            denyRequest={denyRequest}
            requests={householdRequests}
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
    padding: 10,
    borderRadius: 5,
    // marginBottom: 10,
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
    justifyContent: "center",
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
    marginTop: 20,
    width: 200,
    position: "absolute",
    left: 10 
  },
  bell: {
    marginTop: 20,
    alignItems: "flex-end",
    position: "absolute",
    right: 10
  },
});
