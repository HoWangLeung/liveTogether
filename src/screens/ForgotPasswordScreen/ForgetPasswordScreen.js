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
import { useNavigation } from "@react-navigation/native";
import Auth from "../../services/Auth";
const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("hkz88i00123@gmail.com");
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [requestSent, setRequestSent] = useState(false);

  const confirmEmailScreen = () => {
    
  };

  const onSendPressed = () => {
    if (!email) {
      alert("You must enter a valid email");
      return;
    }
    Auth.requestResetPassword({ email: email })
      .then((res) => {
        setRequestSent(true);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const handleCodeChange = (newCode) => {
    
    setCode(newCode);
    if (newCode.length === 6) {
      Auth.verifyResetPasswordCode({ email, code:newCode })
        .then(() => {
   
          navigation.navigate("ResetPasswordScreen",{email})
          
        })
        .catch((e) => {
          if (e.response.data) {
            alert(e.response.data.message);
          }
        });
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
      <Text style={styles.title}>Reset your password</Text>
      <TextInput
        required
        style={[styles.inputSpace]}
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <Button onPress={onSendPressed}>
        {requestSent ? "Resend" : "Submit"}
      </Button>
      {requestSent && (
        <View>
          <TextInput
            required
            style={[styles.inputSpace]}
            label="Verification Code"
            value={code}
            onChangeText={handleCodeChange}
          />
        </View>
      )}
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
export default ForgetPasswordScreen;
