import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface HouseholdFormProps {
  onSubmit: (name: string) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const [householdName, setHouseholdName] = useState('');
  const [buttonTitle, setButtonTitle] = useState("SKAPA");

  const handleFormSubmit = () => {
    setButtonTitle("SKAPAR HUSHÅLL");
    onSubmit(householdName);
  };

  return (
    <View>
      <Text>Hushållsnamn:</Text>
      <TextInput
        placeholder="Ange hushållsnamn"
        value={householdName}
        onChangeText={(text) => setHouseholdName(text)}
      />
      <Button title={buttonTitle} onPress={handleFormSubmit} />
    </View>
  );
};



export default HouseholdForm;