import React from "react";
import { Profile } from "../types";
import { Modal, Portal, Card, Avatar, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { AvatarColors, Avatars, AvatarUrls } from "../data/avatars";

interface HouseholdProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  householdName: string;
  selectedAvatar: string;
  profiles: Profile[]; 
}

const HouseholdProfileModal: React.FC<HouseholdProfileModalProps> = ({
  visible,
  onDismiss,
  householdName,
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
             <Avatar.Image
               source={{ uri: AvatarUrls[profile.avatar as Avatars] }}
               size={50}
               style={{ backgroundColor: AvatarColors[profile.avatar as Avatars] }}
             />
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
    fontSize: 20,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
});

export default HouseholdProfileModal;
