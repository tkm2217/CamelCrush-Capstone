import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

function DatePicker({ title, date, setDate, placeholder, style }) {
  const [showModal, setShowModal] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowModal(false);
    setDate(selectedDate || date);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <TextInput
          editable={false}
          mode="outlined"
          label={title}
          value={date.toDateString()}
          placeholder={placeholder}
          style={style}
          right={
            <TextInput.Icon
              name="calendar-month"
              onPress={() => setShowModal(true)}
              color="grey"
            />
          }
        />
      </TouchableOpacity>

      {showModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

export default DatePicker;
