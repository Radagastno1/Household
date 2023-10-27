import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

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
  <Text style={{ fontSize: 18 }}>{buttonTitle}</Text>
    </View>
  );
};



export default HouseholdForm;