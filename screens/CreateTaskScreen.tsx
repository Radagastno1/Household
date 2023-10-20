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
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addTask,
  deleteTask,
  editTask,
  filterTaskListByHouseId,
} from "../store/tasks/taskSlice";
import { Task } from "../types";

//här skapar man en task som ägare för hushållet
export default function CreateTaskScreen({ navigation, route }: any) {
  //LÅTSAS ATT JAG KOLLAR MOT HUSHÅLLSSTATET VILKET HUSHÅLL ANVÄNDAREN ÄR PÅ HÄR
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState<Task>();
  const householdSlice = useAppSelector((state) => state.household);

  const householdId = householdSlice.activehousehold?.id;
  // const household = households.find((h) => h.id == householdId);

  const [intervalDataPressed, setIntervalDataPressed] = useState(false);
  const [energyDataPressed, setEnergyDataPressed] = useState(false);

  const [selectedInterval, setSelectedInterval] = useState(
    taskToEdit ? taskToEdit.interval : 7,
  );
  const [selectedEnergy, setSelectedEnergy] = useState(
    taskToEdit ? taskToEdit.interval : 2,
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  //FÖR ATT TESTA HÄMTA TASKEN FÖR ETT HUSHÅLL SÅ JAG SER ATT DOM SKAPADES KORREKT
  const taskSlice = useAppSelector((state) => state.task);

  useEffect(() => {
    const { taskId } = route.params;
    const incomingTaskId = taskId;
    console.log("taskid är: ", incomingTaskId);
    if (incomingTaskId == "0") {
      setIsCreateMode(true);
    } else {
      const taskToEdit = taskSlice?.tasks.find((t) => t.id === incomingTaskId);
      if (taskToEdit) {
        setTaskToEdit(taskToEdit);
        setIsCreateMode(false);
      } else {
        //navigera tillbaka?
      }
    }
  }, []);

  const intervalData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const energyData: number[] = [1, 2, 4, 6, 8];

  //testar så att edit funkar
  // const testEditTask = () => {
  //   if (allTasksForHousehold.length >= 5) {
  //     //I just pick the last one for now, but here it will be whatever task we are on in the detail screen
  //     const lastTaskInList = allTasksForHousehold[5];
  //     //here we edit the name for example to MATA KATTEN
  //     const updatedTask = { ...lastTaskInList, title: "MATA KATTEN" };
  //     //then dispatch to taskSlice
  //     dispatch(editTask(updatedTask));
  //   }
  // };

  const handleDeleteTask = () => {
    if (taskToEdit) {
      dispatch(deleteTask(taskToEdit.id));
    }
    navigation.navigate("Tab");
  };

  const handleTask = () => {
    const todaysDate = new Date();

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
        };
        console.log("den nya tasken innan dispatch:", newTask);
        dispatch(addTask(newTask));
        dispatch(filterTaskListByHouseId({ household_Id: householdId }));
      }
    } else {
      console.log("I ELSE");
      if (taskToEdit && householdId) {
        const editedTask: Task = {
          id: taskToEdit.id,
          title: title,
          description: description,
          energiWeight: selectedEnergy,
          interval: selectedInterval,
          creatingDate: new Date().toISOString(),
          householdId: householdId,
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
        <View style={styles.container}>
          <TextInput
            placeholder="Titel"
            style={styles.input}
            textAlignVertical="center"
            returnKeyType="done"
            onChangeText={(text) => setTitle(text)}
            defaultValue={taskToEdit?.title}
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
            defaultValue={taskToEdit?.description}
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
                    {isCreateMode ? (
                      <CircleComponent
                        number={selectedInterval}
                        backgroundColor="red"
                        color="white"
                      />
                    ) : (
                      <CircleComponent
                        number={taskToEdit?.interval ?? 0}
                        backgroundColor="red"
                        color="white"
                      />
                    )}
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
                    {isCreateMode ? (
                      <CircleComponent
                        number={selectedEnergy}
                        backgroundColor="lightgrey"
                        color="black"
                      />
                    ) : (
                      <CircleComponent
                        number={taskToEdit?.energiWeight ?? 0}
                        backgroundColor="lightgrey"
                        color="black"
                      />
                    )}
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

        {/* <View style={styles.fillOutContainer}></View> */}
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

        {/* TESTAR BARA ATT SKRIVA UT ALLA TASKS FÖR ETT HUSHÅLL SÅ JAG SER ATT DET FUNKAR*/}
        <View style={{ flexDirection: "column" }}>
          {/* <TouchableOpacity
            style={{ padding: 20, backgroundColor: "red" }}
            onPress={() => testEditTask()}
          >
            <Text>Redigera första tasken till att heta MATA KATT</Text>
          </TouchableOpacity> */}
          {/* {allTasksForHousehold
            ? allTasksForHousehold.map((t) => (
                <Text key={t.id}>
                  Titel: {t.title}
                  Beskrivning: {t.description}
                  Energi: {t.energiWeight}
                  Återkommande: {t.interval}
                  HushållsId: {t.householdId}
                  Datum: {t.creatingDate.toString()}
                </Text>
              ))
            : null} */}
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
    // justifyContent: "space-around",
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
