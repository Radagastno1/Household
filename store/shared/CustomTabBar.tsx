// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TabBar } from 'react-native-tab-view';

// interface CustomTabBarProps {
//   state: any;
//   descriptors: any;
//   navigation: any;
//   position: any;
// }

// const CustomTabBar: React.FC<CustomTabBarProps> = (props) => {
//   const { state, descriptors, navigation, position } = props;
//   const tabWidth = 100 / state.routes.length;

//   return (
//     <View style={styles.container}>
//       {state.routes.map((route: any, index: number) => {
//         const isFocused = state.index === index;
//         const tabLabel =
//           descriptors[route.key].options.tabBarLabel || route.name;

//         return (
//           <View
//             key={route.key}
//             style={[
//               styles.tab,
//               { width: `${tabWidth}%` },
//               isFocused && styles.activeTab,
//             ]}
//           >
//             <Text style={styles.tabText}>{tabLabel}</Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#4c00b0',
//   },
//   tab: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: '#e91e63',
//   },
//   tabText: {
//     color: 'white',
//   },
// });

// export default CustomTabBar;
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = (props) => {
  const { state, descriptors, navigation, position } = props;
  const activeRoute = state.routes[state.index];
  const tabLabel =
    descriptors[activeRoute.key].options.tabBarLabel || activeRoute.name;

  const goBack = () => {
    const currentIndex = state.routes.findIndex(
      (route: { key: any }) => route.key === activeRoute.key,
    );
    if (currentIndex > 0) {
      const prevRoute = state.routes[currentIndex - 1];
      navigation.navigate(prevRoute.name);
    } else {
      navigation.navigate("ProfileAccount");
    }
  };

  const goForward = () => {
    const currentIndex = state.routes.findIndex(
      (route: { key: any }) => route.key === activeRoute.key,
    );
    if (currentIndex < state.routes.length - 1) {
      const nextRoute = state.routes[currentIndex + 1];
      navigation.navigate(nextRoute.name);
    }
  };

  const isHouseholdTaskScreen = activeRoute.name === "HouseholdTasks";

  return (
    <View style={styles.container}>
      {!isHouseholdTaskScreen && (
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      <View style={[styles.tab, styles.activeTab]}>
        <Text style={styles.tabText}>{tabLabel}</Text>
      </View>
      <TouchableOpacity onPress={goForward}>
        <AntDesign name="arrowright" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeTab: {},
  tabText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CustomTabBar;
