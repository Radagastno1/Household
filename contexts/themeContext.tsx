
import React, { createContext, useContext, ReactNode, PropsWithChildren, useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Appearance } from 'react-native';
import { AppDarkTheme, AppLightTheme } from '../data/theme';
import { Theme } from '../data/theme';
import { useColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark' | 'Auto';

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
  const [currentTheme, setCurrentTheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const systemColorScheme = Appearance.getColorScheme();
    setCurrentTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleColorScheme = (colorScheme: ColorScheme) => {
    setCurrentTheme(colorScheme);
  };

  const operatingSystemScheme = useColorScheme();

  const theme: Theme =
    currentTheme === 'dark'
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


// import React, { createContext, useContext, ReactNode, PropsWithChildren, useEffect, useState } from 'react';
// import { ColorSchemeName } from 'react-native';
// import { PaperProvider } from 'react-native-paper';
// import { Appearance } from 'react-native';
// import { AppDarkTheme, AppLightTheme } from '../data/theme';
// import { Theme } from '../data/theme';
// import { useColorScheme } from 'react-native';

// type ColorScheme = ColorSchemeName | 'auto';

// type ThemeContextValue = {
//   theme: Theme;
//   setColorScheme: (colorScheme: ColorScheme) => void;
// };

// const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

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
//   const [isAuto, setIsAuto] = useState<boolean>(true);
//   const [currentTheme, setCurrentTheme] = useState<ColorScheme>('auto');

//   useEffect(() => {
//     if (isAuto) {
//       const systemColorScheme = Appearance.getColorScheme();
//       setCurrentTheme(systemColorScheme);
//     }
//   }, [isAuto]);

//   const toggleColorScheme = (colorScheme: ColorScheme) => {
//     if (!isAuto) {
//       setIsAuto(true); 
//       setCurrentTheme((prevColorScheme: ColorScheme) => {
//         if (prevColorScheme === 'light') {
//           return 'dark';
//         } else {
//           return 'light';
//         }
//       });
//     } else {
//       setIsAuto(false);
//       setCurrentTheme(colorScheme);
//     }
//   };

//   const operatingSystemScheme = useColorScheme();
//   const selectedScheme = isAuto ? operatingSystemScheme : currentTheme;
//   // Använd selectedScheme när "Auto" är valt och currentTheme annars
//   const theme: Theme =
//     isAuto ? 
//       (selectedScheme === 'dark' ? AppDarkTheme : AppLightTheme) :
//       (currentTheme === 'dark' ? AppDarkTheme : AppLightTheme);
  
    

//   return (
//     <ThemeContext.Provider value={{ theme, setColorScheme: toggleColorScheme }}>
//       <PaperProvider theme={theme}>
//         {children}
//       </PaperProvider>
//     </ThemeContext.Provider>
//   );
// }



















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


















