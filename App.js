// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SignInScreen from "./src/screens/SignInScreen/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "./src/screens/ConfirmEmailScreen/ConfirmEmailScreen";
import ForgetPasswordScreen from "./src/screens/ForgotPasswordScreen/ForgetPasswordScreen";
import Navigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./src/navigation/MainTabNavigator.js";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginProvider from "./src/services/LoginProvider";
import MainNavigator from "./src/navigation/MainNavigator";
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <LoginProvider>
        <SafeAreaView style={styles.container}>
          <PaperProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaView>
      </LoginProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
