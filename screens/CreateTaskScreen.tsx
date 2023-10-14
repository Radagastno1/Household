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
export default function CreateTaskScreen({ navigation }: any) {
  const [intervalDataPressed, setIntervalDataPressed] = useState(false);
  const [energyDataPressed, setEnergyDataPressed] = useState(false);
  const [selectedValue, setSelectedValue] = useState(7);
  const [selectedEnergy, setSelectedEnergy] = useState(7);

  const intervalData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const energyData: number[] = [1, 2, 4, 6, 8];

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
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
                }}
              >
                <View>
                  <Title style={{ fontWeight: "bold" }}>Återkommer:</Title>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Title>Var </Title>
                  <TouchableOpacity
                    onPress={() => setIntervalDataPressed(true)}
                  >
                    <CircleComponent
                      number={selectedValue}
                      backgroundColor="red"
                      color="white"
                    />
                  </TouchableOpacity>
                  <Title> dag</Title>
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {intervalDataPressed
                  ? intervalData.map((number) => (
                      <TouchableOpacity
                        key={number.toString()}
                        onPress={() => {
                          setSelectedValue(number),
                            setIntervalDataPressed(false);
                        }}
                      >
                        <CircleComponent
                          number={number}
                          backgroundColor="lightgrey"
                          color="black"
                        />
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Title style={{ fontWeight: "bold" }}>Värde:</Title>
                  <Paragraph>Hur energikrävande är sysslan?</Paragraph>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setEnergyDataPressed(true);
                    }}
                  >
                    <CircleComponent
                      number={selectedEnergy}
                      backgroundColor="lightgrey"
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                {energyDataPressed
                  ? energyData.map((number) => (
                      <TouchableOpacity
                        key={number.toString()}
                        onPress={() => {
                          setSelectedEnergy(number),
                            setEnergyDataPressed(false);
                        }}
                      >
                        <CircleComponent
                          number={number}
                          backgroundColor="lightgrey"
                          color="black"
                        />
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* <View style={styles.fillOutContainer}></View> */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Tab");
            }}
          >
            <Feather name="plus-circle" size={24} color="black" />
            <Text style={styles.buttonText}>Spara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.navigate("Tab");
            }}
          >
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
    marginTop: 80,
    flex: 1,
    // justifyContent: "space-around",
    padding: 10,
  },
  scrollViewContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
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
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    backgroundColor: "white",
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: "column",
    paddingVertical: 15,
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
    fontWeight: "bold",
  },
});
