
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





