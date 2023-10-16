import {  Image, ScrollView } from "react-native";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { profiles, tasks } from "../data/index";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { households } from "../data";
import { useAppDispatch, useAppSelector } from "../store/store";
import { filterTaskListByHouseId } from "../store/tasks/taskSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg

export default function HouseholdTasksScreen({ navigation }: any) {
  const [profileId, setProfileId] = useState("profile6");
  // Use useSelector to access the profiles
  const profile = profiles.find((p) => p.id == profileId);
  const household = households.find((h) => h.id == profile?.householdId);
  const taskSlice = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const isOwner = profile?.isOwner;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    if (profile && household) {
      dispatch(filterTaskListByHouseId({ tasks, household_Id: household?.id }));
    }}
  }, [dispatch, isFocused,]);



  const handleTaskPress = (taskId:string) => {
    navigation.navigate('ShowTask', { taskId });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.customHeader}>
        {/* <Appbar.BackAction onPress={_backHome} /> */}
        <View style={styles.title}>
          <Appbar.Content title={household?.name} />
        </View>
        <View style={styles.imageContainer}>
          <Appbar.Action
            icon={({ size, color }) => (
              <Image
                source={require("../assets/bee-home.png")}
                style={styles.beeHomeImage}
              />
            )}
            onPress={() => navigation.navigate("HouseholdAccount")}
          />
        </View>
      </Appbar.Header>
      <ScrollView
        style={
          isOwner ? styles.scrollContainerOwner : styles.scrollContainerNonOwner
        }
      >
        {taskSlice.tasks.map((task) => (
          <Card 
          key={task.id} 
          style={styles.card}
          onPress={()=>handleTaskPress(task.id)}
          >
            <View style={styles.taskItem}>
              <View>
                <Text variant="titleLarge">{task.title}</Text>
              </View>
              <View>
                <Text variant="bodyMedium">avatarer1</Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.card}>
          <View style={styles.taskItem}>
            <View>
              <Text variant="titleLarge">test</Text>
            </View>
            <View>
              <Text variant="bodyMedium">avatarer1</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.card}>
          <View style={styles.taskItem}>
            <View>
              <Text variant="titleLarge">test</Text>
            </View>
            <View>
              <Text variant="bodyMedium">avatarer1</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {isOwner && (
          <Button
            icon={({ size, color }) => (
              <AntDesign name="pluscircleo" size={20} color="black" />
            )}
            mode="outlined"
            onPress={() => navigation.navigate("HandleTask")}
            style={styles.button}
          >
            Lägg Till
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    height: 50,
  },
  title: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  imageContainer: {
    marginBottom: 10,
  },
  scrollContainerNonOwner: {
    flex: 1,
    maxHeight: "100%", // Max height for non-owners
  },
  scrollContainerOwner: {
    flex: 1,
    maxHeight: "80%",
  },
  
  beeHomeImage: {
    width: 20,
    height: 30,
  },
  card: {
    margin: 16,
    padding: 16,
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
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
  },
  button: {
    height: 40,
    width: 120,
    borderColor: "black",
    backgroundColor: "white",
  },
});
