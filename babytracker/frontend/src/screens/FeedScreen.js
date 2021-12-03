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