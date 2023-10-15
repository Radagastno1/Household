import { Text, Button,Card} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from  "../contexts/themeContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "../store/store";
import { findTaskById} from "../store/tasks/taskSlice";
import { AntDesign } from "@expo/vector-icons";
// type Props = {
// navigation: NativeStackScreenProps<RootStackParamList, "ShowTask">;
// route: RouteProp<RootStackParamList, "ShowTask">;
// }
export default function TaskDetailScreen({ navigation,route }: any) {
    const {theme} = useTheme();
    const {taskId} = route.params;
    const taskSlice = useAppSelector((state) => state.task);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (taskId) {
          dispatch(findTaskById({ id:taskId }));
        }
      }, [dispatch, taskId]);
     
  return (
    <View style={styles.container}>
           <Card style={styles.card}>
          <View style={styles.taskItem}>
            <View>
              <Text variant="titleLarge">{taskSlice.tasks[0].title}</Text>
            </View>
           <View>
             {/* {isOwner && ( */}
           <Button
            icon={() => (
              <AntDesign name="pluscircleo" size={20} color="black" />
            )}
            mode="outlined"
            onPress={() => navigation.navigate("HandleTask")}
            style={styles.changeButton}
          >
            Ändra
          </Button>
          {/* )} */}
           </View>
          </View>
        </Card>
        <View>
              <Text variant="bodyMedium">{taskSlice.tasks[0].description}</Text>
            </View>
        <View style={[styles.buttonContainer, theme.button]}>
        <Button
            mode="outlined"
          onPress={() => console.log("klar")}
          
          >
            Klar
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
  buttonContainer: {
    // Add any container-specific styles here
  },
  changeButton:{
   
        height: 40,
        width: 120,
      
  }
});
