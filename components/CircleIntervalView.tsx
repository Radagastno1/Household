import React from "react";
import { TouchableOpacity, View } from "react-native";
import CircleComponent from "./CircleComponent";

interface Props{
    isShowing: boolean;
    intervalArray: number[];
    onPress: () => void;
    circleBackgroundColor: string;
    circleBackgroundColors: { [key: number]: string };
}

export default function CircleIntervalView(props:Props){
    return(
        <View style={{ flexDirection: "row" }}>
        {props.isShowing
          ? props.intervalArray.map((number) => (
              <TouchableOpacity
                key={number.toString()}
                onPress={() => {
                    props.onPress();
                }}
              >
                <CircleComponent
                  number={number}
                  backgroundColor={props.circleBackgroundColors[number] || props.circleBackgroundColor}
                  color="black"
                />
              </TouchableOpacity>
            ))
          : null}
      </View>
    );
}