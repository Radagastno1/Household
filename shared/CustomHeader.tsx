import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";

interface CustomHeaderProps {
  title: string;
  navigation: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("HouseholdAccount")}>
        <Appbar.Action
          icon={({ size, color }) => (
            <Image
              source={require("../assets/bee-home.png")}
              style={styles.beeHomeImage}
            />
          )}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 60, 
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: 20,
    height: 30,
    marginRight: 20,
  },
});

export default CustomHeader;
