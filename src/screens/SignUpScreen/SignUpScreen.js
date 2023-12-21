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
import { Button, TextInput } from "react-native-paper";
import Auth from "../../services/Auth";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("ABC@gmail.com");
  const [password, setPassword] = useState("1234");
  const [passwordRepeat, setPasswordRepeat] = useState("1234");
  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    console.warn("Sign In");
  };

  const onForgotPassword = () => {
    console.warn("onForgotPassword In");
  };

  const onPressSignUp = () => {
    let payload = {
      username,
      email,
      password,
      role: ["mod", "user"],
    };
    let response = Auth.signUp(payload);
    if (response) {
      navigation.navigate("SignUpSuccess");
    }
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
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        style={[styles.inputSpace]}
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={[styles.inputSpace]}
        label="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />

      <TextInput
        style={[styles.inputSpace]}
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={[styles.inputSpace]}
        label="PasswordRepeat"
        value={passwordRepeat}
        onChangeText={(passwordRepeat) => setPasswordRepeat(passwordRepeat)}
      />
      <Button
        mode="contained"
        onPress={onPressSignUp}
        style={{ marginTop: 10 }}
      >
        Sign Up
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
  inputSpace: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
});
export default SignUpScreen;
