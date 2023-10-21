import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { MD2DarkTheme, MD2LightTheme } from "react-native-paper";

export type Theme = typeof DarkTheme & {
  button: {
    backgroundColor: string;
    padding: number;
    alignItems: string;
    margin: number;
    borderRadius: number;
    width: number;
  };
  buttonText: {
    color: string;
    fontSize: number;
  };
};

export const AppLightTheme: Theme = {
  ...MD2LightTheme,
  ...DefaultTheme,
  colors: {
    ...MD2LightTheme.colors,
    ...DefaultTheme.colors,
    // primary: "rgb(255, 45, 85)",
    // background: "rgb(242, 242, 242)",
    primary: "#FFD700",
    background: "white",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    width: 360,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
};

export const AppDarkTheme: Theme = {
  ...MD2DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD2DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "rgb(10, 10, 10)",
    // background: "rgb(50, 50, 50)",

  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    width: 360,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
};

