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
const ConfirmEmailScreen = () => {
  const [code, setCode] = useState("");

  const { height } = useWindowDimensions();

  const confirmEmailScreen = () => {
    console.warn("Sign In");
  };

  const onConfirmPressed = () => {
    console.warn("onConfirmPressed In");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>
      <CustomInput
        placeholder="Enter your confirmation code"
        value={code}
        setValue={setCode}
      />

      <CustomButton
        text="Register"
        onPress={onConfirmPressed}
        type="TERTIARY"
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
export default ConfirmEmailScreen;
