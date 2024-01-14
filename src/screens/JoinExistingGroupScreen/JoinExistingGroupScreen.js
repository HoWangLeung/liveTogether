import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useState } from "react";
import GroupService from "../../services/GroupService";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../HomeScreen/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { setGroupInfo, setLoginDetail } from "../../redux/actions";
import commonStyles from "../../utils/CommonStyle";
import { ERROR_MANDATORY } from "../../utils/Constants";
import Auth from "../../services/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JoinExistingGroupScreen = () => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState("");
  const navigation = useNavigation();
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const { groupInfo } = useSelector((state) => {
    return state.groupReducer;
  });
  const dispatch = useDispatch();

  const joinExistingGroup = () => {
    if (!isValid()) {
      return;
    }

    let userId = userDetail.id;
    let groupId = code;
    GroupService.addUserToGroup(userId, groupId)
      .then(async (res) => {
        dispatch(setGroupInfo(res.data.group));
        let newUserDetail = { ...userDetail };
        if (!newUserDetail.group) {
          newUserDetail.group = {};
        }
        newUserDetail.group.id = res.data.group.id;
        dispatch(
          setLoginDetail({
            isLoggedIn: isLoggedIn,
            userDetail: newUserDetail,
          })
        );
       
        Auth.getUserProfile()
          .then((data) => {
            
            dispatch(
              setLoginDetail({
                isLoggedIn: true,
                userDetail: data,
              })
            );
          })
          .catch((e) => {
            
          });

        navigation.navigate("Profile");
      })
      .catch((e) => {
        alert("The code doesn't exist");
      });
  };
  const isValid = () => {
    let isValid = true;
    if (!code) {
      setErrors((s) => ({ ...s, code: ERROR_MANDATORY }));
      isValid = false;
    }

    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        isValid = false;
      }
    });

    return isValid;
  };
  const handleChange = (newCode) => {
    setErrors({});
    setCode(newCode);
  };
  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.root}>
      <Button
        labelStyle={{ fontSize: 16 }}
        style={{ marginRight: "auto" }}
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      >
        Back
      </Button>
      <Text style={styles.sectionTitle}>Join an existing group</Text>
      <TextInput
        style={styles.inputSpace}
        label="Code"
        value={code}
        onChangeText={handleChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("code")}
      >
        {errors["code"]}
      </HelperText>
      <Button mode="contained" onPress={joinExistingGroup}>Confirm</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
    alignItems:"center"
  },
  surface: {
    padding: 8,
    height: 50,
    margin: 20,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 15,
  },
  inputSpace: commonStyles.inputSpace,
  sectionTitle: commonStyles.sectionTitle,
  helperText: commonStyles.helperText,
});

export default JoinExistingGroupScreen;
