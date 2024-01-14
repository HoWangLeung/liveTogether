import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import commonStyles from "../../utils/CommonStyle";
import Auth from "../../services/Auth";
import { useDispatch } from "react-redux";
import { setPopUpModal } from "../../redux/actions";

const VerifyRegistrationScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const route = useRoute();
  const dispatch = useDispatch();

  const email = route.params.email;

  const onPressResend = () => {
    Auth.resendRegistrationVerification(email)
      .then(() => {
        alert("SUCCESS");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const isValid = () => {
    let isValid = true;

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

  const handleCodeChange = (newCode) => {
    if (newCode.length > 6) {
      alert("The length of the code must be 6");
      return;
    }
    if (newCode.length == 6) {
      //fire request
      Auth.verifyRegistration(newCode)
        .then(() => {
          navigation.navigate("SignIn", { screen: "SignIn" });
          dispatch(
            setPopUpModal({
              visible: true,
              message: "Validation Complete.You may Login now.",
              type: "success",
            })
          );
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
    setCode(newCode);
  };

  return (
    <View style={styles.root}>
      <Button
        labelStyle={{ fontSize: 16 }}
        style={{ marginRight: "auto" }}
        onPress={() => navigation.navigate("SignIn")}
      >
        Back
      </Button>
      <Text style={styles.title}>Email Verification</Text>
      <Text style={[styles.paragraph, {marginBottom:15,marginTop:10}]} >
        Thank you for your registration. We have sent a verification email to
        your registered email address. To complete the verification process,
        kindly enter the 6-digit code provided in the email. If you haven't
        received the email, please check your spam folder or request a new
        verification email.
      </Text>
      <TextInput
        style={[styles.inputSpace]}
        label="Verification Token"
        value={code}
        onChangeText={handleCodeChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("code")}
      >
        {errors["code"]}
      </HelperText>

      <Button
        mode="contained"
        onPress={onPressResend}
        style={{ marginTop: 10 }}
      >
        Resend
      </Button>
    </View>
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
  paragraph: commonStyles.paragraph,
});
export default VerifyRegistrationScreen;
