import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { withTheme, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";

import { useUser } from "../hooks/useUser";
import colors from "../config/colors";

function SleepScreen({ theme, route }) {
  const [beginDate, setBeginDate] = useState(new Date());
  const [beginTime, setBeginTime] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [loading, setLoading] = useState(false);
  const { selectedChildData } = route.params;
  const { colors: papercolors } = theme;

  const [showBeginDate, setShowBeginDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showBeginTime, setShowBeginTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const { darkTheme, selectedChild } = useUser();

  const handleSave = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("babies")
      .doc(selectedChild)
      .update({
        sleep: {
          beginTime: formatAMPM(beginTime),
          beginDate: beginDate,
          endTime: formatAMPM(endTime),
          enddate: endDate,
        },
      })
      .then(() => {
        firebase.firestore().collection("activities").add({
          timestamp: new Date(),
          timestampString: new Date().toDateString(),
          uid: firebase.auth().currentUser.uid,
          activity: "Slept",
          babyName: selectedChildData?.name,
        });

        Alert.alert("Updated", "Successfully updated sleep details.");
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
  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(Platform.OS === "ios");
    setEndDate(currentDate);
  };
  const onChangeBeginTime = (event, selectedTime) => {
    const currentTime = selectedTime || beginTime;
    setShowBeginTime(Platform.OS === "ios");
    setBeginTime(currentTime);
  };
  const onChangeEndTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTime(Platform.OS === "ios");
    setEndTime(currentTime);
  };
  return (
    <View style={{ flex: 1, backgroundColor: papercolors.background }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setShowBeginDate(true)}
          style={styles.sectionContainer}
        >
          <Text style={{ marginVertical: 5, color: "grey" }}>Begin date</Text>
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
          <Text style={{ marginVertical: 5, color: "grey" }}>Begin time</Text>
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

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setShowEndDate(true)}
          style={styles.sectionContainer}
        >
          <Text style={{ marginVertical: 5, color: "grey" }}>End date</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ color: darkTheme ? colors.white : colors.black }}>
              {endDate ? endDate.toDateString() : ""}
            </Text>
            <AntDesign
              name="caretdown"
              size={14}
              color={darkTheme ? colors.white : "grey"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowEndTime(true)}
          style={styles.sectionContainer}
        >
          <Text style={{ marginVertical: 5, color: "grey" }}>End time</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ color: darkTheme ? colors.white : colors.black }}>
              {endTime ? formatAMPM(endTime) : ""}
            </Text>
            <AntDesign
              name="caretdown"
              size={14}
              color={darkTheme ? colors.white : "grey"}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
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
      {showEndDate && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
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
      {showEndTime && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeEndTime}
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

export default withTheme(SleepScreen);

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
