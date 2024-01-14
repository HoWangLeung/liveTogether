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
import { useDispatch, useSelector } from "react-redux";
import { setPopUpModal } from "../../redux/actions";
import PopUpModal from "../../components/Modal/PopUpModal";
const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [requestSent, setRequestSent] = useState(false);
  const dispatch = useDispatch();
  const confirmEmailScreen = () => {};
  const popUpModalConfig = useSelector(
    (state) => state.profileScreenReducer.popUpModalConfig
  );
  const onSendPressed = () => {
    if (!email) {
      dispatch(
        setPopUpModal({
          visible: true,
          message: "You must enter a valid email.",
          type: "error",
        })
      );
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
    if (newCode.length > 6) {
      alert("The length of the code must be 6");
      return;
    }
    setCode(newCode);
    if (newCode.length === 6) {
      Auth.verifyResetPasswordCode({ email, code: newCode })
        .then(() => {
          navigation.navigate("ResetPasswordScreen", { email });
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
      <Button mode="contained" onPress={onSendPressed}>
        {requestSent ? "Resend" : "Submit"}
      </Button>

      <PopUpModal config={popUpModalConfig} />
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
