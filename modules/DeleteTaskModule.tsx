import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { Modal } from "react-native-paper";
import { Task } from "../types";

interface Props {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (editedTask: Task) => void;
  onClose: () => void;
}

export default function DeleteTaskModule(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleArchiveTask = () => {
    const editedTask: Task = {
      id: props.task.id,
      title: props.task.title,
      description: props.task.description,
      energiWeight: props.task.energiWeight,
      interval: props.task.interval,
      creatingDate: props.task.creatingDate,
      householdId: props.task.householdId,
      isActive: false,
    };
    console.log("den redigerade tasken: ", editedTask.title);
    props.onEditTask(editedTask);
  };

  const handleDeleteTask = () => {
    props.onDeleteTask(props.task.id);
  };

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
    props.onClose();
  };

  return (
    <Modal visible={isModalVisible}>
      <Text>Vill du arkivera sysslan?</Text>
      <Text>
        Om du väljer att radera sysslan permanent, då kommer all statistik
        gällande sysslan också att tas bort.
      </Text>
      <Button
        title="Ja, arkivera sysslan"
        onPress={() => handleArchiveTask()}
      />
      <Button
        title="Nej, radera sysslan permanent"
        onPress={() => handleDeleteTask()}
      />
      <Button title="Avbryt" onPress={closeModal} />
    </Modal>
  );
}

// const styles = StyleSheet.create({
//   moduleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//     flex: 1,
//     backgroundColor: "red",
//   },
// });
