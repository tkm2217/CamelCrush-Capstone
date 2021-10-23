import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

import colors from "../config/colors";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    navigation.navigate("CamelCrush");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 130,
          justifyContent: "center",
        }}
      >
        <Text style={styles.successText}>Account Created Successfully!</Text>
        <Text style={styles.loginText}>
          Log in with your email and password
        </Text>
      </View>

      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.TextInput}
        theme={{
          colors: { primary: colors.primary },
        }}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.TextInput}
        theme={{
          colors: { primary: colors.primary },
        }}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        theme={{
          colors: { primary: colors.primary },
        }}
        style={styles.button}
      >
        log in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  TextInput: {
    backgroundColor: colors.white,
    marginVertical: 5,
  },
  button: {
    borderRadius: 15,
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  successText: {
    color: colors.primary,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginText: {
    color: colors.primary,
    alignSelf: "center",
    fontSize: 20,
  },
});

export default LoginScreen;
