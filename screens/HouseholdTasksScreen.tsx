import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {

  TouchableOpacity,
  Image,
  
  Platform,
} from "react-native";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { RootStackParamList } from "../navigators/RootNavigator";
import { View,  StyleSheet,  } from "react-native";

// ska knna gå till lägg till ny task OM du är ägare för hushålllet
//här listas alla sysslor i hushållet. nullas från avatarer varje midnatt.
//vilka som gjort sysslan ska visas bredvid sysslan
//hur många dagar sedan den gjordes
//samt om den är försenad visa siffran med röd färg

export default function HouseholdTasksScreen({ navigation }: any) {
  const _goBack = () => console.log("Went back");
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const _handleMore = () => console.log("Shown more");


  return (
    <View>
      <Text>Här visas alla tasks för det valda hushållet</Text>
    </View>
  );
}
