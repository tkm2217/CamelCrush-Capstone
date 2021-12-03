import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { withTheme, Button, Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";

import { useUser } from "../hooks/useUser";
import colors from "../config/colors";

function DiaperScreen({ theme, route }) {
  const { colors: papercolors } = theme;
  const [beginDate, setBeginDate] = useState(new Date());
  const [beginTime, setBeginTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { selectedChildData } = route.params;

  const [showBeginDate, setShowBeginDate] = useState(false);
  const [showBeginTime, setShowBeginTime] = useState(false);

  const [isPop, setIsPop] = useState(false);
  const [isPee, setIsPee] = useState(false);

  const { darkTheme, selectedChild } = useUser();

  const handleSave = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("babies")
      .doc(selectedChild)
      .update({
        diaper: {
          date: beginDate,
          time: beginTime,
          isPop: isPop,
          isPee: isPee,
        },
      })
      .then(() => {
        firebase.firestore().collection("activities").add({
          timestamp: new Date(),
          timestampString: new Date().toDateString(),
          uid: firebase.auth().currentUser.uid,
          activity: "Diaper changed",
          babyName: selectedChildData?.name,
        });

        Alert.alert("Updated", "Successfully updated diaper details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChangeBeginDate = (event, selectedDate) => {
    const currentDate = selectedDate || beginDate;
    setShowBeginDate(Platform.OS === "ios");
    setBeginDate(currentDate);
  };
  const onChangeBeginTime = (event, selectedTime) => {
    const currentTime = selectedTime || beginTime;
    setShowBeginTime(Platform.OS === "ios");
    setBeginTime(currentTime);
  };

  return (
    <View style={{ flex: 1, backgroundColor: papercolors.background }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setShowBeginDate(true)}
          style={styles.sectionContainer}
        >
          <Text style={{ marginVertical: 5, color: "grey" }}>
            Date of changing
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ color: darkTheme ? colors.white : colors.black }}>
              {beginDate.toDateString() || ""}
            </Text>
            <AntDesign
              name="caretdown"
              size={14}
              color={darkTheme ? colors.white : "grey"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowBeginTime(true)}
          style={styles.sectionContainer}
        >
          <Text style={{ marginVertical: 5, color: "grey" }}>
            Time of changing
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ color: darkTheme ? colors.white : colors.black }}>
              {formatAMPM(beginTime) || ""}
            </Text>
            <AntDesign
              name="caretdown"
              size={14}
              color={darkTheme ? colors.white : "grey"}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ alignSelf: "center", marginTop: 30 }}>
        <Text
          style={{
            color: darkTheme ? colors.white : colors.black,
            fontSize: 16,
          }}
        >
          What's in the diaper
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Checkbox
              status={isPop ? "checked" : "unchecked"}
              color={colors.primary}
              onPress={() => {
                setIsPop(!isPop);
              }}
            />
            <Text
              style={{
                color: darkTheme ? colors.white : colors.black,
                fontSize: 16,
              }}
            >
              Poo
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
          >
            <Checkbox
              status={isPee ? "checked" : "unchecked"}
              color={colors.primary}
              onPress={() => {
                setIsPee(!isPee);
              }}
            />
            <Text
              style={{
                color: darkTheme ? colors.white : colors.black,
                fontSize: 16,
              }}
            >
              Pee
            </Text>
          </View>
        </View>
      </View>

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSave}
        style={{
          borderRadius: 20,
          width: 200,
          alignSelf: "center",
          marginTop: 40,
        }}
      >
        Save
      </Button>

      {showBeginDate && (
        <DateTimePicker
          value={beginDate}
          mode="date"
          display="default"
          onChange={onChangeBeginDate}
        />
      )}

      {showBeginTime && (
        <DateTimePicker
          value={beginTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeBeginTime}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    flex: 1,
    margin: 10,
  },
  textInput: {
    backgroundColor: "transparent",
    flex: 1,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

export default withTheme(DiaperScreen);

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
