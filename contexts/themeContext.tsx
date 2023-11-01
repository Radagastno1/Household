import React, { createContext, useContext, ReactNode, PropsWithChildren, useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Appearance, ColorSchemeName } from 'react-native';
import { AppDarkTheme, AppLightTheme } from '../data/theme';
import { Theme } from '../data/theme';
import { useColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark' | 'auto';

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
  const [isAuto, setIsAuto] = useState<boolean>(true);

  useEffect(() => {
    const systemColorScheme: ColorSchemeName = Appearance.getColorScheme() as ColorSchemeName;

    if (isAuto) {
      setCurrentTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [isAuto]);

  useEffect(() => {
    const onChange = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      if (currentTheme === 'auto') {
        const newTheme = colorScheme === 'dark' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
      }
    };

    const subscription = Appearance.addChangeListener(onChange);

    return () => {
      subscription.remove();
    };
  }, [currentTheme]);

  useEffect(() => {
    if (isAuto) {
      const systemColorScheme: ColorSchemeName = Appearance.getColorScheme() as ColorSchemeName;
      setCurrentTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [isAuto]);

  const toggleColorScheme = (colorScheme: ColorScheme) => {
    setIsAuto(colorScheme === 'auto');  
    setCurrentTheme(colorScheme);
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


















