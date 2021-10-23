import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigation from "./src/navigations/AppNavigation";
import NavigationTheme from "./src/navigations/NavigationTheme";

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}
