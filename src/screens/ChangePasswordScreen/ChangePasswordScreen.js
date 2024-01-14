import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../utils/CommonStyle";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../services/LoginProvider";
import Utils from "../../utils/Utils";
import { ERROR_MANDATORY } from "../../utils/Constants";
import Auth from "../../services/Auth";
import { setPopUpModal } from "../../redux/actions";
const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [group, setGroup] = useState({ name: "" });
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const [oldPassword, setOldPassword] = useState("1234");
  const [password, setPassword] = useState("1234");
  const [passwordRepeat, setPasswordRepeat] = useState("1234");

 
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (!isValid()) {
      return;
    }
    group.app = "liveTogether";
    let userIds = [];
    userIds.push(userDetail.id);
    let payload = {
      currentPassword: oldPassword,
      newPassword1: password,
      newPassword2: passwordRepeat,
    };
    Auth.updatePassword(payload)
      .then((res) => {
        navigation.navigate("Profile");
        dispatch(
          setPopUpModal({
            visible: true,
            message: "Update successful",
            type: "success",
          })
        );
      })
      .catch((e) => {
        alert(e.response.data.message);
      })
      .finally(() => {});
  };

  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  const handlePasswordChange = (newPassword) => {
    Utils.removeError("password", errors, setErrors);
    if (passwordRepeat && newPassword) {
      if (passwordRepeat != newPassword) {
        Utils.setErrorMessage(
          "password",
          "The two passwords must be identical",
          setErrors
        );
      } else {
        Utils.removeError("password", errors, setErrors);
        Utils.removeError("passwordRepeat", errors, setErrors);
      }
    }
    setPassword(newPassword);
  };

  const handleOldPasswordChange = (newValue) => {
    Utils.removeError("oldPassword", errors, setErrors);
    setOldPassword(newValue);
  };

  const handlePasswordRepeatChange = (newPasswordRepeat) => {
    Utils.removeError("passwordRepeat", errors, setErrors);
    if (password && newPasswordRepeat) {
      if (newPasswordRepeat != password) {
        Utils.setErrorMessage(
          "passwordRepeat",
          "The two passwords must be identical",
          setErrors
        );
      } else {
        Utils.removeError("password", errors, setErrors);
        Utils.removeError("passwordRepeat", errors, setErrors);
      }
    }

    setPasswordRepeat(newPasswordRepeat);
  };

  const isValid = () => {
    let isValid = true;

    if (!oldPassword) {
      setErrors((s) => ({ ...s, oldPassword: ERROR_MANDATORY }));
      isValid = false;
    }

    if (!password) {
      setErrors((s) => ({ ...s, password: ERROR_MANDATORY }));
      isValid = false;
    }

    if (!passwordRepeat) {
      setErrors((s) => ({ ...s, passwordRepeat: ERROR_MANDATORY }));
      isValid = false;
    }

    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        isValid = false;
      }
    });

    return isValid;
  };

  return (
    <View style={styles.root}>
      <Button
        labelStyle={{ fontSize: 16 }}
        style={{ marginRight: "auto" }}
        onPress={() => navigation.navigate("Profile")}
      >
        Back
      </Button>
      <Text style={styles.title}>Edit Password</Text>
      {/* <Text style={styles.sectionTitle}>Please Provide the Following Info</Text> */}
      <TextInput
        style={styles.inputSpace}
        label="Old Password"
        value={oldPassword}
        onChangeText={handleOldPasswordChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("oldPassword")}
      >
        {errors["oldPassword"]}
      </HelperText>

      <TextInput
        style={styles.inputSpace}
        label="New Password"
        value={password}
        onChangeText={handlePasswordChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("password")}
      >
        {errors["password"]}
      </HelperText>

      <TextInput
        style={styles.inputSpace}
        label="Repeat the New Password"
        value={passwordRepeat}
        onChangeText={handlePasswordRepeatChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("passwordRepeat")}
      >
        {errors["passwordRepeat"]}
      </HelperText>

      <Button mode="contained" onPress={handleSubmit}>
        Confirm
      </Button>
      {/* <Button mode="contained" onPress={() => navigation.navigate("Home")}>
              Cancel
            </Button> */}
    </View>
  );
};
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
  helperText: commonStyles.helperText,
  title: commonStyles.title,
});
export default ChangePasswordScreen;
