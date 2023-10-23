import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { setHouseholdByHouseholdId } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Household } from "../types";

import { RootNavigationScreenProps } from "../navigators/navigationTypes";

import React, { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { fetchAllProfilesByHousehold } from "../store/profile/profileSlice";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Directions } from 'react-native-gesture-handler';

type HouseholdProps = RootNavigationScreenProps<"HouseholdAccount">;

export default function HouseholdAccountScreen({ navigation }: HouseholdProps) {
  //att få state på user verkar inte funka än - det ska in sen
  //för nu så hårdkodar vi ett user id
  // const activeUser = useAppSelector((state) => state.user.user);
  const mockedUserId = "5NCx5MKcUu6UYKjFqRkg";
  const dispatch = useAppDispatch();
  const householdSlice = useAppSelector((state) => state.household);
  const allHouseholds = householdSlice.households;
  // const {setColorScheme} = useSetColorTheme();
  const { theme } = useTheme();
  const { setColorScheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("auto");
  const fling = Gesture.Fling();
  fling.direction(Directions.RIGHT | Directions.LEFT);

  const handleEnterHousehold = async (householdId: string) => {
    console.log("HUS HÅLLSID: ", householdId);
    dispatch(setHouseholdByHouseholdId({ householdId: householdId }));

    try {
      // Fetch all profiles for the household
      await dispatch(fetchAllProfilesByHousehold(householdId, mockedUserId));

      // Navigate to the ProfileAccount screen
      navigation.navigate("ProfileAccount", {
        householdId: householdId,
      });
    } catch (error) {
      console.error("Error entering household:", error);
    }
  };

  // const handleToggleDarkMode = () => {
  //   // You can change the color scheme dynamically
  //   setColorScheme('dark');
  // };

  const handleToggleTheme = () => {
    if (setColorScheme) {
      switch (currentTheme) {
        case "light":
          setColorScheme("dark");
          setCurrentTheme("dark");
          break;
        case "dark":
          setColorScheme("auto");
          setCurrentTheme("auto");
          break;
        case "auto":
          setColorScheme("light");
          setCurrentTheme("light");
          break;
        default:
          break;
      }
    } else {
      console.error("setColorScheme is not defined.");
    }
  };

  const _handleMore = () => console.log("Shown more");

  return (
    <View >
      <View style={{marginBottom:40}}>
        <Appbar.Header style={{ height: 70, backgroundColor: "white"}}>
          <Appbar.Content
            style={{
              alignItems: "center", 
              justifyContent: "center", 
            }}
            title="wellcome username"
          />
          {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
        </Appbar.Header>
      </View>
      {allHouseholds.map((household: Household) => (
       
        <Card
          style={styles.card}
          onPress={() => {
            handleEnterHousehold(household.id);
          }}
        >
          <View style={styles.taskItem}>
            <View>
              <Text variant="bodyMedium">avatar</Text>
            </View>
            <View>
              <Text variant="titleLarge">{household.name}</Text>
            </View>
            <View>
           {/* if it is owner */}
                <MaterialIcons name="edit" size={24} color="black" />
                  
            </View>
          </View>
        </Card>
        
      ))}

      <View style={{ justifyContent: "center",alignItems:"center" }}>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={theme.buttonText}>logg ut</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skapaButton}
          onPress={() => console.log("log out")}
        >
          <View style={styles.createHouseholdButtonContent}>
            <AntDesign name="pluscircleo" size={20} color="black" />
            <Text style={styles.buttonText}>Skapa hushåll</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.themeButtonContainer}
          onPress={() => console.log("log out")}
        >
          <View style={styles.themeButton}>
            
            <Text style={styles.themeButtonText}>themebutton</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <GestureDetector gesture={fling}>
      <Animated.View />
    </GestureDetector> */}
     </View>
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position:"absolute" 
 },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
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
  logOutButton: {
    padding: 10,
    alignItems: "center",
    width: "80%",
    marginTop: 60,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: "lightgrey",
  },

  skapaButton: {
    padding: 10,
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: "#FFD700",
    marginTop:30,
  },
  createHouseholdButtonContent: {
    flexDirection: "row", // Align icon and text in the same row
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    marginLeft:10,
  }, 
  themeButtonContainer: {
    padding: 20,
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: "#FFD700",
    marginTop:40,
    position:"relative"

  },
  themeButtonText: {
    color: "black",
    fontSize: 16,
    margin:10,
  },
    themeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      paddingHorizontal: 20,
    },
  //   themeButton: {
  //     position: 'absolute',
  //     width: 150, // Adjust as needed
  //     height: 50, // Adjust as needed
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderWidth: 1,
  //     borderColor: 'black',
  //   },
  //   button1: {
  //     backgroundColor: 'red',
  //     top: 50, // Adjust to overlap halfway
  //   },
  //   button2: {
  //     backgroundColor: 'blue',
  //     top: 25, // Adjust to overlap halfway
  //   },
});
