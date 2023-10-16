import React from "react";
import { Modal, Portal, Card, Avatar, Text } from "react-native-paper";

interface HouseholdProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  householdName: string;
  avatars: string[];
}

const HouseholdProfileModal: React.FC<HouseholdProfileModalProps> = ({
  visible,
  onDismiss,
  householdName,
  avatars,
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card>
          <Card.Title title={householdName} />
          <Card.Content>
            <Text>Medlemmar:</Text>
            {avatars.map((avatar, index) => (
              <Avatar.Image key={index} source={{ uri: avatar }} size={50} />
            ))}
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default HouseholdProfileModal;


