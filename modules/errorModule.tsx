import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";

interface Props {
  errorMessage: string;
  buttonMessage: string;
  onClose: () => void;
}

export default function ErrorModule(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(true); 

  const { theme } = useTheme();

  const closeModal = () => {
    setIsModalVisible(false);
    props.onClose();
  };

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal transparent={true} visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
      <Card style={{alignContent:"center"}}>
          <Text style={styles.text}>{props.errorMessage}</Text>
          <TouchableOpacity style={theme.button as any} onPress={closeModal}>
            <Text>{props.buttonMessage}</Text>
          </TouchableOpacity>
          </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  popup: {
    width: 200,
    padding: 20,
    borderRadius: 10,
    alignItems:"center",
    justifyContent:"center"
  },
  text: {
    fontSize: 16,
    textAlign:"center"
  },
});