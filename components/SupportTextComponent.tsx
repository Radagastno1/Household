import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const SupportText = () => {
  const email = "buzztercontact@gmail.com";
  const supportText = `Vid glömt lösenord eller andra supportärenden`;
  const contactText = "vänligen kontakta ";

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.container}>
      <Text>{supportText}</Text>
      <Text>{contactText}</Text>
      <TouchableOpacity>
        <Text style={styles.email} onPress={handleEmailPress}>
          {email}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
  },
  email: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SupportText;
