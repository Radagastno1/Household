import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity, Image, Platform, ScrollView } from "react-native";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { RootStackParamList } from "../navigators/RootNavigator";
import { View, StyleSheet } from "react-native";
import { profiles } from "../data/index";
import { Profile } from "../types";
import React, { useEffect, useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import { AntDesign } from '@expo/vector-icons';
import { households } from "../data";
import { useAppDispatch, useAppSelector } from "../store/store";
import { taskList } from "../store/tasks/taskSlice";
// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg

export default function HouseholdTasksScreen(
  { navigation }: any,
 
) {
    const [profileId, setProfileId] = useState('profile1');
    const profile = profiles.find((p)=>p.id == profileId);
     const household = households.find((h)=>h.id == profile?.householdId)
     const taskSlice = useAppSelector((state) => state.task);
     const allTasksForHousehold = taskSlice.tasks.filter(
       (t) => t.householdId === household?.id,
     );
     const dispatch = useAppDispatch();
      // Use useSelector to access the profiles in your Redux state
 

  // Find the specific profile by profileId
 

//   useEffect(() => {
//     if (profile && household) {
//       // Dispatch the taskList action to fetch tasks and update the store
//       // Replace with the actual logic to fetch tasks for the specific profile
//     //   const fetchedTasks = yourApiCallToFetchTasksForProfile(profileId);
//       dispatch(taskList(allTasksForHousehold));
//     }
//   }, [dispatch, profile, profileId]);


    //  useEffect(() => {
    //     // Dispatch the taskList action to fetch tasks and update the store
    //     // Replace with the actual logic to fetch tasks from your API or wherever
    //     const fetchedTasks = yourApiCallToFetchTasks();
    //     dispatch(taskList(fetchedTasks));
    //   }, [dispatch]);

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
      <ScrollView style={styles.scrollContainer}>
{allTasksForHousehold.map((task)=>(
    <Card style={styles.card}>
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
 </ScrollView>     
      
      
      <View style={styles.buttonContainer}>
        {/* {profile.isOwner &&( */}
       
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
        {/* )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    height: 40,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  scrollContainer: {
    // Add any styling for the ScrollView container here
    flex: 1,
  },
  imageContainer: {
    marginBottom: 20,
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
  },
});
