import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import IntroScreen from "../screens/IntroScreen";
import colors from "../config/colors";

const Stack = createNativeStackNavigator();

const FindStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ title: "Welcome!" }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CamelCrush"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <MaterialCommunityIcons
              name="account-circle"
              size={32}
              color={colors.white}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={colors.white}
              // style={{ marginRight: 7 }}
            />
          ),
        }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default FindStack;

// <View
//   style={{
//     flexDirection: "row",
//     alignItems: "center",
//   }}
// >

{
  /* <MaterialCommunityIcons
                name="logout"
                size={24}
                color={colors.white}
              />
            </View> */
}
