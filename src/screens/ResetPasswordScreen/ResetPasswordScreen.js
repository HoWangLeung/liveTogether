import { View, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";

import { Button, Surface, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Auth from "../../services/Auth";
import UpdateSuccessfulScreen from "../UpdateSuccessfulScreen/UpdateSuccessfulScreen";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState("1234");
  const [newPassword1, setNewPassword1] = useState("1234");
  const [newPassword2, setNewPassword2] = useState("1234");
  const route = useRoute();
  const { email } = route.params;

  const onSendPressed = () => {
    if (newPassword1 != newPassword2) {
      alert("The new passwords do not match");
    }
    let payload = {
      email,
      oldPassword,
      newPassword1,
      newPassword2,
    };
    Auth.confirmResetPassword(payload)
      .then(() => {
        navigation.navigate("UpdateSuccessful");
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Button
          labelStyle={{ fontSize: 16 }}
          style={{ marginRight: "auto" }}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          Back
        </Button>
        <Text style={styles.title}>Setting your new password</Text>
        <TextInput
          required
          style={[styles.inputSpace]}
          label="Old password"
          value={oldPassword}
          onChangeText={(oldPassword) => setOldPassword(oldPassword)}
        />
        <TextInput
          required
          style={[styles.inputSpace]}
          label="New password"
          value={newPassword1}
          onChangeText={(newPassword1) => setNewPassword1(newPassword1)}
        />
        <TextInput
          required
          style={[styles.inputSpace]}
          label="Repeat new password"
          value={newPassword2}
          onChangeText={(newPassword2) => setNewPassword2(newPassword2)}
        />
        <Button onPress={onSendPressed}>Submit</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
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
  inputSpace: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
});
export default ResetPasswordScreen;
