import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { withTheme, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";

import { useUser } from "../hooks/useUser";
import colors from "../config/colors";
