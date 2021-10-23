import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import colors from "../config/colors";

function HomeScreen({}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => null}
          theme={{
            colors: { primary: "#4B5C6B" },
          }}
          labelStyle={styles.labelStyle}
          contentStyle={{ height: 75 }}
          style={styles.button}
        >
          feed
        </Button>

        <Button
          mode="contained"
          onPress={() => null}
          theme={{
            colors: { primary: "#788896" },
          }}
          labelStyle={styles.labelStyle}
          contentStyle={{ height: 75 }}
          style={styles.button}
        >
          sleep
        </Button>

        <Button
          mode="contained"
          onPress={() => null}
          theme={{
            colors: { primary: "#4B5C6B" },
          }}
          labelStyle={styles.labelStyle}
          contentStyle={{ height: 75 }}
          style={styles.button}
        >
          diaper
        </Button>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Button
          mode="outlined"
          onPress={() => null}
          theme={{
            colors: { primary: colors.primary },
          }}
          style={{ width: 150 }}
        >
          timeline
        </Button>

        <Button
          mode="outlined"
          onPress={() => null}
          theme={{
            colors: { primary: colors.primary },
          }}
          style={{ width: 150 }}
        >
          summary
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={() => null}
        theme={{
          colors: { primary: colors.primary },
        }}
        style={{ alignSelf: "center", width: "40%" }}
      >
        Add baby
      </Button>

      {/* <Button
        mode="outlined"
        onPress={() => null}
        theme={{
          colors: { primary: colors.primary },
        }}
        style={{ alignSelf: "center", width: "40%", marginTop: 15 }}
      >
        log
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "30%",
    // height: 75,
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 40,
  },
  labelStyle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
