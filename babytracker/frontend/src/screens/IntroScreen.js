import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Button } from "react-native-paper";

import colors from "../config/colors";

function IntroScreen({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate("Register");
  };
  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/baby.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            alignSelf: "center",
            bottom: Dimensions.get("screen").height * 0.13,
            position: "absolute",
          }}
        >
          <Button
            mode="contained"
            onPress={handleSignUp}
            theme={{
              colors: { primary: colors.primary },
            }}
            style={styles.button}
          >
            sign up
          </Button>

          <Button
            mode="outlined"
            onPress={handleSignIn}
            theme={{
              colors: { primary: colors.primary },
            }}
            style={[styles.button, { marginTop: 10 }]}
          >
            Log in
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    borderRadius: 15,
    width: Dimensions.get("screen").width * 0.6,
  },
});

export default IntroScreen;
