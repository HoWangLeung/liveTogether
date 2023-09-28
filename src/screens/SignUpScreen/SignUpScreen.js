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
const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    console.warn("Sign In");
  };

  const onForgotPassword = () => {
    console.warn("onForgotPassword In");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="password"
        secureTextEntry
        value={password}
        setValue={setPassword}
      />
      <CustomInput
        placeholder="passwordRepeat"
        value={passwordRepeat}
        setValue={setPasswordRepeat}
      />
      <CustomButton
        text="Register"
        onPress={onForgotPassword}
        type="TERTIARY"
      />
      <Text>
        {" "}
        By Registering, you confirm that you accept our <Text > Terms of Use and Privacy</Text>
        Policy
      </Text>
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
export default SignUpScreen;
