import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, HelperText, TextInput } from "react-native-paper";
import HomeScreen from "../HomeScreen/HomeScreen";
import commonStyles from "../../utils/CommonStyle";
import { useState } from "react";
import useBin from "../../services/useBin";
// import { DateTimePicker } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ERROR_MANDATORY, SUCCESS } from "../../utils/Constants";
import Utils from "../../utils/Utils";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import useTasks from "../../services/useTasks";
import { useDispatch } from "react-redux";

export default function EditBinCollectionScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bin = route.params.bin;
  const [displayName, setDisplayName] = useState(bin ? bin.displayName : "");
 
  const { editTask } = useTasks();
  const [date, setDate] = useState(new Date(bin ? bin.dueDate : ""));
  const [mode, setMode] = useState("date");
  let [interval, setInterval] = useState(bin?bin.taskInterval:"14");

  const [errors, setErrors] = useState({});

  const onConfirmPressed = () => {
    if (!isValid()) {
      return;
    }
    bin.displayName=displayName;
    bin.taskInterval = interval;
    bin.dueDate = date;
    let payload = {
      task: bin,
    };
    editTask(payload).then(() => {
      navigation.navigate("Main", { screen: "Home" });
      Utils.showPopUp(dispatch, SUCCESS, true, "Successfully Updated");
    });
  };
  const isValid = () => {
    let isValid = true;

    if (!displayName) {
      setErrors((s) => ({ ...s, displayName: ERROR_MANDATORY }));
      isValid = false;
    }

    if (!interval) {
      setErrors((s) => ({ ...s, interval: ERROR_MANDATORY }));
      isValid = false;
    }
    if (!date) {
      setErrors((s) => ({ ...s, date: ERROR_MANDATORY }));
      isValid = false;
    }

    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        isValid = false;
      }
    });

    return isValid;
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  const handleChange = (field, value) => {
    console.log(field,value);
    if (field === "displayName".toLocaleLowerCase()) {
      Utils.removeError("displayName", errors, setErrors);
      setDisplayName(value);
    } else {
      Utils.removeError("interval", errors, setErrors);
      setInterval(value);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Button
          labelStyle={{ fontSize: 16 }}
          style={{ marginRight: "auto" }}
          onPress={() => navigation.navigate("Main", { screen: "Home" })}
        >
          Back
        </Button>

        <Text style={styles.title}>Edit Council Bin Collection</Text>

        <CustomInput
          name="displayName"
          errors={errors}
          visible={hasErrors("displayName")}
          value={displayName}
          handleChange={handleChange}
          hasErrors={hasErrors("displayName")}
          label={"Display Name"}
          helperText={errors["displayName"]}
        />
        <CustomInput
          name="interval"
          errors={errors}
          visible={hasErrors("interval")}
          value={interval}
          handleChange={handleChange}
          hasErrors={hasErrors("interval")}
          label={"Interval"}
          helperText={errors["interval"]}
        />

        <Text style={styles.sectionTitle}>Setting Start Date</Text>

        <DateTimePicker
          display="calendar"
          style={styles.dateTimePicker}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
        <HelperText
          style={styles.helperText}
          type="error"
          visible={hasErrors("date")}
        >
          {errors["date"]}
        </HelperText>

        <Button onPress={onConfirmPressed} mode="contained">
          Confirm
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
  },
  surface: {
    padding: 8,
    height: 50,
    margin: 20,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 15,
  },
  inputSpace: commonStyles.inputSpace,
  sectionTitle: commonStyles.sectionTitle,
  dateTimePicker: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#C5C5C5",
    borderWidth: 1,
    marginVertical: 10,
    height: 45,
    width: "100%",
  },
  sectionTitle: commonStyles.sectionTitle,
  title: commonStyles.title,
  helperText: commonStyles.helperText,
});
