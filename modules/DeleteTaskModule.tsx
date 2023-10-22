import { Button, Text, View } from "react-native";
import { useAppDispatch } from "../store/store";
import { deleteTask, editTask } from "../store/tasks/taskSlice";
import { Task } from "../types";

interface Props {
  task: Task;
}

export default function DeleteTaskModule(props: Props) {
  const dispatch = useAppDispatch();

  //redigera med isactive till false
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

  //delete
  const handleDeleteTask = () => {
    dispatch(deleteTask(props.task.id));
  };

  return (
    <View>
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
    </View>
  );
}
