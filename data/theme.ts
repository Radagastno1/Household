import { DefaultTheme } from "react-native-paper";

// import {
//   DarkTheme,
//   DefaultTheme,
// } from "@react-navigation/native";

// export const AppLightTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "rgb(255, 45, 85)",
//     background: "rgb(242, 242, 242)",
//   },
// };

// export const AppDarkTheme = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     primary: "rgb(255, 45, 85)",
//     background: "rgb(10, 10, 10)",
//   },
// };

export type Theme = {
  colors: {
    primary: string;
    background: string;
  };
  fonts: {};
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

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "yellow",
    background: "white",
  },
  fonts: {},
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

export default theme;
