import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
const ForgetPasswordScreen = () => {
  const [username, setUsername] = useState("");

  const { height } = useWindowDimensions();

  const confirmEmailScreen = () => {
    console.warn("Sign In");
  };

  const onSendPressed = () => {
    console.warn("onConfirmPressed In");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />

      <CustomButton
        text="Send"
        onPress={onSendPressed}
     
      />
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
});
export default ForgetPasswordScreen;
