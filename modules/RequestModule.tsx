import React from "react";
import { Profile } from "../types";
import { Modal, Portal, Card, Text } from "react-native-paper";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { AvatarColors, Avatars, AvatarUrls } from "../data/avatars";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/themeContext";

interface RequestProps {
  visible: boolean;
  onDismiss: () => void;
  householdName: string;
  selectedAvatar: string;
  email: string;
}

export default function RequestModule({
  visible,
  onDismiss,
  householdName,
  selectedAvatar,
  email,
}: RequestProps) {
  const theme = useTheme();

  function approveFollowRequest() {
    console.log("NU GODKÄNNS ANVÄNDAREN");
    onDismiss();
  }

  function declineFollowRequest() {
    console.log("NU NEKAS ANVÄNDAREN");
    onDismiss();
  }

  const viewAvatar = () => {
    return (
      <View>
        <Image
          source={{
            uri: AvatarUrls[selectedAvatar as Avatars],
          }}
          style={{
            height: 20,
            width: 20,
          }}
          alt={selectedAvatar}
        />
      </View>
    );
  };
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card>
          <Card.Title title="Ansluta sig till hushållet" />
          <Card.Content>
            <View style={{}}>
              <Text style={{ fontSize: 18, rowGap: 5 }}>
                Får användare {email} {viewAvatar()} ansluta hushållet{" "}
                {householdName}?
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={approveFollowRequest}
              >
                <Feather name="plus-circle" size={30} color="black" />
                <Text style={styles.buttonText}>Ja</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button]}
                onPress={declineFollowRequest}
              >
                <AntDesign name="closecircleo" size={28} color="black" />
                <Text style={styles.buttonText}>Nej</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 20,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
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
