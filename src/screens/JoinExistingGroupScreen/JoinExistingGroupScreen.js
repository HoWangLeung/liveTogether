import { View, Text } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import GroupService from "../../services/GroupService";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../HomeScreen/HomeScreen";
import { useDispatch } from "react-redux";
import { setGroupInfo } from "../../redux/actions";

const JoinExistingGroupScreen = ({ userDetail, setUserDetail }) => {
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const joinExistingGroup = () => {
    let userId = userDetail.id;
    let groupId = code;
    GroupService.addUserToGroup(userId, groupId)
      .then((res) => {
        dispatch(setGroupInfo(res.data))
        navigation.navigate("Home");
      })
      .catch((e) => {
        alert("The code doesn't exist");
      });
  };
  return (
    <View>
      <TextInput
        style={{ width: "100%" }}
        label="Code"
        value={code}
        onChangeText={(code) => setCode(code)}
      />
      <Button onPress={joinExistingGroup}>Confirm</Button>
    </View>
  );
};

export default JoinExistingGroupScreen;
