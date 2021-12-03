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