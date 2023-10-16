import { Text, Button, Card } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "../store/store";
import { findTaskById } from "../store/tasks/taskSlice";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// type Props = {
// navigation: NativeStackScreenProps<RootStackParamList, "ShowTask">;
// route: RouteProp<RootStackParamList, "ShowTask">;
// }
export default function TaskDetailScreen({ navigation, route }: any) {
  const { theme } = useTheme();
  const { taskId } = route.params;
  const taskSlice = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (taskId) {
      dispatch(findTaskById({ id: taskId }));
    }
  }, [dispatch, taskId]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.taskItem}>
            <View style={styles.titleContainer}>
              <Text variant="titleLarge">{taskSlice.tasks[0].title}</Text>
            </View>
            <View>
              {/* {isOwner && ( */}
              <Button
                icon={({ size, color }) => (
                  <MaterialIcons name="edit" size={24} color="black" />
                )}
                mode="elevated"
                onPress={() => navigation.navigate("HandleTask")}
                style={styles.changeButton}
              >
                Ändra
              </Button>
              {/* )} */}
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.descriptionContainer}>
        <Text variant="bodyMedium">{taskSlice.tasks[0].description}</Text>
      </View>
      <View style={styles.intervalValueContainer}>
        <View style={styles.intervalContainer}>
          <View>
            <Text style={styles.intervalValueText}>Återcommande</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.intervalValueText}>1</Text>
          </View>
        </View>
        <View style={styles.intervalContainer}>
          <View>
            <Text style={styles.intervalValueText}>Värde</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.intervalValueText}>1</Text>
          </View>
        </View>
      </View>
      <View style={styles.klarButtonContainer}>
        <Button
          mode="text"
          onPress={() => console.log("klar")}
          style={[styles.klarButton, theme.button]}
        >
          <Text style={[styles.klarButton, theme.buttonText]}>Klar</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
  card: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
  },

  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    padding: 10,
  },
  descriptionContainer: {
    flex: 1,
  },

  intervalValueContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent:"space-between"
  },
  intervalContainer:{
marginRight:10,
alignItems:"center"
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50, 
    backgroundColor: "lightgrey", 
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  intervalValueText: {

  },
  changeButton: {
    height: 40,
    width: 100,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    margin: 10,
  },
  klarButtonContainer: {
    // marginBottom:40,
    flex: 1,
  },
  klarButton: {},
});
