import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import colors from "../config/colors";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeSubmit = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
        style={styles.TextInput}
        theme={{
          colors: { primary: colors.primary },
        }}
      />

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
        onPress={hanldeSubmit}
        theme={{
          colors: { primary: colors.primary },
        }}
        style={styles.button}
      >
        next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
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
});

export default RegisterScreen;
