import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import { withTheme } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";
import { useUser } from "../hooks/useUser";
function TimeLineScreen({ theme }) {
    const { darkTheme } = useUser();
    const [data, setData] = useState([]);
    const { colors: papercolors } = theme;
  
    useEffect(() => {
      const { uid } = firebase.auth().currentUser;
  
      firebase
        .firestore()
        .collection("activities")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            let temp = [];
  
            snapshot.forEach((activity) => {
              temp.push(activity.data());
            });
  
            setData(temp.sort((a, b) => a.timestamp < b.timestamp));
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
          <Text style={styles.titleText}>Recent Activities</Text>
        </View>
  
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: colors.primary,
                width: "70%",
                alignSelf: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "#7AC9ED",
                  fontSize: 15,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {item.babyName}
              </Text>
              <Text
                style={{
                  color: darkTheme ? colors.white : colors.black,
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                {"*  " + item.activity}
              </Text>
  
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Text
                  style={{
                    color: darkTheme ? colors.white : colors.black,
                    fontSize: 13,
                    alignSelf: "flex-end",
                    marginTop: 15,
                  }}
                >
                  {item.timestampString}
                </Text>
  
                <Text
                  style={{
                    color: darkTheme ? colors.white : colors.black,
                    fontSize: 13,
                    alignSelf: "flex-end",
                    marginTop: 15,
                  }}
                >
                  {formatAMPM(item.timestamp.toDate())}
                </Text>
              </View>
            </View>
          )}
        />
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
      fontWeight: "bold",
      fontSize: 20,
    },
    box: {
      flex: 1,
      borderWidth: 2,
      borderColor: colors.primary,
      padding: 7,
      alignItems: "center",
      height: 60,
      justifyContent: "center",
    },
  });
  
  export default withTheme(TimeLineScreen);
  
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  