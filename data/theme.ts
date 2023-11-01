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
    padding: number;
    alignItems: string;
    margin: number;
    borderRadius: number;
    borderWidth: number;
    backgroundColor: string;
  };
  forgotPasswordButton: {
    padding: number;
    alignItems: string;
    margin: number;
  };
  cardButton: {
    backgroundColor: string;
    padding: number;
    alignItems: string;
    margin: number;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowColor: string;
    borderRadius: number;
    width: number;
    shadowRadius: number;
    elevation: number;
  };
  taskItem: {
    flexDirection: string;
    justifyContent: string;
    alignItems: string;
  };

  iconColors: {
    color: string;
  };
  taskTitle: {
    color: string;
    width: number;
    textAlign: string;
    padding: number;
    fontWeight: string;
  };
};

export const AppLightTheme: Theme = {
  ...MD2LightTheme,
  ...DefaultTheme,
  colors: {
    ...MD2LightTheme.colors,
    ...DefaultTheme.colors,
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
    padding: 5,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  forgotPasswordButton: {
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
  cardButton: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
    margin: 10,
    borderRadius: 8,
    width: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconColors: {
    color: "black",
  },
  taskTitle: {
    color: "black",
    width: 110,
    textAlign: "center",
    padding: 2,
    fontWeight: "bold",
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
  },
  button: {
    backgroundColor: "gray",
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
    padding: 5,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "gray",
  },
  forgotPasswordButton: {
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
  cardButton: {
    backgroundColor: "gray",
    padding: 16,
    alignItems: "center",
    margin: 10,
    borderRadius: 8,
    width: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconColors: {
    color: "white",
  },
  taskTitle: {
    color: "white",
    width: 110,
    textAlign: "center",
    padding: 2,
    fontWeight: "bold",
  },
};
