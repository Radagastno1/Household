import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";

interface HeaderProps {
  text: string;
}

export default function Header({ text }: HeaderProps) {
  const { theme } = useTheme();
  return (
    <View>
      <Appbar.Header
        style={{ height: 70, backgroundColor: theme.colors.background }}
      >
        <Appbar.Content
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          title={text}
        />
      </Appbar.Header>
    </View>
  );
}
