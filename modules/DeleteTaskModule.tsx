import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { Task } from "../types";

interface Props {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (editedTask: Task) => void;
  onClose: () => void;
}

export default function DeleteTaskModule(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const  { theme }  = useTheme();

  const handleArchiveTask = () => {
    const editedTask: Task = {
      id: props.task.id,
      title: props.task.title,
      description: props.task.description,
      energyWeight: props.task.energyWeight,
      interval: props.task.interval,
      creatingDate: props.task.creatingDate,
      householdId: props.task.householdId,
      isActive: false,
    };
    props.onEditTask(editedTask);
    closeModal();
  };

  const handleDeleteTask = () => {
    props.onDeleteTask(props.task.id);
    closeModal();
  };

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
    props.onClose();
  };

  return (
    <Modal visible={isModalVisible} style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
      <View style={styles.textView}>
      <Text style={styles.text}>Vill du arkivera sysslan?</Text>
      <Text style={styles.smallerText}>
        Om du väljer att radera sysslan permanent, då kommer all statistik
        gällande sysslan också att tas bort.
      </Text>
      </View>
      <View style={styles.buttonView}>
      <TouchableOpacity
        style={theme.button as any}
        onPress={() => handleArchiveTask()}
      >
        <Text>Ja, arkivera sysslan</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={theme.button as any}
        onPress={() => handleDeleteTask()}
      >
        <Text>Nej, radera sysslan permanent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={theme.button as any}  onPress={closeModal}>
     <Text>Avbryt</Text>
      </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    alignItems:"center",
    height:"100%",
    justifyContent: "center",
  },
  text: {
    fontSize:20,
  },
  textView:{
    flex:1,
    padding:10,
    justifyContent:"center",
    alignItems:"center",
  },
  buttonView:{
    flex:1,
    padding:10,
  },
  smallerText:{
    fontSize:16,
    paddingVertical:10
  }
});
