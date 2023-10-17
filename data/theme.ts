import { DefaultTheme } from "react-native-paper";

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
