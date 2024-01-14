import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Button, HelperText, TextInput } from "react-native-paper";
import Auth from "../../services/Auth";
import { useNavigation } from "@react-navigation/native";
import { ERROR_MANDATORY } from "../../utils/Constants";
import commonStyles from "../../utils/CommonStyle";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errors, setErrors] = useState({});
  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    console.warn("Sign In");
  };

  const onForgotPassword = () => {
    console.warn("onForgotPassword In");
  };

  const onPressSignUp = () => {
    if (!isValid()) {
      return;
    }
    let payload = {
      username,
      email,
      password,
      role: ["mod", "user"],
    };
    Auth.signUp(payload)
      .then((res) => {
        navigation.navigate("VerifyRegistration", { email });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  const isValid = () => {
    let isValid = true;
    if (!username) {
      setErrors((s) => ({ ...s, username: ERROR_MANDATORY }));
      isValid = false;
    }
    if (!email) {
      setErrors((s) => ({ ...s, email: ERROR_MANDATORY }));
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

  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  const removeError = (field) => {
    if (errors[field]) {
      setErrors({});
    }
  };

  const setErrorMessage = (field, message) => {
    setErrors((s) => ({
      ...s,
      [field]: message,
    }));
  };

  const handleEmailChange = (newEmail) => {
    removeError("email");
    if (newEmail && !newEmail.includes("@")) {
      setErrorMessage("email", "Invalid Email Format");
    }

    setEmail(newEmail);
  };

  const handleUsernameChange = (newUsername) => {
    removeError("username");
    setUsername(newUsername);
  };

  const handlePasswordChange = (newPassword) => {
    removeError("password");
    if (passwordRepeat && newPassword) {
      if (passwordRepeat != newPassword) {
        setErrorMessage("password", "The two passwords must be identical");
      } else {
        removeError("password");
        removeError("passwordRepeat");
      }
    }
    setPassword(newPassword);
  };

  const handlePasswordRepeatChange = (newPasswordRepeat) => {
    removeError("passwordRepeat");
    if (password && newPasswordRepeat) {
      if (newPasswordRepeat != password) {
        setErrorMessage(
          "passwordRepeat",
          "The two passwords must be identical"
        );
      } else {
        removeError("password");
        removeError("passwordRepeat");
      }
    }

    setPasswordRepeat(newPasswordRepeat);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Button
          labelStyle={{ fontSize: 16 }}
          style={{ marginRight: "auto" }}
          onPress={() => navigation.navigate("SignIn")}
        >
          Back
        </Button>
        <Text style={styles.title}>Create an account</Text>
        <TextInput
          style={[styles.inputSpace]}
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <HelperText
          style={styles.helperText}
          type="error"
          visible={hasErrors("email")}
        >
          {errors["email"]}
        </HelperText>
        <TextInput
          style={[styles.inputSpace]}
          label="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <HelperText
          style={styles.helperText}
          type="error"
          visible={hasErrors("username")}
        >
          {errors["username"]}
        </HelperText>

        <TextInput
          style={[styles.inputSpace]}
          label="Password"
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
          style={[styles.inputSpace]}
          label="PasswordRepeat"
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
        <Button
          mode="contained"
          onPress={onPressSignUp}
          style={{ marginTop: 10 }}
        >
          Sign Up
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  inputSpace: commonStyles.inputSpace,
  sectionTitle: commonStyles.sectionTitle,
  helperText: commonStyles.helperText,
});
export default SignUpScreen;
