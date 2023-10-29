import React, { createContext, useContext, ReactNode, PropsWithChildren, useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Appearance } from 'react-native';
import { AppDarkTheme, AppLightTheme } from '../data/theme';
import { Theme } from '../data/theme';
import { useColorScheme } from 'react-native';


type ColorScheme = ColorSchemeName;

type ThemeContextValue = {
  theme: Theme;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

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
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<ColorScheme>('light'); // Använd ditt önskade standardtema här

  useEffect(() => {
    // Lyssna på ändringar i currentTheme och applicera temat
    if (isAuto) {
      const systemColorScheme = Appearance.getColorScheme();
      if (systemColorScheme === 'dark') {
        setCurrentTheme('dark');
      } else {
        setCurrentTheme('light');
      }
    }
  }, [isAuto]);

  const toggleColorScheme = () => {
    if (!isAuto) {
      setIsAuto(true); 
      const systemColorScheme = Appearance.getColorScheme();
      if (systemColorScheme === 'dark') {
        setCurrentTheme('dark');
      } else {
        setCurrentTheme('light');
      }
    } else {
      setIsAuto(false); 
      setCurrentTheme((prevColorScheme: ColorScheme) => {
        if (prevColorScheme === 'light') {
          return 'dark';
        } else {
          return 'light';
        }
      });
    }
  };

  const operatingSystemScheme = useColorScheme();
  const selectedScheme = isAuto ? operatingSystemScheme : currentTheme;

  const theme: Theme =
    selectedScheme === 'dark'
      ? AppDarkTheme
      : AppLightTheme;

  return (
    <ThemeContext.Provider value={{ theme, setColorScheme: toggleColorScheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}


















// import React, { createContext, useContext, ReactNode, PropsWithChildren, useState } from 'react';
// import { Theme } from '../data/theme';
// import { useColorScheme } from "react-native";
// import { PaperProvider } from "react-native-paper";
// import { AppDarkTheme, AppLightTheme } from "../data/theme";

// type ColorScheme = "light" | "dark" | "auto";

// // type ThemeContextValue = (colorScheme: ColorScheme) => void;
// type ThemeContextValue = {
//   theme: Theme;
//   setColorScheme: (colorScheme: ColorScheme) => void;
// };



// // const ThemeContext = createContext<ThemeContextValue>(
// //   () => {
    
// //   }
// // );
// const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);



// const theme = require('../data/theme').default; 


// export const useTheme = () => {
//   const themeContext = useContext(ThemeContext);
//   if (!themeContext) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return themeContext;
// };


// export default function ThemeProvider({
//   children,
// }: PropsWithChildren) {
//   // Temat som användaren har valt i appen
//   const [colorScheme, setColorScheme] =
//     useState<ColorScheme>("auto");

//   // Temat som OS'et föreslår
//   const operatingSystemScheme = useColorScheme();

//   // Temat som faktiskt ska användas
//   const selectedScheme =
//     colorScheme === "auto"
//       ? operatingSystemScheme
//       : colorScheme;

//   // Välj rätt temaobjekt utifrån valt tema
//   const theme: Theme =
//     selectedScheme === "dark"
//       ? AppDarkTheme
//       : AppLightTheme;

//   return (
//     <ThemeContext.Provider value={{ theme, setColorScheme }}>
//       <PaperProvider theme={theme}>
       
//           {children}
        
//       </PaperProvider>
//     </ThemeContext.Provider>
//   );
// }

// export const useSetColorTheme = () =>
//   useContext(ThemeContext);


















