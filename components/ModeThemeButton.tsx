import React, { useState } from "react";
import { Appearance, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { FlatList } from "react-native";

export default function ModeThemeButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { theme, setColorScheme } = useTheme();

  const handleToggleSystemTheme = () => {
    const systemColorScheme = Appearance.getColorScheme();
    console.log("System Theme Detected:", systemColorScheme);

    if (systemColorScheme) {
      if (systemColorScheme === "light") {
        setColorScheme("light");
      } else {
        setColorScheme("dark");
      }
    }
  };

  const handleSelect = (item: string) => {
    if (item === "light" || item === "dark") {
      setColorScheme(item);
    } else {
      handleToggleSystemTheme();
    }
    setSelectedItem(item);
    setShowDropdown(false);
  };

  const handleClose = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <TouchableOpacity
        style={theme.button as any}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text>Choose Mode</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={theme.button as any}>
          <Button onPress={handleClose}>
            <AntDesign name="close" size={24} color="black" />
          </Button>
          <FlatList
            data={["light", "dark", "Auto"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <Text style={theme.buttonText}>Selected Mode: {selectedItem}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  dropdownItem: {
    padding: 5,
  },
});

