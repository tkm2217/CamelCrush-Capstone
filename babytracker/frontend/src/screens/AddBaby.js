import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button, withTheme, TextInput, RadioButton } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";
import { useUser } from "../hooks/useUser";
import DatePicker from "../components/DatePicker";

function AddBaby({ theme }) {
  const [name, setName] = useState("");
  const [isMale, setIsMale] = useState(true);
  const [DOB, setDOB] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { darkTheme } = useUser();
  const { colors: papercolors } = theme;

  const handleAdd = () => {
    if (!name) return;
    setLoading(true);

    const { uid } = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        babies: firebase.firestore.FieldValue.arrayUnion({
          name,
          dateOfBirth: DOB,
          dateOfBirthString: DOB.toDateString(),
          gender: isMale ? "male" : "female",
        }),
      })
      .then(() => {
        Alert.alert("Added", "Successfully added new baby.");
        setLoading(false);
      });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: papercolors.background }]}
    >
      <Text style={styles.topText}>Adding your baby information !</Text>

      <TextInput
        mode="outlined"
        label="Baby Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter baby name"
        style={styles.TextInput}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <RadioButton
            value="Male"
            status={isMale ? "checked" : "unchecked"}
            onPress={() => setIsMale(true)}
            color={colors.primary}
          />
          <Text
            style={{
              color: darkTheme ? colors.white : colors.black,
              fontSize: 16,
            }}
          >
            Male
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <RadioButton
            value="Female"
            status={!isMale ? "checked" : "unchecked"}
            onPress={() => setIsMale(false)}
            color={colors.primary}
          />
          <Text
            style={{
              color: darkTheme ? colors.white : colors.black,
              fontSize: 16,
            }}
          >
            Female
          </Text>
        </View>
      </View>

      <DatePicker
        title="Date of Birth"
        placeholder="Pick a date of birth"
        date={DOB}
        setDate={setDOB}
        style={styles.TextInput}
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={handleAdd}
        style={styles.button}
      >
        add
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topText: {
    color: colors.primary,
    alignSelf: "center",
    fontSize: 20,
    marginVertical: 30,
  },
  TextInput: {
    marginVertical: 5,
  },
  button: {
    borderRadius: 15,
    marginTop: 30,
    width: "70%",
    alignSelf: "center",
  },
});

export default withTheme(AddBaby);
