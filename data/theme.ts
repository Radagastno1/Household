import { DefaultTheme } from 'react-native-paper';

export enum Avatars {
  Bee = 'Bee',
  Frog = 'Frog',
  Monkey = 'Monkey',
  Cat = 'Cat',
  Koala = 'Koala',
  Beetle = 'Beetle',
  Fox = 'Fox',
  Pig = 'Pig',
}

export const AvatarColors: Record<Avatars, string> = {
  [Avatars.Bee]: 'yellow',
  [Avatars.Frog]: 'green',
  [Avatars.Monkey]: 'brown',
  [Avatars.Cat]: 'purple',
  [Avatars.Koala]: 'grey',
  [Avatars.Beetle]: 'red',
  [Avatars.Fox]: 'orange',
  [Avatars.Pig]: 'pink',
  // Associera färger med respektive avatar
};

export const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      background: 'white',
    },
    fonts: {
      // Lägg till dina anpassade fontegenskaper här
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
      // Lägg till textstilar för knappar här
      color: 'black',
      fontSize: 16,
    },
    // Övriga stilar och konfigurationer
  };
  
  export default Theme;



  
  
  
  