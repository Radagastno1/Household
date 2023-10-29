import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { AvatarUrls, Avatars } from "../data/avatars";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addCompletionAsync } from "../store/taskCompletion/taskCompletionSlice";
import { findTaskById } from "../store/tasks/taskSlice";
import { TaskCompletion } from "../types";

type TaskDetailProps = RootNavigationScreenProps<"TaskDetail">;
export default function TaskDetailScreen({
  navigation,
  route,
}: TaskDetailProps) {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const { taskId } = route.params;
  const [avatar, setAvatars] = useState<string[]>([]);
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );
  const isOwner = activeProfile?.isOwner;
  const taskSlice = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const taskCompletionSlice = useAppSelector((state) => state.taskCompletion);
  const profiles = useAppSelector((state) => state.profile.profiles);
  //   const fetchAvatars = () => {
  //     dispatch(findAllAvatarFortodayCompletionByTaskId({ taskId }));

  //   };

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
    // profiles corresponding to the unique profileIds----------need to fetch from db
    const profilesForTask = profiles.filter((profile) =>
      uniqueProfileIds.includes(profile.id),
    );
    const avatarList = profilesForTask.map((profile) => profile.avatar);
    setAvatars(avatarList);
    return avatarList;
  }

  useEffect(() => {
    if (taskId) {
      dispatch(findTaskById({ taskId }));
      setAvatars(findAllAvatarFortodayCompletionByTaskId(taskId));
    }
  }, [dispatch, taskId]);

  const handleTaskCompletion = async (taskId: string, householdId: string) => {
    console.log("aktivs", activeProfile);
    if (taskId && activeProfile) {
      const newTaskCompletion: TaskCompletion = {
        id: "",
        taskId: taskId,
        householdId: householdId,
        profileId: activeProfile.id,
        completionDate: new Date().toISOString(),
      };
      dispatch(addCompletionAsync(newTaskCompletion));
      if (activeProfile?.avatar) {
        setAvatars([...avatar, activeProfile.avatar]);
      }
    } else {
      console.error("Task ID or profile ID is undefined.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <View
              style={[
                styles.taskItem,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "white"
                      : theme.cardButton.backgroundColor,
                },
              ]}
            >
              <View style={styles.titleContainer}>
                <Text variant="titleLarge">
                  {taskSlice.selectedTask?.title}
                </Text>
              </View>
              <View>
                {isOwner && (
                  <Button
                    icon={({ size, color }) => (
                      <MaterialIcons name="edit" size={24} color="black" />
                    )}
                    mode="elevated"
                    onPress={() =>
                      navigation.navigate("HandleTask", { taskId: taskId })
                    }
                    style={[
                      styles.changeButton,
                      {
                        backgroundColor:
                          colorScheme === "dark" ? "gray" : "gray",
                      },
                    ]}
                  >
                    Ändra
                  </Button>

                  // <Button
                  //   icon={({ size, color }) => (
                  //     <MaterialIcons name="edit" size={24} color="black" />
                  //   )}
                  //   mode="elevated"
                  //   onPress={() =>
                  //     navigation.navigate("HandleTask", { taskId: taskId })
                  //   }
                  //   style={styles.changeButton}
                  // >
                  //   Ändra
                  // </Button>
                )}
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.descriptionContainer}>
          <Text variant="bodyMedium">
            {taskSlice.selectedTask?.description}
          </Text>
        </View>

        <View style={styles.intervalValueContainer}>
          <View style={styles.intervalContainer}>
            <View>
              <Text style={styles.intervalText}>Återcommande</Text>
            </View>
            <View style={styles.circle}>
              <Text
                style={[
                  styles.intervalNumber,
                  {
                    color: colorScheme === "dark" ? "black" : "black",
                  },
                ]}
              >
                {taskSlice.selectedTask?.interval}
              </Text>
            </View>

            {/* <View style={styles.circle}>
            <Text style={styles.intervalNumber}>
              {taskSlice.selectedTask?.interval}
            </Text>
          </View> */}
          </View>

          <View style={styles.valueContainer}>
            <View>
              <Text style={styles.valueText}>Värde</Text>
            </View>
            <View style={styles.circle}>
              <Text
                style={[
                  styles.valueNumber,
                  {
                    color: colorScheme === "dark" ? "black" : "black",
                  },
                ]}
              >
                {taskSlice.selectedTask?.energyWeight}
              </Text>
            </View>

            {/* <View style={styles.circle}>
            <Text style={styles.valueNumber}>
              {taskSlice.selectedTask?.energyWeight}
            </Text>
          </View> */}
          </View>
        </View>

        <View>
          <View style={styles.avatarContainer}>
            {avatar.map((avatar, index) => (
              <View key={index} style={styles.avatarText}>
                <Image
                  source={{ uri: AvatarUrls[avatar as Avatars] }}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.klarButtonContainer}>
          <Button
            mode="text"
            onPress={() => {
              handleTaskCompletion(taskId, activeHousehold?.id ?? "");
            }}
            style={[styles.klarButton, theme.button]}
          >
            <Text style={[styles.klarButton, theme.buttonText]}>Klar</Text>
          </Button>
          <Button mode="text" onPress={() => navigation.navigate("Tab")}>
            <Text style={[styles.klarButton, theme.buttonText]}>
              Till Tasks
            </Text>
          </Button>
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
  cardContainer: {
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
  card: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
  },

  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    padding: 10,
  },
  descriptionContainer: {
    flex: 1,
  },

  intervalValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  intervalContainer: {
    marginRight: 20,
    alignItems: "center",
  },
  intervalText: {},
  intervalNumber: {},
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  valueContainer: {
    marginLeft: 20,
    alignItems: "center",
  },
  valueText: {},
  valueNumber: {},
  avatarContainer: {
    marginBottom: 50,
    flexDirection: "row",
  },
  avatarText: {
    marginRight: 10,
    textAlign: "left",
  },
  changeButton: {
    height: 40,
    width: 100,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    margin: 10,
  },
  klarButtonContainer: {
    // marginBottom:40,
    flex: 1,
  },
  klarButton: {},
});
