import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";
import { Card, Text } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { AvatarUrls, Avatars } from "../data/avatars";
import { RootStackParamList } from "../navigators/RootNavigator";
import { TopTabParamList } from "../navigators/TopTabNavigator";
import { Profile, Task, TaskCompletion } from "../types";

type TaskCardProps = {
  completions: TaskCompletion[];
  profiles: Profile[];
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TopTabParamList, "HouseholdTasks", undefined>,
    NativeStackNavigationProp<RootStackParamList>
  >;
  task: Task;
};

export default function TaskCard({
  completions,
  profiles,
  navigation,
  task,
}: TaskCardProps) {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();
  function findAllAvatarFortodayCompletionByTaskId(taskId: string) {
    const today = new Date().toISOString();
    const filteredTodaysCompletionsForTask = completions.filter(
      (completion: TaskCompletion) =>
        completion.completionDate.split("T")[0] === today.split("T")[0] &&
        completion.taskId === taskId,
    );

    const uniqueProfileIds = [
      ...new Set(
        filteredTodaysCompletionsForTask?.map(
          (completion: any) => completion.profileId,
        ),
      ),
    ];
    console.log(uniqueProfileIds);

    const profilesForTask = profiles.filter((profile) =>
      uniqueProfileIds.includes(profile.id),
    );

    const avatarList = profilesForTask.map((profile) => profile.avatar);
    return avatarList;
  }

  function getDaysSinceLastCompletion(task: Task) {
    let lastCompletionDate: Date;
    const today = new Date().toISOString();

    const filteredTodaysCompletionsForTask = completions.filter(
      (completion: TaskCompletion) => {
        completion.taskId === task.id &&
          completion.completionDate.split("T")[0] === today.split("T")[0];
      },
    );

    if (filteredTodaysCompletionsForTask.length === 0) {
      lastCompletionDate = new Date(task.creatingDate);
    } else {
      lastCompletionDate = new Date(
        filteredTodaysCompletionsForTask
          .slice()
          .sort(
            (
              a: { completionDate: string | number | Date },
              b: { completionDate: string | number | Date },
            ) => {
              return (
                new Date(b.completionDate).getTime() -
                new Date(a.completionDate).getTime()
              );
            },
          )[0].completionDate,
      );
    }
    // get the timeDifference since last done date
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastCompletionDate.getTime();
    //convert it to days minus the interval days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  const handleTaskPress = (taskId: string) => {
    navigation.navigate("TaskDetail", { taskId });
  };

  return (
    <View>
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
        <View style={styles.taskItem}>
          <View>
            <Text
              variant="titleLarge"
              style={{
                color:
                  //var tvngen att lägga till black här för att se task namnen :)) sålänge
                  colorScheme === "dark" ? "black" : theme.buttonText.color,
              }}
            >
              {task.title}
            </Text>
          </View>

          <View>
            {findAllAvatarFortodayCompletionByTaskId(task.id).length > 0 ? (
              findAllAvatarFortodayCompletionByTaskId(task.id).map(
                (avatar, index) => (
                  <View key={index}>
                    <Image
                      source={{ uri: AvatarUrls[avatar as Avatars] }}
                      style={{ height: 30, width: 30 }}
                    />
                  </View>
                ),
              )
            ) : (
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
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
