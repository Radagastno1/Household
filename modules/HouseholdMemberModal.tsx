import React from "react";
import { Profile } from "../types";
import { Modal, Portal, Card, Avatar, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native"; // Importera View och StyleSheet

interface HouseholdProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  householdName: string;
  avatars: string[];
  profiles: Profile[]; // Tillägg av denna parameter beroende på din datamodell
}

const HouseholdProfileModal: React.FC<HouseholdProfileModalProps> = ({
  visible,
  onDismiss,
  householdName,
  avatars,
  profiles,
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card>
          <Card.Title title={householdName} />
          <Card.Content>
            <Text>Medlemmar:</Text>
            {profiles.map((profile, index) => (
              <View key={index} style={styles.profileContainer}>
                <Avatar.Image source={{ uri: profile.avatar }} size={50} />
                <Text style={styles.profileName}>{profile.profileName}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profileName: {
    marginLeft: 10,
  },
  // ... (andra stilar)
});

export default HouseholdProfileModal;



