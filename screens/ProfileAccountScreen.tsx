import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
// import { getProfileByHouseholdAndUser } from "../store/profile/profileSlice";

export default function ProfileAccountScreen({ navigation }: any) {
  //du måste kolla getActiveHousehold från householdreducern
  //då har du ett household som du är inne på
  //då hämtar du getProfileForHousehold(userId, householdId);
  //dessa får komma in när det finns att hämta i reducerns state
  const userId = "5NCx5MKcUu6UYKjFqRkg";

  // const householdId = "household1";

  const [selectedAvatar] = useState<string>("");

  // const householdId = "fYHVLNiQvWEG9KNUGqBT"; // kommenterade ut denna, bara denna som jag inte satt tillbaka
  const activeHousehold = useAppSelector(
    (state) => state.household.activehousehold,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeHousehold) {
      dispatch(
        setProfileByHouseholdAndUser({
          userId: userId,
          householdId: activeHousehold?.id,
        }),
      );
    }
  }, [activeHousehold]);

  const activeProfiles = useAppSelector((state) =>
    state.profile.profiles.filter(
      (profile) => profile.householdId === activeHousehold?.id,
    ),
  );

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
    if (activeProfile) {
      const household = households.find(
        (h) => h.id === activeProfile.householdId,
      );
      if (household) {
        setHeaderTitle(household.name);
      }
      dispatch(fetchTasks(activeProfile.householdId));
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
    <View style={styles.container}>
      <View
        style={[
          styles.profileTitleContainer,
          { backgroundColor: activeProfile?.avatar },
        ]}
      >
        {/* <Text style={styles.profileTitle}>{}</Text> */}
        <Text>Profilnamn: {activeProfile?.profileName}</Text>
      </View>
      <Text>Avatar: {activeProfile?.avatar}</Text>
      <View style={{ marginTop: 50 }}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Tab", { name: headerTitle })}
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
              <Text variant="titleLarge">Hushållets namn</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "white",
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
