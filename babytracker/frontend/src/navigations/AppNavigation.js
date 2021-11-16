import React from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import * as secureStore from "expo-secure-store";
import firebase from "firebase";

import HomeScreen from "../screens/HomeScreen";
import colors from "../config/colors";
import { useUser } from "../hooks/useUser";
import useAuthentication from "../hooks/useAuthentication";
import AddBaby from "../screens/AddBaby";
import BabiesList from "../screens/BabiesList";

const Stack = createNativeStackNavigator();

const FindStack = () => {
  const { darkTheme, setDarkTheme } = useUser();
  const { signOut } = useAuthentication();

  const handleThemeChange = async () => {
    setDarkTheme(!darkTheme);
    await secureStore.setItemAsync("theme", JSON.stringify(!darkTheme));
  };

  return (
    <Stack.Navigator
      initialRouteName="CamelCrush"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="CamelCrush"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="account-circle"
                size={32}
                color={colors.white}
              />
              <Text
                style={{ textTransform: "capitalize", color: colors.white }}
              >
                {firebase.auth().currentUser.displayName}
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Switch
                value={darkTheme}
                onValueChange={handleThemeChange}
                color={colors.black}
              />
              <Ionicons
                name="settings-outline"
                size={24}
                color={colors.white}
                style={{ marginRight: 7 }}
              />
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={colors.white}
                onPress={() => signOut()}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Add New Baby"
        component={AddBaby}
        options={{
          headerLeft: () => (
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="account-circle"
                size={32}
                color={colors.white}
              />
              <Text
                style={{ textTransform: "capitalize", color: colors.white }}
              >
                {firebase.auth().currentUser.displayName}
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="All Babies"
        component={BabiesList}
        options={{
          headerLeft: () => (
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="account-circle"
                size={32}
                color={colors.white}
              />
              <Text
                style={{ textTransform: "capitalize", color: colors.white }}
              >
                {firebase.auth().currentUser.displayName}
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default FindStack;
