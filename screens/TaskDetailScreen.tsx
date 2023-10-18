


import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  findAllAvatarFortodayCompletionByTaskId,
  setTaskAsCompleted, 
} from "../store/taskCompletionSlice";
import { findTaskById } from "../store/tasks/taskSlice";


export default function TaskDetailScreen({ navigation, route }: any) {
  const { theme } = useTheme();
  const { taskId } = route.params;

  const taskSlice = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const taskCompletionSlice = useAppSelector((state) => state.taskCompletion);
  const fetchAvatars = () => {
    dispatch(findAllAvatarFortodayCompletionByTaskId({ taskId }));
  };

  const profileSlice = useAppSelector((state) => state.profile);
  const profileId = profileSlice.activeProfile?.id;

  useEffect(() => {
    if (taskId) {
        dispatch(findTaskById({taskId}));
      fetchAvatars();
    }
  }, [dispatch, taskId]);

  const handleTaskCompletion = async (taskId: string, profileId: string) => {
    if (taskId && profileId) {
      dispatch(setTaskAsCompleted({ taskId, profileId }));
      fetchAvatars();
    } else {
      console.error("Task ID or profile ID is undefined.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.taskItem}>
            <View style={styles.titleContainer}>
              <Text variant="titleLarge">{taskSlice.selectedTask?.title}</Text>
            </View>
            <View>
              {/* {isOwner && ( */}
              <Button
                icon={({ size, color }) => (
                  <MaterialIcons name="edit" size={24} color="black" />
                )}
                mode="elevated"
                onPress={() =>
                  navigation.navigate("HandleTask", { taskId: taskId })
                }
                style={styles.changeButton}
              >
                Ändra
              </Button>
              {/* )} */}
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.descriptionContainer}>
        <Text variant="bodyMedium">{taskSlice.selectedTask?.description}</Text>
      </View>
      <View style={styles.intervalValueContainer}>
        <View style={styles.intervalContainer}>
          <View>
            <Text style={styles.intervalText}>Återcommande</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.intervalNumber}>{taskSlice.selectedTask?.interval}</Text>
          </View>
        </View>
        <View style={styles.valueContainer}>
          <View>
            <Text style={styles.valueText}>Värde</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.valueNumber}>{taskSlice.selectedTask?.energiWeight}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.avatarContainer}>
          {taskCompletionSlice.avatars.map((avatar, index) => (
            <View key={index} style={styles.avatarText}>
              <Text>{avatar}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.klarButtonContainer}>
        <Button
          mode="text"
          onPress={() => {
            handleTaskCompletion(taskId, profileId ?? "");
          }}
          style={[styles.klarButton, theme.button]}
        >
          <Text style={[styles.klarButton, theme.buttonText]}>Klar</Text>
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("Tab")}>
          <Text style={[styles.klarButton, theme.buttonText]}>Till Tasks</Text>
        </Button>
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
