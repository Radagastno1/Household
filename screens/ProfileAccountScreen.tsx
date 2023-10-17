import { View, StyleSheet, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {  Card, Text, Button, IconButton } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import HouseholdProfileModal from "../modules/HouseholdMemberModal";
import { useState } from "react";
import { households } from "../data";


export default function ProfileAccountScreen({ navigation }: any) {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<string>("TinaHome");
  useEffect(() => {
    if (profile) {
      const household = households.find((h) => h.id === profile.householdId);
      if (household) {
        setHeaderTitle(household.name);
      }
    }
  }, [profile]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={profile.avatarsColors} />
      <View
        style={[
          styles.profileTitleContainer,
          { backgroundColor: profile.avatarsColors },
        ]}
      >
        <Text style={styles.profileTitle}>{}</Text>
      </View>
      <Text>Avatar: {profile.avatar}</Text>
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
              <Text style={styles.profileTitle}>{profile.profileName}</Text>
            </View>
            <IconButton icon="pencil" size={20} onPress={() => {}} />
          </View>
        </Card>

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
