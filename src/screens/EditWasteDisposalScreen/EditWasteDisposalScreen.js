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
import { ERROR_MANDATORY, SUCCESS } from "../../utils/Constants";
import Utils from "../../utils/Utils";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import useTasks from "../../services/useTasks";
import { useDispatch } from "react-redux";

export default function EditWasteDisposalScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { editTask } = useTasks();
  const bin = route.params.bin;
  const [displayName, setDisplayName] = useState(bin ? bin.displayName : "");

  const onConfirmPressed = () => {
    if (!isValid()) {
      return;
    }
    bin.displayName=displayName;
    let payload = {
      task: bin,
    };
    editTask(payload).then(() => {
      navigation.navigate("Main", { screen: "Home" });
      Utils.showPopUp(dispatch, SUCCESS, true, "Successfully Updated");
    });
    // binService
    //   .updateBinRemoval(bin.id, payload)
    //   .then(() => {
    //     navigation.navigate("Main", { screen: "Home" });
    //   })
    //   .catch((e) => {
    //     alert(e.response.data.message);
    //   });
  };

  const [errors, setErrors] = useState({});

  const isValid = () => {
    let isValid = true;

    if (!displayName) {
      setErrors((s) => ({ ...s, displayName: ERROR_MANDATORY }));
      isValid = false;
    }

    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        isValid = false;
      }
    });

    return isValid;
  };
  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  const handleChange = (field, value) => {
    Utils.removeError("displayName", errors, setErrors);
    setDisplayName(value);
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

        <Text style={styles.title}>Edit Taking Out Rubbish</Text>
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
  title: commonStyles.title,
  helperText: commonStyles.helperText,
});
