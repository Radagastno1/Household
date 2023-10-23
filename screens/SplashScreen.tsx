import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../navigators/RootNavigator";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const beeAnimation = new Animated.Value(0);
  const loginScreenHeight = new Animated.Value(0);
  const windowHeight = Dimensions.get("window").height;
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Login">>();

  useEffect(() => {
    if (isLoading) {
      // Simulate a loading process
      setTimeout(() => setIsLoading(false), 3000);
    } else {
      Animated.timing(beeAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(loginScreenHeight, {
          toValue: windowHeight, // Expand to the full height of the screen
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          setTimeout(() => {
            navigation.replace("Login");
          }, 1000); // start 1 seconds earlier
        });
      });
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.flyingBee,
          {
            transform: [
              {
                translateY: beeAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -windowHeight / 2],
                }),
              },
            ],
          },
        ]}
      >
        <Video
          source={require("../assets/bee-animation-yellow.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          shouldPlay
          isLooping={true}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 300,
    height: 200,
  },
  loadingText: {
    fontSize: 24,
  },
  flyingBee: {
    position: "absolute",
    opacity: 1,
  },
});
