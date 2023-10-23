import React from "react";
import { View, Text, PanResponder, Animated } from "react-native";
import { Button } from "react-native-paper";

const ThemeSwitchButton = ({
  onToggleTheme,
}: {
  onToggleTheme: (theme: string) => void;
}) => {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Använd gestureState för att bestämma hur långt användaren har dragit
        const dragX = gestureState.dx;

        // Här kan du anpassa hur långt användaren måste dra för att byta tema
        const threshold = 100;

        if (dragX > threshold) {
          // Användaren drog till höger (tillräckligt långt) - byt till dark theme
          onToggleTheme("dark");
        } else if (dragX < -threshold) {
          // Användaren drog till vänster (tillräckligt långt) - byt till light theme
          onToggleTheme("light");
        }
      },
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <Text>Drag för att byta tema</Text>
      <Button onPress={() => onToggleTheme("auto")}>Auto Theme</Button>
      {/* <Button title="Toggle Theme" onPress={handleToggleTheme} />
      <Button title="Auto Theme" onPress={handleToggleTheme} /> */}
    </View>
  );
};

export default ThemeSwitchButton;
