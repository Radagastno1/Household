// import React from "react";
// import { StyleSheet, View } from "react-native";
// import Carousel from "react-native-snap-carousel";

// interface Props {
//   data: number[];
//   selectedValue: number;
//   onSnapToItem: (index: number) => void;
//   circleComponent: React.ReactElement[];
// }

// export default function CarouselComponent({
//   data,
//   onSnapToItem,
//   selectedValue,
//   circleComponent,
// }: Props) {
//   return (
//     <View>
//       <Carousel
//         data={circleComponent}
//         renderItem={({ item }) => item}
//         sliderWidth={300}
//         itemWidth={50}
//         onSnapToItem={onSnapToItem}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   carouselItem: {
//     backgroundColor: "lightgray",
//     borderRadius: 5,
//     padding: 10,
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   carouselText: {
//     textAlign: "center",
//   },
//   paginationContainer: {
//     paddingTop: 10,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 8,
//   },
// });
