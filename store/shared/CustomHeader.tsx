import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { useTheme } from "../../contexts/themeContext";
import { useAppSelector } from "../../store/store";

interface CustomHeaderProps {
  title: string;
  navigation: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation }) => {
  const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const [houseTitle, setHouseTitle] = useState<string>("");
  const activeProfile = useAppSelector((state) => state.profile.activeProfile);
  const households = useAppSelector((state) => state.household.households);
  const household = households.find((h) => h.id === activeProfile?.householdId);
  const { theme } = useTheme();
  const headerTextColor = "gray";
  useEffect(() => {
    if (isFocused) {
      if (household) {
        setHouseTitle(household.name);
      }
    }
  }, [isFocused]);
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileAccount")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={theme.buttonText as any}>
          <Text style={[styles.headerText, { color: theme.buttonText.color }]}>
            {houseTitle}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("HouseholdAccount")}
        >
          <Appbar.Action
            icon={() => (
              <Image
                source={require("../../assets/pngwing.com.png")}
                style={styles.beeHomeImage}
              />
            )}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    paddingHorizontal: 5,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  beeHomeImage: {
    width: 25,
    height: 30,
    marginRight: 20,
  },
});

export default CustomHeader;
