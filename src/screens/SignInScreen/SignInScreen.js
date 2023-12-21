import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Logo from "./logoDummy.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Auth from "../../services/Auth";
import { useNavigation } from "@react-navigation/native";
import SignIn from "./signIn.png";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../../services/LoginProvider";

// import { useNavigation } from "@react-navigation/native";
const SignInScreen = () => {
  const [username, setUsername] = useState("hkz88i00123@gmail.com");
  const [password, setPassword] = useState("1234");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { isLoggedIn, setIsLoggedIn, userDetail, setUserDetail } = useLogin();
  const onSignInPressed = async () => {
    //validate user
    try {
      const result = await Auth.login(username, password);

      if (result.accessToken) {
        setUserDetail(result);
        setIsLoggedIn(true);
        await storeData(result.accessToken);
        navigation.navigate("Main", { screen: "Home" });
      }
    } catch (error) {
      // Handle network or other errors

      throw error;
    }
  };

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      let tok = await AsyncStorage.getItem("accessToken");
    } catch (error) {
      // Error saving data
    }
  };

  const onForgotPassword = () => {
    console.warn("onForgotPassword In");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const onForgetPasswordPressed = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <View style={styles.root}>
      <Image
        source={SignIn}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
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
      <Button
        style={{ marginTop: 12 }}
        mode="contained"
        onPress={onSignInPressed}
      >
        Sign In
      </Button>

      <Button style={{ marginTop: 12 }} onPress={onSignUpPressed}>
        Don't have an Account? Sign Up now
      </Button>
      <Button  onPress={onForgetPasswordPressed}>
        Forget password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  inputSpace: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
});
export default SignInScreen;
