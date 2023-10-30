import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Card, Modal, Portal, Text } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { HouseholdRequest } from "../types";

interface RequestProps {
  visible: boolean;
  onDismiss: () => void;
  householdName: string;
  acceptRequest: (requestId:string) => void;
  denyRequest: (requestId:string) => void;
  // selectedAvatar: string;
  // email: string;
  requests:HouseholdRequest[]
}

export default function RequestModule({
  visible,
  onDismiss,
   householdName,
  // selectedAvatar,
  // email,
  acceptRequest,
  denyRequest,
  requests
}: RequestProps) {
  const theme = useTheme();

  function approveFollowRequest(requestId:string) {
    console.log("NU GODKÄNNS ANVÄNDAREN");
    acceptRequest(requestId);
    onDismiss();
  }

  function declineFollowRequest(requestId:string) {
    console.log("NU NEKAS ANVÄNDAREN");
    denyRequest(requestId);
    onDismiss();
  }

  // const viewAvatar = () => {
  //   return (
  //     <View>
  //       <Image
  //         source={{
  //           uri: AvatarUrls[selectedAvatar as Avatars],
  //         }}
  //         style={{
  //           height: 20,
  //           width: 20,
  //         }}
  //         alt={selectedAvatar}
  //       />
  //     </View>
  //   );
  // };
  return (
    <Portal>
    <Modal visible={visible} onDismiss={onDismiss}>
      {requests.map((request) => (
        <Card key={request.id}>
          <Card.Title title="Ansluta sig till hushållet" />
          <Card.Content>
            <View style={{}}>
              <Text style={{ fontSize: 18, rowGap: 5 }}>
                Får användare {request.userMail} ansluta hushållet{" "}
                {householdName}?
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={() => approveFollowRequest(request.id)}>
                <Feather name="plus-circle" size={30} color="black" />
                <Text style={styles.buttonText}>Ja</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => {declineFollowRequest(request.id) }}>
                <AntDesign name="closecircleo" size={28} color="black" />
                <Text style={styles.buttonText}>Nej</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      ))}
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
