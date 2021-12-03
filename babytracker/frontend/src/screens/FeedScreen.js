function FeedScreen({ theme, route }) {
    const { colors: papercolors } = theme;
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [bottleQuantity, setBottleQuantity] = useState("");
    const [showTime, setShowTime] = useState(false);
    const [leftDuration, setLeftDuration] = useState("");
    const [loading, setLoading] = useState(false);
    const [rightDuration, setRightDuration] = useState("");
    const { darkTheme, selectedChild } = useUser();
    const { selectedChildData } = route.params;
  
    const handleSave = (feedtype) => {
      setLoading(true);
      firebase
        .firestore()
        .collection("babies")
        .doc(selectedChild)
        .update({
          lastFeed: {
            timestamp: new Date(),
            date: date,
            feedtype: feedtype,
            leftDuration: leftDuration,
            rightDuration: rightDuration,
            quantity: bottleQuantity,
          },
        })
        .then(() => {
          firebase
            .firestore()
            .collection("activities")
            .add({
              timestamp: new Date(),
              timestampString: new Date().toDateString(),
              uid: firebase.auth().currentUser.uid,
              activity:
                feedtype == "breast"
                  ? "Fed by breast"
                  : "Fed by bottle: " + bottleQuantity + " ML",
              babyName: selectedChildData?.name,
            });
  
          Alert.alert("Updated", "Successfully updated feed details.");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDate(Platform.OS === "ios");
      setDate(currentDate);
    };
    const onChangeTime = (event, selectedTime) => {
      const currentTime = selectedTime || time;
      setShowTime(Platform.OS === "ios");
      setTime(currentTime);
    };

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: papercolors.background }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              style={styles.sectionContainer}
            >
              <Text style={{ marginVertical: 5, color: "grey" }}>
                Date of feeding
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
                  {date.toDateString()}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={14}
                  color={darkTheme ? colors.white : "grey"}
                />
              </View>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => setShowTime(true)}
              style={styles.sectionContainer}
            >
              <Text style={{ marginVertical: 5, color: "grey" }}>
                Date of feeding
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
                  {formatAMPM(time)}
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
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                    // flex: 1,
                    width: Dimensions.get("screen").width * 0.45,
                    margin: 10,
                  },
                }}
              >
                <Text style={{ marginVertical: 5, color: "grey" }}>
                  Left Duration
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
                    {leftDuration ? leftDuration + " min" : ""}
                  </Text>
                  <AntDesign
                    name="caretdown"
                    size={14}
                    color={darkTheme ? colors.white : "grey"}
                  />
                </View>
              </MenuTrigger>
    
              <MenuOptions>
                <MenuOption text="1 min" onSelect={() => setLeftDuration(1)} />
                <MenuOption text="2 min" onSelect={() => setLeftDuration(2)} />
                <MenuOption text="3 min" onSelect={() => setLeftDuration(3)} />
                <MenuOption text="4 min" onSelect={() => setLeftDuration(4)} />
                <MenuOption text="5 min" onSelect={() => setLeftDuration(5)} />
                <MenuOption text="6 min" onSelect={() => setLeftDuration(6)} />
                <MenuOption text="7 min" onSelect={() => setLeftDuration(7)} />
                <MenuOption text="8 min" onSelect={() => setLeftDuration(8)} />
                <MenuOption text="9 min" onSelect={() => setLeftDuration(9)} />
                <MenuOption text="10 min" onSelect={() => setLeftDuration(10)} />
              </MenuOptions>
            </Menu>
    
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                    width: Dimensions.get("screen").width * 0.45,
                    margin: 10,
                  },
                }}
              >
                <Text style={{ marginVertical: 5, color: "grey" }}>
                  Right Duration
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
                    {rightDuration ? rightDuration + " min" : ""}
                  </Text>
                  <AntDesign
                    name="caretdown"
                    size={14}
                    color={darkTheme ? colors.white : "grey"}
                  />
                </View>
              </MenuTrigger>
    
              <MenuOptions>
                <MenuOption text="1 min" onSelect={() => setRightDuration(1)} />
                <MenuOption text="2 min" onSelect={() => setRightDuration(2)} />
                <MenuOption text="3 min" onSelect={() => setRightDuration(3)} />
                <MenuOption text="4 min" onSelect={() => setRightDuration(4)} />
                <MenuOption text="5 min" onSelect={() => setRightDuration(5)} />
                <MenuOption text="6 min" onSelect={() => setRightDuration(6)} />
                <MenuOption text="7 min" onSelect={() => setRightDuration(7)} />
                <MenuOption text="8 min" onSelect={() => setRightDuration(8)} />
                <MenuOption text="9 min" onSelect={() => setRightDuration(9)} />
                <MenuOption text="10 min" onSelect={() => setRightDuration(10)} />
              </MenuOptions>
            </Menu>
          </View>
    
          <Button
            mode="contained"
            onPress={() => handleSave("breast")}
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
    
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
    
          {showTime && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>
      );

      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: papercolors.background }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              style={styles.sectionContainer}
            >
              <Text style={{ marginVertical: 5, color: "grey" }}>
                Date of feeding
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
                  {date.toDateString()}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={14}
                  color={darkTheme ? colors.white : "grey"}
                />
              </View>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => setShowTime(true)}
              style={styles.sectionContainer}
            >
              <Text style={{ marginVertical: 5, color: "grey" }}>
                Time of feeding
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
                  {formatAMPM(time)}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={14}
                  color={darkTheme ? colors.white : "grey"}
                />
              </View>
            </TouchableOpacity>
          </View>
    
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  margin: 10,
                },
              }}
            >
              <Text style={{ marginVertical: 5, color: "grey" }}>Quantity</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: darkTheme ? colors.white : colors.black }}>
                  {bottleQuantity ? bottleQuantity + " ML" : ""}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={14}
                  color={darkTheme ? colors.white : "grey"}
                />
              </View>
            </MenuTrigger>
    
            <MenuOptions>
              <MenuOption text="10 ML" onSelect={() => setBottleQuantity(10)} />
              <MenuOption text="20 ML" onSelect={() => setBottleQuantity(20)} />
              <MenuOption text="30 ML" onSelect={() => setBottleQuantity(30)} />
              <MenuOption text="40 ML" onSelect={() => setBottleQuantity(40)} />
              <MenuOption text="50 ML" onSelect={() => setBottleQuantity(50)} />
              <MenuOption text="60 ML" onSelect={() => setBottleQuantity(60)} />
              <MenuOption text="70 ML" onSelect={() => setBottleQuantity(70)} />
              <MenuOption text="80 ML" onSelect={() => setBottleQuantity(80)} />
              <MenuOption text="90 ML" onSelect={() => setBottleQuantity(90)} />
              <MenuOption text="100 ML" onSelect={() => setBottleQuantity(100)} />
            </MenuOptions>
          </Menu>
    
          <Button
            mode="contained"
            onPress={() => handleSave("bottle")}
            style={{
              borderRadius: 20,
              width: 200,
              alignSelf: "center",
              marginTop: 40,
            }}
          >
            Save
          </Button>
    
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
    
          {showTime && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>
      );

      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });
      const [routes] = React.useState([
        { key: "first", title: "BREAST" },
        { key: "second", title: "BOTTLE" },
      ]);
      return (
        <>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </>
      );
    }

}
