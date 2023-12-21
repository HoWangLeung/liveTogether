import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLogin } from "../services/LoginProvider";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import MainTabNavigator from "./MainTabNavigator";
import CreateNewGroupScreen from '../screens/CreateNewGroupScreen/CreateNewGroupScreen';
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import {   SignUpSuccessScreen } from "../screens/SignUpScreen/SignUpSuccessScreen";
import ForgetPasswordScreen from '../screens/ForgotPasswordScreen/ForgetPasswordScreen';
import ResetPasswordScreen from "../screens/ResetPasswordScreen/ResetPasswordScreen";
import UpdateSuccessfulScreen from "../screens/UpdateSuccessfulScreen/UpdateSuccessfulScreen";
const Stack = createNativeStackNavigator();

const SignInNavigator = ({ userDetail, setUserDetail }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" children={() => <SignInScreen />} />
      <Stack.Screen name="SignUp" children={() => <SignUpScreen />} />
      <Stack.Screen name="SignUpSuccess" children={() => <SignUpSuccessScreen />} />
      <Stack.Screen name="ForgetPassword" children={() => <ForgetPasswordScreen />} />
      <Stack.Screen name="ResetPasswordScreen" children={() => <ResetPasswordScreen />} />
      <Stack.Screen name="UpdateSuccessful" children={() => <UpdateSuccessfulScreen />} />
      <Stack.Screen
        name="Main"
        children={() => (
          <MainTabNavigator
            userDetail={userDetail}
            setUserDetail={setUserDetail}
          />
        )}
      />
   
    </Stack.Navigator>
  );
};

export default SignInNavigator;
