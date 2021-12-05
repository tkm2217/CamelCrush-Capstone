import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import { withTheme } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";
import { useUser } from "../hooks/useUser";
