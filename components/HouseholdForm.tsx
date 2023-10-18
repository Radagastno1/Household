import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface HouseholdFormProps {
  onSubmit: (name: string) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const [householdName, setHouseholdName] = useState('');

  const handleFormSubmit = () => {
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
      <Button title="Skapa Hushåll" onPress={handleFormSubmit} />
    </View>
  );
};



export default HouseholdForm;