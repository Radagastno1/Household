import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import CircleComponent from "../components/CircleComponent";
import CircleIntervalView from "../components/CircleIntervalView";
import { useTheme } from "../contexts/themeContext";
import DeleteTaskModule from "../modules/DeleteTaskModule";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  filterTaskListByHouseId,
} from "../store/tasks/taskSlice";
import { Task } from "../types";

type HandleTaskProps = RootNavigationScreenProps<"HandleTask">;

export default function CreateTaskScreen({
  navigation,
  route,
}: HandleTaskProps) {
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState<Task>();
  const activeHousehold = useAppSelector(
    (state) => state.household.activeHousehold,
  );

  const householdId = activeHousehold?.id;

  const [intervalDataPressed, setIntervalDataPressed] = useState(false);
  const [energyDataPressed, setEnergyDataPressed] = useState(false);

  const [selectedInterval, setSelectedInterval] = useState<number>(
    taskToEdit ? taskToEdit.interval : 7,
  );
  const [selectedEnergy, setSelectedEnergy] = useState<number>(
    taskToEdit ? taskToEdit.energyWeight : 2,
  );

  const [title, setTitle] = useState<string>(
    taskToEdit ? taskToEdit.title : "",
  );
  const [description, setDescription] = useState<string>(
    taskToEdit ? taskToEdit.description : "",
  );

  const [isDeleteTaskModalVisible, setDeleteTaskModalVisible] = useState(false);

  const hideDeleteTaskModal = () => {
    setDeleteTaskModalVisible(false);
  };
  const dispatch = useAppDispatch();

  const taskSlice = useAppSelector((state) => state.task);
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const { taskId } = route.params;
    const incomingTaskId = taskId;
    if (incomingTaskId == "0") {
      setIsCreateMode(true);
    } else {
      const taskToEdit = taskSlice?.tasks.find((t) => t.id === incomingTaskId);
      if (taskToEdit) {
        setTaskToEdit(taskToEdit);
        setIsCreateMode(false);
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setSelectedInterval(taskToEdit.interval);
        setSelectedEnergy(taskToEdit.energyWeight);
      } else {
        navigation.navigate("Tab");
      }
    }
  }, []);

  const intervalData: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const energyData: number[] = [1, 2, 4, 6, 8];

  const handleDeleteTask = () => {
    if (taskToEdit) {
      setDeleteTaskModalVisible(true);
    }
  };

  const deleteFunctionToModule = (taskId: string) => {
    dispatch(deleteTaskAsync(taskId)).then(() => {
      if (activeHousehold?.id) {
        dispatch(filterTaskListByHouseId({ household_Id: activeHousehold.id }));
      }
    });

    setDeleteTaskModalVisible(false);
    navigation.navigate("Tab");
  };

  const editFunctionToModule = (editedTask: Task) => {
    dispatch(editTaskAsync(editedTask));
    navigation.navigate("Tab");
  };

  const handleTask = () => {
    if (isCreateMode) {
      if (title && description && householdId) {
        const newTask: Task = {
          id: "",
          title: title,
          description: description,
          energyWeight: selectedEnergy,
          interval: selectedInterval,
          creatingDate: new Date().toISOString(),
          householdId: householdId,
          isActive: true,
        };
        dispatch(addTaskAsync(newTask)).then(() => {
          if (activeHousehold?.id) {
            dispatch(
              filterTaskListByHouseId({ household_Id: activeHousehold.id }),
            );
          }
        });
      }
    } else {
      if (taskToEdit && householdId) {
        const editedTask: Task = {
          id: taskToEdit.id,
          title: title,
          description: description,
          energyWeight: selectedEnergy,
          interval: selectedInterval,
          creatingDate: new Date().toISOString(),
          householdId: householdId,
          isActive: taskToEdit.isActive,
        };
        dispatch(editTaskAsync(editedTask)).then(() => {
          dispatch(filterTaskListByHouseId({ household_Id: householdId }));
        });
      }
    }

    navigation.navigate("Tab");
  };
  const getEnergyCircleBackgroundColor = (energyWeight: number | undefined) => {
    if (energyWeight === undefined) {
      return "lightgrey";
    }

    const energyToGreyMapping: { [key: string]: string } = {
      "1": "#F0F0F0",
      "2": "#E0E0E0",
      "4": "#D0D0D0",
      "6": "#C0C0C0",
      "8": "#B0B0B0",
    };

    return energyToGreyMapping[energyWeight.toString()] || "lightgrey";
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={styles.screenContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        {isDeleteTaskModalVisible && taskToEdit ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="always"
          >
            <DeleteTaskModule
              task={taskToEdit}
              onDeleteTask={deleteFunctionToModule}
              onEditTask={editFunctionToModule}
              onClose={hideDeleteTaskModal}
            />
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.container}>
              <TextInput
                placeholder="Titel"
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "white"
                        : theme.cardButton.backgroundColor,
                    color: colorScheme === "dark" ? "black" : "black",
                  },
                ]}
                textAlignVertical="center"
                returnKeyType="done"
                onChangeText={(text) => setTitle(text)}
                value={title}
              ></TextInput>
              <TextInput
                placeholder="Beskrivning"
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "white"
                        : theme.cardButton.backgroundColor,
                  },
                ]}
                multiline
                numberOfLines={4}
                blurOnSubmit={true}
                textAlignVertical="top"
                returnKeyType="done"
                onChangeText={(text) => setDescription(text)}
                value={description}
              ></TextInput>

              <Card style={theme as any}>
                <Card.Content style={styles.cardContent}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Title
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Återkommer:
                      </Title>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <Title>Var </Title>
                      <TouchableOpacity
                        onPress={() => setIntervalDataPressed(true)}
                      >
                        <CircleComponent
                          number={selectedInterval}
                          backgroundColor={
                            colorScheme === "dark" ? "red" : "red"
                          }
                          color={colorScheme === "dark" ? "white" : "white"}
                        />
                      </TouchableOpacity>
                      <Title> dag</Title>
                    </View>
                  </View>

                  <CircleIntervalView
                    isShowing={intervalDataPressed}
                    intervalArray={intervalData}
                    circleBackgroundColor={
                      colorScheme === "dark" ? "lightgrey" : "lightgrey"
                    }
                    onNumberSelect={(selectedNumber) => {
                      setSelectedInterval(selectedNumber);
                      setIntervalDataPressed(false);
                    }}
                  />
                </Card.Content>
              </Card>

              <Card style={theme as any}>
                <Card.Content style={styles.cardContent}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Title style={{ fontWeight: "bold" }}>Värde:</Title>
                      <Paragraph>Hur energikrävande är sysslan?</Paragraph>
                    </View>

                    <View style={{ justifyContent: "center" }}>
                      <TouchableOpacity
                        onPress={() => setEnergyDataPressed(true)}
                      >
                        <CircleComponent
                          number={selectedEnergy}
                          backgroundColor={getEnergyCircleBackgroundColor(
                            selectedEnergy,
                          )}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <CircleIntervalView
                    isShowing={energyDataPressed}
                    intervalArray={energyData}
                    circleBackgroundColor="grey"
                    getCircleBackgroundColor={getEnergyCircleBackgroundColor}
                    onNumberSelect={(selectedNumber) => {
                      setSelectedEnergy(selectedNumber);
                      console.log(selectedNumber);
                      setEnergyDataPressed(!energyDataPressed);
                    }}
                  />
                </Card.Content>
              </Card>
              {isCreateMode ? null : (
                <TouchableOpacity
                  onPress={() => handleDeleteTask()}
                  style={styles.removeButton}
                >
                  <Text
                    style={[
                      styles.removeText,
                      {
                        color: colorScheme === "dark" ? "white" : "black",
                      },
                    ]}
                  >
                    Ta bort
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  handleTask();
                }}
              >
                <Feather
                  name="plus-circle"
                  size={24}
                  color="black"
                  style={{ paddingHorizontal: 5 }}
                />
                <Text style={theme.buttonText}>Spara</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  navigation.navigate("Tab");
                }}
              >
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="black"
                  style={{ paddingHorizontal: 5 }}
                />
                <Text style={theme.buttonText}>Stäng</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: 80,
  },
  scrollViewContainer: {
    flexDirection: "column",
    flex: 1,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "white",
    elevation: 5,
    marginVertical: 10,
  },
  intervalContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingLeft: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    backgroundColor: "white",
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: "column",
    paddingVertical: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  removeText: {
    padding: 10,
    fontSize: 20,
  },
  removeButton: {
    backgroundColor: "orange",
    width: 200,
    marginVertical: 20,
    alignItems: "center",
  },
});
