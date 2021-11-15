import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { withTheme } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";
import { useUser } from "../hooks/useUser";

function BabiesList({ theme }) {
  const [babies, setBabies] = useState([]);
  const { darkTheme } = useUser();
  const { colors: papercolors } = theme;

  useEffect(() => {
    const { uid } = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setBabies(snapshot.data().babies);
        }
      });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: papercolors.background }]}
    >
      <View
        style={{
          paddingVertical: 30,
        }}
      >
        <Text style={styles.titleText}>List of all the babies</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.box}>
          <Text
            style={{
              fontWeight: "bold",
              color: darkTheme ? colors.white : colors.black,
            }}
          >
            Name
          </Text>
        </View>
        <View style={styles.box}>
          <Text
            style={{
              fontWeight: "bold",
              color: darkTheme ? colors.white : colors.black,
            }}
          >
            Gender
          </Text>
        </View>
        <View style={[styles.box, { flex: 1.5 }]}>
          <Text
            style={{
              fontWeight: "bold",
              color: darkTheme ? colors.white : colors.black,
            }}
          >
            Date of birth
          </Text>
        </View>
      </View>

      <View>
        <FlatList
          data={babies}
          keyExtractor={(item) => JSON.stringify(item.dateOfBirth)}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.box}>
                <Text
                  style={{
                    color: darkTheme ? colors.white : colors.black,
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <View style={styles.box}>
                <Text
                  style={{
                    color: darkTheme ? colors.white : colors.black,
                  }}
                >
                  {item.gender}
                </Text>
              </View>
              <View style={[styles.box, { flex: 1.5 }]}>
                <Text
                  style={{
                    color: darkTheme ? colors.white : colors.black,
                  }}
                >
                  {item.dateOfBirthString}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    color: colors.primary,
    alignSelf: "center",
    fontSize: 20,
  },
  box: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 7,
    alignItems: "center",
  },
});

export default withTheme(BabiesList);
