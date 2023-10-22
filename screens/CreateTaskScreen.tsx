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
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import CircleComponent from "../components/CircleComponent";
import DeleteTaskModule from "../modules/DeleteTaskModule";
import { RootNavigationScreenProps } from "../navigators/navigationTypes";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addTask,
  editTask,
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
    (state) => state.household.activehousehold,
  );

  const householdId = activeHousehold?.id;

  const [intervalDataPressed, setIntervalDataPressed] = useState(false);
  const [energyDataPressed, setEnergyDataPressed] = useState(false);

  const [selectedInterval, setSelectedInterval] = useState<number>(
    taskToEdit ? taskToEdit.interval : 7,
  );
  const [selectedEnergy, setSelectedEnergy] = useState<number>(
    taskToEdit ? taskToEdit.energiWeight : 2,
  );

  const [title, setTitle] = useState<string>(
    taskToEdit ? taskToEdit.title : "",
  );
  const [description, setDescription] = useState<string>(
    taskToEdit ? taskToEdit.description : "",
  );

  const [isDeleteTaskModalVisible, setDeleteTaskModalVisible] = useState(false);

  const showDeleteTaskModal = () => {
    setDeleteTaskModalVisible(true);
  };

  const hideDeleteTaskModal = () => {
    setDeleteTaskModalVisible(false);
  };
  const dispatch = useAppDispatch();

  const taskSlice = useAppSelector((state) => state.task);

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
        setSelectedEnergy(taskToEdit.energiWeight);
        console.log("task to edit interval:", taskToEdit.interval);
      } else {
        //navigera tillbaka?
      }
    }
  }, []);

  const intervalData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const energyData: number[] = [1, 2, 4, 6, 8];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteTask = () => {
    //stänga modulen när man gjort något där inne? eller?
    if (taskToEdit) {
    }
    // navigation.navigate("Tab");
  };

  const handleTask = () => {
    if (isCreateMode) {
      if (title && description && householdId) {
        const newTask: Task = {
          id: "",
          title: title,
          description: description,
          energiWeight: selectedEnergy,
          interval: selectedInterval,
          creatingDate: new Date().toISOString(),
          householdId: householdId,
          isActive: true,
        };
        console.log("den nya tasken innan dispatch:", newTask);
        dispatch(addTask(newTask));
        dispatch(filterTaskListByHouseId({ household_Id: householdId }));
      }
    } else {
      if (taskToEdit && householdId) {
        const editedTask: Task = {
          id: taskToEdit.id,
          title: title,
          description: description,
          energiWeight: selectedEnergy,
          interval: selectedInterval,
          creatingDate: new Date().toISOString(),
          householdId: householdId,
          isActive: taskToEdit.isActive,
        };
        console.log("den redigerade tasken innan dispatch:", editedTask);
        dispatch(editTask(editedTask));
        dispatch(filterTaskListByHouseId({ household_Id: householdId }));
      }
    }

    navigation.navigate("Tab");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="always"
      >
        {isDeleteTaskModalVisible && taskToEdit && (
          <DeleteTaskModule task={taskToEdit} onClose={hideDeleteTaskModal} />
        )}
        <View style={styles.container}>
          <TextInput
            placeholder="Titel"
            style={styles.input}
            textAlignVertical="center"
            returnKeyType="done"
            onChangeText={(text) => setTitle(text)}
            value={title}
          ></TextInput>
          <TextInput
            placeholder="Beskrivning"
            style={styles.input}
            multiline
            numberOfLines={4}
            blurOnSubmit={true}
            textAlignVertical="top"
            returnKeyType="done"
            onChangeText={(text) => setDescription(text)}
            value={description}
          ></TextInput>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Title style={{ fontWeight: "bold" }}>Återkommer:</Title>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Title>Var </Title>
                  <TouchableOpacity
                    onPress={() => setIntervalDataPressed(true)}
                  >
                    <CircleComponent
                      number={selectedInterval}
                      backgroundColor="red"
                      color="white"
                    />
                  </TouchableOpacity>
                  <Title> dag</Title>
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {intervalDataPressed
                  ? intervalData.map((number) => (
                      <TouchableOpacity
                        key={number.toString()}
                        onPress={() => {
                          setSelectedInterval(number),
                            setIntervalDataPressed(false);
                        }}
                      >
                        <CircleComponent
                          number={number}
                          backgroundColor="lightgrey"
                          color="black"
                        />
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
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
                    onPress={() => {
                      setEnergyDataPressed(true);
                    }}
                  >
                    <CircleComponent
                      number={selectedEnergy}
                      backgroundColor="lightgrey"
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                {energyDataPressed
                  ? energyData.map((number) => (
                      <TouchableOpacity
                        key={number.toString()}
                        onPress={() => {
                          setSelectedEnergy(number),
                            setEnergyDataPressed(false);
                        }}
                      >
                        <CircleComponent
                          number={number}
                          backgroundColor="lightgrey"
                          color="black"
                        />
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </Card.Content>
          </Card>
          {isCreateMode ? null : (
            <TouchableOpacity onPress={() => handleDeleteTask()}>
              <Text style={styles.removeText}>Ta bort</Text>
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
            <Feather name="plus-circle" size={24} color="black" />
            <Text style={styles.buttonText}>Spara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Tab");
            }}
          >
            <AntDesign name="closecircleo" size={24} color="black" />
            <Text style={styles.buttonText}>Stäng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    marginTop: 80,
    flex: 1,
    padding: 10,
  },
  scrollViewContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
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
});
