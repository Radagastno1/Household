import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { useTheme } from "../contexts/themeContext";

interface Props{
    errorMessage: string;
    onClose: () => void;
}

export default function ErrorModule(props:Props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const  { theme }  = useTheme();

    useEffect(() => {
        setIsModalVisible(true);
      }, []);
    
      const closeModal = () => {
        setIsModalVisible(false);
        props.onClose();
      };

    return(
        <Modal visible={isModalVisible}>
        <View>
        <Text>{props.errorMessage}</Text>  
        <TouchableOpacity style={theme.button as any}  onPress={closeModal}>
       <Text>Avbryt</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    );
}