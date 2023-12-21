import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GroupService from "../../services/GroupService";
import { useLogin } from "../../services/LoginProvider";
import { useDispatch } from "react-redux";
import { setGroupInfo, setInvitationModal } from "../../redux/actions";

const CreateNewGroupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [group, setGroup] = useState({ name: "Lockton CLose 23" });
  const { isLoggedIn, setIsLoggedIn, userDetail, setUserDetail } = useLogin();
  const createNewGroup = () => {
    group.app = "liveTogether";
    GroupService.addNewGroup(group)
      .then((res) => {
        const group = res.data;
        
        
        let groupId = group.code;
        let userId = userDetail.id;
        GroupService.addUserToGroup(userId, groupId)
          .then((res) => {
            
            dispatch(setInvitationModal(true))
            dispatch(setGroupInfo(res.data))
            navigation.navigate("Home");
          })
          .catch((e) => {
            
          });
      })
      .catch((e) => {
        
      })

      .finally(() => {});
  };
  return (
    <View>
      <Text>CreateNewGroupScreen</Text>
      <TextInput
        label="Group Name"
        value={group.name}
        onChangeText={(text) => setGroup({ ...group, name: text })}
      />
      <Button mode="contained" onPress={createNewGroup}>
        Confirm
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Cancel
      </Button>
    </View>
  );
};

export default CreateNewGroupScreen;
