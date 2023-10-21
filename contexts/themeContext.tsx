
import React, { createContext, useContext, ReactNode, PropsWithChildren, useState } from 'react';
import { Theme } from '../data/theme';
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { AppDarkTheme, AppLightTheme } from "../data/theme";

type ColorScheme = "light" | "dark" | "auto";

type ThemeContextValue = (colorScheme: ColorScheme) => void;

const ThemeContext = createContext<ThemeContextValue>(
  () => {}
);
// import { AvatarColors, Avatars } from '../data/avatars';

interface ThemeContextType {
  theme: Theme;
//   avatars: Avatars;
//   avatarsColor: typeof AvatarColors;
}

const theme = require('../data/theme').default; 
// const avatars = require('../data/avatars').Avatars; 

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return themeContext;
};

export default function ThemeProvider({
  children,
}: PropsWithChildren) {
  // Temat som användaren har valt i appen
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>("auto");

  // Temat som OS'et föreslår
  const operatingSystemScheme = useColorScheme();

  // Temat som faktiskt ska användas
  const selectedScheme =
    colorScheme === "auto"
      ? operatingSystemScheme
      : colorScheme;

  // Välj rätt temaobjekt utifrån valt tema
  const theme =
    selectedScheme === "dark"
      ? AppDarkTheme
      : AppLightTheme;

return (
  <ThemeContext.Provider value={setColorScheme}>
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {children}
      </NavigationContainer>
    </PaperProvider>
  </ThemeContext.Provider>
);
}

export const useSetColorTheme = () =>
  useContext(ThemeContext);

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   return (
//     <ThemeContext.Provider value={{ theme: theme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };






// Custom Hook to Consume the setColorTheme function









