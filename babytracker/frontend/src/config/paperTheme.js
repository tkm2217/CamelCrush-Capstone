import { DefaultTheme } from "react-native-paper";
import colors from "../config/colors";

export default {
  ...DefaultTheme,
  roundness: 5,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    placeholder: colors.white,
    // text: colors.white,
    accent: "#f1c40f",
    background: "#121212",
  },
};
