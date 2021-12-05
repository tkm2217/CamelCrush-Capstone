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

