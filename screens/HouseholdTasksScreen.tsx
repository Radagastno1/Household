import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { households, profiles, taskCompletions } from "../data";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchTasks, filterTaskListByHouseId } from "../store/tasks/taskSlice";
import { Task } from "../types";
import { findAllAvatarFortodayCompletionByTaskId } from "../store/taskCompletionSlice";

// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg

export default function HouseholdTasksScreen({ navigation }: any) {

  const activeHousehold = useAppSelector(
    (state) => state.household.activehousehold,
  );
  // Use useSelector to access the profiles
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const household = households.find((h) => h.id === activeProfile?.householdId);
  const taskSlice = useAppSelector((state) => state.task);
  const taskCompletionSlice = useAppSelector((state) => state.taskCompletion);
  const dispatch = useAppDispatch();

  const isOwner = activeProfile?.isOwner;


  useFocusEffect(
    useCallback(() => {
      console.log("fokuserad");
      if (activeProfile && household) {
        dispatch(
          filterTaskListByHouseId({
            household_Id: household?.id,
          }),
        );
        //TINA HERE: THIS DISPATCH MUST HAPPEND EVERY TIME WE GO TO THIS SCREEN
        if (activeHousehold) {
          dispatch(fetchTasks(activeHousehold?.id));
        }
      }
    }, [dispatch]),
  );

  const handleTaskPress = (taskId: string) => {
    navigation.navigate("ShowTask", { taskId });
  };

  function findAllAvatarFortodayCompletionByTaskId(taskId: string) {
    const today = new Date().toISOString();
    //filter the completions with the same taskId---------can be moved out and share with getdays function
    const filteredTodaysCompletionsFotTask = taskCompletions.filter(
      (completion) =>
        completion.completionDate.split("T")[0] === today.split("T")[0] &&
        completion.taskId === taskId,
    );
    // get the unique profileIds
    const uniqueProfileIds = [
      ...new Set(
        filteredTodaysCompletionsFotTask?.map((completion) => completion.profileId),
      ),
    ];
    console.log(uniqueProfileIds);
    // profiles corresponding to the unique profileIds
    const profilesForTask = profiles.filter((profile) =>
      uniqueProfileIds.includes(profile.id),
    );

    const avatarList = profilesForTask.map((profile) => profile.avatar);
    return avatarList;
  }

  function getDaysSinceLastCompletion(task: Task) {
    let lastCompletionDate: Date;
    const today = new Date().toISOString();
    //all todays taskcompletions for task ---------can be moved out and share with getAvatar function
    const filteredTodaysCompletionsFotTask = taskCompletionSlice.completions.filter(
      (completion) =>
        completion.taskId === task.id &&
        completion.completionDate.split("T")[0] === today.split("T")[0],
    );

    if (filteredTodaysCompletionsFotTask.length === 0) {
      //if it is empty, no one did it today
      lastCompletionDate = new Date(task.creatingDate);
    } else {
      //get the latest date it was done
      lastCompletionDate = new Date(
        filteredTodaysCompletionsFotTask.slice().sort((a, b) => {
          return (
            new Date(b.completionDate).getTime() -
            new Date(a.completionDate).getTime()
          );
        })[0].completionDate,
      );
    }
    // get the timeDifference since last done date
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastCompletionDate.getTime();
    //convert it to days minus the interval days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))-task.interval;
    return daysDifference;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={
          isOwner ? styles.scrollContainerOwner : styles.scrollContainerNonOwner
        }
      >
        {taskSlice.filteredTasks.map((task) => (
          <Card
            key={task.id}
            style={styles.card}
            onPress={() => handleTaskPress(task.id)}
          >
            <View style={styles.taskItem}>
              <View>
                <Text variant="titleLarge">{task.title}</Text>
              </View>

              {findAllAvatarFortodayCompletionByTaskId(task.id).map(
                (avatar, index) => (
                  <View>
                    <Text key={index} variant="bodyMedium">
                      {avatar}
                    </Text>
                  </View>
                ),
              )}
              {getDaysSinceLastCompletion(task) > 0 && (
                <View style={styles.intervalNumberCircle}>
                  <Text style={styles.circleText} variant="bodyMedium">
                    {getDaysSinceLastCompletion(task)}
                  </Text>
                </View>
              )}
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
            onPress={() => navigation.navigate("HandleTask", { taskId: "0" })}
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
  intervalNumberCircle: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "white",
    fontSize: 16,
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
