import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { Modal } from "react-native-paper";
import { useAppDispatch } from "../store/store";
import { deleteTask, editTask } from "../store/tasks/taskSlice";
import { Task } from "../types";

interface Props {
  task: Task;
  onClose: () => void;
}

export default function DeleteTaskModule(props: Props) {
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
    dispatch(editTask(editedTask));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(props.task.id));
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
      <Button title="Ja, arkivera sysslan" onPress={handleArchiveTask} />
      <Button
        title="Nej, radera sysslan permanent"
        onPress={() => handleDeleteTask}
      />
      <Button title="Avbryt" onPress={closeModal} />
    </Modal>
  );
}
