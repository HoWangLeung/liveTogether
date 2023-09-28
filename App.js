import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SignInScreen from "./src/screens/SignInScreen/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "./src/screens/ConfirmEmailScreen/ConfirmEmailScreen";
import ForgetPasswordScreen from "./src/screens/ForgotPasswordScreen/ForgetPasswordScreen";
import Navigation from "./src/navigation";
import Home from './src/screens/HomeScreen'
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <SignUpScreen/> */}
      {/* <ForgetPasswordScreen/>
       */}
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
