import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import colors from "../config/colors";

const stack = createNativeStackNavigator();

const AuthStack = () => (
  <stack.Navigator
    initialRouteName="Intro"
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
    }}
  >
    <stack.Screen
      name="Intro"
      component={IntroScreen}
      options={{ title: "Welcome!" }}
    />
    <stack.Screen name="Login" component={LoginScreen} />
    <stack.Screen name="Register" component={RegisterScreen} />
  </stack.Navigator>
);

export default AuthStack;
