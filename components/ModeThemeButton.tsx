import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Appearance,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";

export default function ModeThemeButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { theme, setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("automatic");
  const modes = ["light", "auto", "dark"];

  // const handleToggleTheme = () => {
  //   if (setColorScheme) {
  //     setColorScheme(currentTheme === "dark" ? "light" : "dark");
  //     setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  //   }
  // };

  const handleToggleTheme = () => {
    if (setColorScheme) {
      if (currentTheme === "light") {
        setColorScheme("dark");
        setCurrentTheme("dark");
      } else {
        setColorScheme("light");
        setCurrentTheme("light");
      }
    }
  };
  
  const handleToggleSystemTheme = () => {
    const systemColorScheme = Appearance.getColorScheme();
    console.log("System Theme Detected:", systemColorScheme);

    if (systemColorScheme) {
      if (systemColorScheme === "light" && currentTheme === "dark") {
        setCurrentTheme("light");
        setColorScheme("light");
      } else if (systemColorScheme === "dark" && currentTheme === "light") {
        setCurrentTheme("dark");
        setColorScheme("dark");
      }
    }
  };

  const handleSelect = (item: string) => {
    if (item === "light" || item === "dark") {
      // For 'light' and 'dark' modes, use handleToggleTheme
      handleToggleTheme();
    } else {
      // For 'automatic' mode, use handleToggleSystemTheme
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
          {/* Övrig innehåll i din View */}
          <Button onPress={handleClose}>
            <AntDesign name="close" size={24} color="black" />
          </Button>
          <FlatList
            data={modes}
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
  dropdownContainer: {
    position: "absolute",
    // top: -5,
    // left: 150,
    // flexDirection: "row",
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 4,
    // zIndex: 1,
    // width: 60,
  },
  dropdownItem: {
    padding: 5,
  },
  closeButtonContainer: {
    alignItems: "flex-end",
    // padding: 4,
  },
});
