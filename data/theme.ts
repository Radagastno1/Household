import { DefaultTheme } from 'react-native-paper';

export type Theme = {
  colors: {
    primary: string;
    background: string;
  };
  fonts: {
  };
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
    primary: 'blue',
    background: 'white',
  },
  fonts: {
  },
  button: {
    backgroundColor: 'yellow',
    padding: 10,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    width: 300,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
};

export default theme;




  
  
  
  