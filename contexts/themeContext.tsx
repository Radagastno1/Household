
import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from '../data/theme';
// import { AvatarColors, Avatars } from '../data/avatars';

interface ThemeContextType {
  theme: Theme;
//   avatars: Avatars;
//   avatarsColor: typeof AvatarColors;
}

const theme = require('../data/theme').default; 
// const avatars = require('../data/avatars').Avatars; 

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return themeContext;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
};


// import { NavigationContainer } from "@react-navigation/native";
// import {
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// import { useColorScheme } from "react-native";
// import { AppDarkTheme, AppLightTheme } from "./theme";

// type ColorScheme = "light" | "dark" | "auto";

// type ThemeContextValue = (colorScheme: ColorScheme) => void;

// const ThemeContext = createContext<ThemeContextValue>(
//   () => {}
// );

// export default function ThemeProvider({
//   children,
// }: PropsWithChildren) {
//   const [colorScheme, setColorScheme] =
//     useState<ColorScheme>("auto");

//   // Vad OS'et föreslår
//   const autoScheme = useColorScheme();

//   const selectedScheme =
//     colorScheme === "auto" ? autoScheme : colorScheme;

//   const theme =
//     selectedScheme === "dark"
//       ? AppDarkTheme
//       : AppLightTheme;

//   return (
//     <ThemeContext.Provider value={setColorScheme}>
//       <NavigationContainer theme={theme}>
//         {children}
//       </NavigationContainer>
//     </ThemeContext.Provider>
//   );
// }

// // Custom Hook to Consume the setColorTheme function
// export const useSetColorTheme = () =>
//   useContext(ThemeContext);

// // usage:
// // const setColorTheme = useSetColorTheme();
// // setColorTheme("dark");





