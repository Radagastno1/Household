import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import NewTaskButton from "../components/NewTaskButton";
import TaskCard from "../components/TaskCard";
import { useTheme } from "../contexts/themeContext";
import { TopTabScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchTasks, filterTaskListByHouseId } from "../store/tasks/taskSlice";

type HouseholdTasksProps = TopTabScreenProps<"HouseholdTasks">;

export default function HouseholdTasksScreen({
  navigation,
}: HouseholdTasksProps) {
  const profiles = useAppSelector((state) => state.profile.profiles);
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const filteredTasks = useAppSelector((state) => state.task.filteredTasks);
  const completions = useAppSelector(
    (state) => state.taskCompletion.completions,
  );

  const dispatch = useAppDispatch();
  const isOwner = activeProfile?.isOwner;

  useFocusEffect(
    useCallback(() => {
      if (activeProfile && activeHousehold) {
        dispatch(fetchTasks(activeProfile.householdId)).then(() => {
          dispatch(
            filterTaskListByHouseId({
              household_Id: activeHousehold?.id,
            }),
          );
        });
      }
    }, []),
  );

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
          {filteredTasks.map((task) => (
            <TaskCard
              completions={completions}
              profiles={profiles}
              navigation={navigation}
              task={task}
            />
          ))}
        </ScrollView>
        <NewTaskButton isOwner={isOwner as boolean} navigation={navigation} />
        {/* <View style={styles.buttonContainer}>
          {isOwner === true && (
            <Button
              icon={() => (
                <AntDesign name="pluscircleo" size={20} color="black" />
              )}
              mode="outlined"
              onPress={() => navigation.navigate("HandleTask", { taskId: "0" })}
              style={[
                styles.button,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "white"
                      : theme.cardButton.backgroundColor,
                },
              ]}
              labelStyle={theme.buttonText}
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
  scrollContainerNonOwner: {
    flex: 1,
    maxHeight: "100%", // Max height for non-owners
  },
  scrollContainerOwner: {
    flex: 1,
    maxHeight: "80%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  button: {
    paddingLeft: 3,
    borderRadius: 20,
    height: 45,
    width: 130,
    backgroundColor: "white",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
