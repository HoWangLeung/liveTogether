import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "./logoDummy.png";

import CustomButton from "../../components/CustomButton/CustomButton";
import Auth from "../../services/Auth";
import { useNavigation } from "@react-navigation/native";
import SignIn from "./signIn.png";
import { Button, HelperText, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../../services/LoginProvider";
import commonStyles from "../../utils/CommonStyle";
import { ERROR_MANDATORY } from "../../utils/Constants";
import PopUpModal from "../../components/Modal/PopUpModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDetail, setPopUpModal } from "../../redux/actions";
import useAuth from "../../services/useAuth";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import LoadingScreen from "../Common/LoadingScreen";

// import { useNavigation } from "@react-navigation/native";
const SignInScreen = () => {
  const popUpModalConfig = useSelector(
    (state) => state.profileScreenReducer.popUpModalConfig
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("hkz88i001234@gmail.com");
  const [password, setPassword] = useState("1234");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { fetchUserProfileAndDispatch } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const checkExistingToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        fetchUserProfileAndDispatch();
      } else {
        setLoading(false);
      }
    };
    checkExistingToken();

    return () => {};
  }, []);

  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };
  const onSignInPressed = async () => {
    if (!isValid()) {
      // alert("Form still has error");
      return;
    }

    await doLogin();
  };
  const doLogin = async () => {
    try {
      const result = await Auth.login(email, password);

      if (result.accessToken) {
        await storeData(result.accessToken);
        dispatch(
          setLoginDetail({
            isLoggedIn: true,
            userDetail: result,
          })
        );
        navigation.navigate("Main", { screen: "Home" });
        return;
      }
      if (!result.isEnabled) {
        navigation.navigate("VerifyRegistration", { email });
        return;
      }
    } catch (e) {
      if (e.response.data.status === 401) {
        dispatch(
          setPopUpModal({
            visible: true,
            message: "Invalid email or password.",
            type: "error",
          })
        );
      }
    }
  };

  const isValid = () => {
    let isValid = true;
    if (!email) {
      setErrors((s) => ({ ...s, email: ERROR_MANDATORY }));
      isValid = false;
    }
    if (!password) {
      setErrors((s) => ({ ...s, password: ERROR_MANDATORY }));
      isValid = false;
    }

    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      let tok = await AsyncStorage.getItem("accessToken");
    } catch (error) {
      // Error saving data
    }
  };

  const onForgotPassword = () => {};

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const onForgetPasswordPressed = () => {
    navigation.navigate("ForgetPassword");
  };

  const onChangePassword = (newPassword) => {
    setErrors({});
    setPassword(newPassword);
  };

  const onChangeEmail = (newEmail) => {
    if (errors["email"]) {
      setErrors({});
    }
    if (newEmail && !newEmail.includes("@")) {
      setErrors((s) => ({
        ...s,
        email: "Invalid Email Format",
      }));
    }
    setEmail(newEmail);
  };

  const getScreen = () => {
    if (!loading) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.root}>
            <Image
              source={SignIn}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />

            <CustomInput
              errors={errors}
              visible={hasErrors("email")}
              value={email}
              handleChange={onChangeEmail}
              hasErrors={hasErrors}
              label={"Email"}
              helperText={errors["email"]}
            />
            <CustomInput
              errors={errors}
              visible={hasErrors("password")}
              label={"Password"}
              value={password}
              handleChange={onChangePassword}
              hasErrors={hasErrors}
              helperText={errors["password"]}
            />

            <Button
              style={{ marginTop: 12 }}
              mode="contained"
              onPress={onSignInPressed}
            >
              Sign In
            </Button>

            <PopUpModal config={popUpModalConfig} />

            <Button style={{ marginTop: 12 }} onPress={onSignUpPressed}>
              Don't have an Account? Sign Up now
            </Button>
            <Button onPress={onForgetPasswordPressed}>Forget password</Button>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return <></>
  };

  return <View style={styles.root} >{getScreen()}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "white",
 
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  inputSpace: commonStyles.inputSpace,
  helperText: commonStyles.helperText,
});
export default SignInScreen;
