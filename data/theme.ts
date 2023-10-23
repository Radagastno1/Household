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
  signupButton: {
    // backgroundColor: theme.colors.background,
    padding: number,
    alignItems: string,
    margin: number,
    borderRadius: number,
    borderWidth: number,
    backgroundColor: string,
    // borderColor: theme.buttonText.color,
  },
  forgotPasswordButton: {

    // backgroundColor: 
    // flex: 1,
    padding: number,
    alignItems: string,
    margin: number,
  },
  // forgotPasswordButtonText: {

  //   color: string,
  //   fontSize: number,
  // },
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
  signupButton: {
    // backgroundColor: theme.colors.background,
    padding: 5,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white"
    // borderColor: theme.buttonText.color,
  },
  forgotPasswordButton: {
 
    // backgroundColor: 
    // flex: 1,
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
  // forgotPasswordButtonText: {

  //   color: "white",
  //   fontSize: 10,
  // },
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
    // backgroundColor: "#FFD700",
    backgroundColor: "gray", // Uppdatera färgen till ljusgrå
    padding: 10,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    width: 360,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  signupButton: {
    // backgroundColor: theme.colors.background,
    padding: 5,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "gray", 
    // backgroundColor: "white"
    // backgroundColor: "lightgray", 
    // borderColor: theme.buttonText.color,
  },
  forgotPasswordButton: {
 

    padding: 5,
    alignItems: "center",
    margin: 10,
  },
  //   forgotPasswordButtonText: {

  //   color: "white",
  //   fontSize: 10,
  // },
};

