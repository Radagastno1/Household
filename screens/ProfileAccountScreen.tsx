import { View, StyleSheet, StatusBar } from "react-native";
import React, { useEffect } from "react";
import {  useAppDispatch, useAppSelector } from "../store/store";
import {  Card, Text, Button, IconButton, TextInput } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import HouseholdProfileModal from "../modules/HouseholdMemberModal";
import { useState } from "react";
import { setProfileByHouseholdAndUser, editProfileName } from "../store/profile/profileSlice";
import { households } from "../data";
// import { getProfileByHouseholdAndUser } from "../store/profile/profileSlice";


export default function ProfileAccountScreen({ navigation }: any) {
  //du måste kolla getActiveHousehold från householdreducern
  //då har du ett household som du är inne på
  //då hämtar du getProfileForHousehold(userId, householdId);
  //dessa får komma in när det finns att hämta i reducerns state
  const userId = "user1";
  const householdId = "household1";
  const dispatch = useAppDispatch();
  dispatch(setProfileByHouseholdAndUser({userId:userId, householdId:householdId}))
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfileName, setUpdatedProfilename] = useState(activeProfile?.profileName);

  
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<string>("TinaHome");
  useEffect(() => {
    if (activeProfile) {
      const household = households.find((h) => h.id === activeProfile.householdId);
      if (household) {
        setHeaderTitle(household.name);
      }
    }
  }, [activeProfile]);

  const handleSaveClick = () => {
    if(activeProfile){
      dispatch(editProfileName({ profileId: activeProfile?.id, newProfileName: updatedProfileName ?? activeProfile.profileName }));
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.profileTitleContainer,
          { backgroundColor: activeProfile?.avatar},
        ]}
      >
        <Text style={styles.profileTitle}>{}</Text>
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
                <TextInput placeholder={activeProfile?.profileName}
                onChangeText={ (text) => {setUpdatedProfilename(text)}}/>
              ) : (
                    <Text  style={styles.profileTitle}>{activeProfile?.profileName}</Text>
              )}
            </View>
            <IconButton icon="pencil" size={20} onPress={() => {setIsEditing(true)}} />
          </View>
        </Card>
        
        {isEditing ? (
        <Button onPress={handleSaveClick}>Spara</Button>
        ) : (null)}

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
          householdName="Hushållets namn"
          avatars={["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"]}
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
