import React, { useEffect, useState } from "react";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";

export default function ModeThemeButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { theme, setColorScheme } = useTheme();
  const [isAuto, setIsAuto] = useState<boolean>(true);

  const handleToggleSystemTheme = () => {
    const systemColorScheme: ColorSchemeName =
      Appearance.getColorScheme() as ColorSchemeName;
    if (systemColorScheme === "light" || systemColorScheme === "dark") {
      setColorScheme(systemColorScheme);
    }
  };

  const handleSelect = (item: string) => {
    if (item === "light" || item === "dark") {
      setColorScheme(item);
      setIsAuto(false);
    } else if (item === "Auto") {
      setColorScheme("auto");
      handleToggleSystemTheme();
      setIsAuto(true);
    }
    setSelectedItem(item);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (isAuto) {
      handleToggleSystemTheme();
    }
  }, [isAuto]);

  useEffect(() => {
    const onChange = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      if (isAuto) {
        handleToggleSystemTheme();
      }
    };

    const subscription = Appearance.addChangeListener(onChange);

    return () => {
      subscription.remove();
    };
  }, [isAuto]);

  return (
    <>
      <TouchableOpacity
        style={theme.button as any}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={theme.buttonText}>Choose Mode</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={theme.button as any}>
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
