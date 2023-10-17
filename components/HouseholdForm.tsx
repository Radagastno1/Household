import React, { useState } from 'react';

interface HouseholdFormProps {
  onSubmit: (name: string) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const [householdName, setHouseholdName] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(householdName);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="householdName">Hushållsnamn:</label>
      <input
        type="text"
        id="householdName"
        value={householdName}
        onChange={(e) => setHouseholdName(e.target.value)}
      />
      <button type="submit">Skapa Hushåll</button>
    </form>
  );
};

export default HouseholdForm;