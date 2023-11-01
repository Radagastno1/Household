import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CircleComponent from "./CircleComponent";

interface Props{
    isShowing: boolean;
    intervalArray: number[];
    circleBackgroundColor: string;
    getCircleBackgroundColor?: (energyWeight: number | undefined) => string;
    onNumberSelect: (selectedNumber: number) => void;
}

export default function CircleIntervalView(props:Props){
    return(
        <View style={{ flexDirection: "row" }}>
        {props.isShowing
          ? props.intervalArray.map((number) => (
              <TouchableOpacity
                key={number.toString()}
                onPress={() => {
                    props.onNumberSelect(number);
                  }}
              >
             <CircleComponent
                number={number}
                backgroundColor={props.getCircleBackgroundColor ? props.getCircleBackgroundColor(number) : props.circleBackgroundColor}
                color="black"
              />
              </TouchableOpacity>
            ))
          : null}
      </View>
    );
}