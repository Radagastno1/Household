import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import CircleComponent from "../components/CircleComponent";

//här skapar man en task som ägare för hushållet
export default function CreateTaskScreen() {
  const [intervalDataPressed, setIntervalDataPressed] = useState(false);
  const [selectedValue, setSelectedValue] = useState(7);

  const intervalData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Titel"
            style={styles.input}
            textAlignVertical="center"
            returnKeyType="done"
          ></TextInput>
          <TextInput
            placeholder="Beskrivning"
            style={styles.input}
            multiline
            numberOfLines={4}
            blurOnSubmit={true}
            textAlignVertical="top"
            returnKeyType="done"
          ></TextInput>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "pink",
                }}
              >
                <View style={{ backgroundColor: "red" }}>
                  <Title>Återkommer:</Title>
                </View>

                <View style={{ flexDirection: "row", backgroundColor: "blue" }}>
                  <Title>Var </Title>
                  <TouchableOpacity
                    onPress={() => setIntervalDataPressed(true)}
                  >
                    <CircleComponent number={selectedValue} color="lightgrey" />
                  </TouchableOpacity>
                  <Title> dag</Title>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                {intervalDataPressed
                  ? intervalData.map((number) => (
                      <TouchableOpacity
                        onPress={() => setSelectedValue(number)}
                      >
                        <CircleComponent number={number} color="lightgrey" />
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View>
                <Title>Värde:</Title>
                <Paragraph>Hur energikrävande är sysslan?</Paragraph>
              </View>
              <Title style={styles.circle}>2</Title>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.fillOutContainer}></View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button]} onPress={() => {}}>
            <Feather name="plus-circle" size={24} color="black" />
            <Text style={styles.buttonText}>Spara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={() => {}}>
            <AntDesign name="closecircleo" size={24} color="black" />
            <Text style={styles.buttonText}>Stäng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 10,
  },
  fillOutContainer: {
    flexGrow: 1 / 3,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "white",
    elevation: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    backgroundColor: "white",
  },
  cardContent: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  circle: {
    borderRadius: 50,
    height: 35,
    width: 35,
    backgroundColor: "lightgrey",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  carouselItem: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  carouselText: {
    textAlign: "center",
  },
  paginationContainer: {
    paddingTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
