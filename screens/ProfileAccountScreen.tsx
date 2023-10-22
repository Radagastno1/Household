import React, { useEffect, useState } from "react";
import { StyleSheet, View,Image } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { households } from "../data";
import HouseholdProfileModal from "../modules/HouseholdMemberModal";
import {
  editProfileName,
  setProfileByHouseholdAndUser,
} from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchTasks } from "../store/tasks/taskSlice";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { AvatarUrls, Avatars } from "../data/avatars";
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

  // const householdId = "fYHVLNiQvWEG9KNUGqBT"; // kommenterade ut denna, bara denna som jag inte satt tillbaka
  const activeHousehold = useAppSelector(
    (state) => state.household.activehousehold,
  );
  const dispatch = useAppDispatch();

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
  const [updatedProfileName, setUpdatedProfilename] = useState(
    activeProfile?.profileName,
  );

  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<string>(
    activeHousehold?.name ?? "",
  );

  useEffect(() => {
    if (activeProfile && activeHousehold) {
      const household = households.find(
        (h) => h.id === activeProfile.householdId,
      );
      if (household) {
        setHeaderTitle(household.name);
      }
      console.log("aktiva hushållsid:", activeHousehold.id);
      dispatch(fetchTasks(activeHousehold?.id));
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
    }
  };

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
            color: theme.colors.text,
          }}
        >
          Profilnamn: {activeProfile?.profileName}
        </Text>
      </View>
      <Text style={{ color: theme.colors.text }}>
  Avatar: {activeProfile?.avatar}
</Text>
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
                />
              ) : (
                <Text style={styles.profileTitle}>
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
              {/* tog headertitle som du satt till hushållsnamnet för att testa så det funkar */}
              <Text variant="titleLarge">{headerTitle}</Text>
            </View>
            <IconButton icon="pencil" size={20} onPress={() => {}} />
          </View>
        </Card>

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
              <Text variant="titleLarge">Hushållskod</Text>
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
        <Button
          mode="contained"
          onPress={() => navigation.navigate("HouseholdAccount")}
          style={styles.buttonColor}
          labelStyle={theme.buttonText}
        >
          Gå ur hushåll
        </Button>
        <HouseholdProfileModal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
          householdName={activeHousehold?.name || "Laddar..."}
          profiles={activeProfiles}
          selectedAvatar={selectedAvatar}
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
});
