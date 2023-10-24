import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { households, profiles } from "../data";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchCompletions } from "../store/taskCompletionSlice";
import { fetchTasks, filterTaskListByHouseId } from "../store/tasks/taskSlice";
import { Task } from "../types";
import { useTheme } from "../contexts/themeContext";
import { AvatarUrls, Avatars } from "../data/avatars";
import { TopTabScreenProps } from "../navigators/navigationTypes";
import { useColorScheme } from "react-native";

type HouseholdTasksProps = TopTabScreenProps<"HouseholdTasks">;

export default function HouseholdTasksScreen({
  navigation,
}: HouseholdTasksProps) {
  // function resetAvatars(dispatch: Dispatch) {
  //     // Clear the avatars data, set it to an empty array or an initial value
  //     // For example:
  //     dispatch(setAvatars([]));
  //   }

  //   function scheduleMidnightReset(dispatch: Dispatch) {
  //     const now = new Date();
  //     const midnight = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate() + 1, // Tomorrow at midnight
  //       0, // Hours
  //       0, // Minutes
  //       0 // Seconds
  //     );
  //     const timeUntilMidnight = midnight.getTime() - now.getTime();

  //     setTimeout(() => {
  //       resetAvatars(dispatch);
  //       scheduleMidnightReset(dispatch); // Reschedule for the next day
  //     }, timeUntilMidnight);
  //   }

  //   // Call this function to start the schedule
  //   scheduleMidnightReset(dispatch); //
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );

  // Use useSelector to access the profiles
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  // const household = households.find((h) => h.id === activeProfile?.householdId);
  const taskSlice = useAppSelector((state) => state.task);
  const taskCompletionSlice = useAppSelector((state) => state.taskCompletion);
  const dispatch = useAppDispatch();

  const isOwner = activeProfile?.isOwner;

  useFocusEffect(
    useCallback(() => {
      if (activeProfile && activeHousehold) {
        dispatch(
          filterTaskListByHouseId({
            household_Id: activeHousehold?.id,
          }),
        );
        //TINA HERE: THIS DISPATCH MUST HAPPEND EVERY TIME WE GO TO THIS SCREEN
        //this one fetches the tasks from the database and put it in the state "tasks"
        dispatch(fetchTasks(activeProfile.householdId));
      }
    }, [dispatch]),
  );

  const handleTaskPress = (taskId: string) => {
    navigation.navigate("TaskDetail", { taskId });
  };

  function findAllAvatarFortodayCompletionByTaskId(taskId: string) {
    const today = new Date().toISOString();
    //filter the completions with the same taskId---------can be moved out and share with getdays function
    const filteredTodaysCompletionsForTask =
      taskCompletionSlice.completions.filter(
        (completion: any) =>
          completion.completionDate.split("T")[0] === today.split("T")[0] &&
          completion.taskId === taskId,
      );
    // get the unique profileIds
    const uniqueProfileIds = [
      ...new Set(
        filteredTodaysCompletionsForTask?.map(
          (completion: any) => completion.profileId,
        ),
      ),
    ];
    console.log(uniqueProfileIds);
    // profiles corresponding to the unique profileIds------------need to fetch from db
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

    const filteredTodaysCompletionsForTask =
      taskCompletionSlice.completions.filter(
        (completion) =>
          completion.taskId === task.id &&
          completion.completionDate.split("T")[0] === today.split("T")[0],
      );

    if (filteredTodaysCompletionsForTask.length === 0) {
      //if it is empty, no one did it today
      lastCompletionDate = new Date(task.creatingDate);
    } else {
      //get the latest date it was done
      lastCompletionDate = new Date(
        filteredTodaysCompletionsForTask.slice().sort((a, b) => {
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
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <ScrollView
          style={
            isOwner
              ? styles.scrollContainerOwner
              : styles.scrollContainerNonOwner
          }
        >
          {taskSlice.filteredTasks.map((task) => (
            <Card
              key={task.id}
              style={[
                styles.card,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "white"
                      : theme.cardButton.backgroundColor,
                },
              ]}
              onPress={() => handleTaskPress(task.id)}
            >
              {/* {taskSlice.filteredTasks.map((task) => (
          <Card
            key={task.id}
            style={styles.card}
            onPress={() => handleTaskPress(task.id)}
          > */}
              <View style={styles.taskItem}>
                <View>
                  <Text
                    variant="titleLarge"
                    style={{
                      color:
                        colorScheme === "dark"
                          ? "white"
                          : theme.buttonText.color,
                    }}
                  >
                    {task.title}
                  </Text>
                </View>
                {/* <View style={styles.taskItem}>
              <View>
                <Text variant="titleLarge">{task.title}</Text>
              </View> */}

                {findAllAvatarFortodayCompletionByTaskId(task.id).map(
                  (avatar, index) => (
                    <View key={index}>
                      <Image
                        source={{ uri: AvatarUrls[avatar as Avatars] }}
                        style={{ height: 20, width: 20 }}
                      />
                    </View>
                  ),
                )}

                {getDaysSinceLastCompletion(task) > 0 && (
                  <View
                    style={[
                      styles.intervalNumberCircle,
                      {
                        backgroundColor:
                          getDaysSinceLastCompletion(task) < task.interval
                            ? "lightgrey"
                            : "red",
                      },
                    ]}
                  >
                    {getDaysSinceLastCompletion(task) > 30 ? (
                      <Text style={styles.circleText} variant="bodyMedium">
                        30+
                      </Text>
                    ) : (
                      <Text style={styles.circleText} variant="bodyMedium">
                        {getDaysSinceLastCompletion(task)}
                      </Text>
                    )}
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
        </ScrollView>

        <View style={styles.buttonContainer}>
          {/* {isOwner && ( */}
            <Button
              icon={({ size, color }) => (
                <AntDesign name="pluscircleo" size={20} color="black" />
              )}
              mode="outlined"
              onPress={() => navigation.navigate("HandleTask", { taskId: "0" })}
              style={[
                styles.button,
                {
                  backgroundColor:  colorScheme === "dark"
                  ? "white"
                  : theme.cardButton.backgroundColor,
                },
              ]}
            >
              Lägg Till
            </Button>
          {/* )} */}
        </View>

        {/* <View style={styles.buttonContainer}>
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
      </View> */}
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
    bottom: 20,
    right: 20,
    margin: 16,
  },
  button: {
    height: 40,
    width: 120,
    borderColor: "black",
    backgroundColor: "white",
  },
});
