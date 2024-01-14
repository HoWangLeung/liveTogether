import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GroupService from "../../services/GroupService";
import { useLogin } from "../../services/LoginProvider";
import { useDispatch, useSelector } from "react-redux";
import { setGroupInfo, setInvitationModal } from "../../redux/actions";
import commonStyles from "../../utils/CommonStyle";
import { ERROR_MANDATORY } from "../../utils/Constants";
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import useAuth from "../../services/useAuth";

const CreateNewGroupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [group, setGroup] = useState({ name: "" });
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const [errors, setErrors] = useState({});
  const {fetchUserProfileAndDispatch} = useAuth();
  const createNewGroup = () => {
    if (!isValid()) {
      return;
    }
    group.app = "liveTogether";
    let userIds = [];
    userIds.push(userDetail.id);
    let payload = {
      group: group,
      userIds: userIds,
    };
    GroupService.addNewGroup(payload)
      .then((res) => {
        const group = res.data;
        let groupId = group.code;
        let userId = userDetail.id;
         
        dispatch(setInvitationModal(true));
        dispatch(setGroupInfo(res.data));
        fetchUserProfileAndDispatch()
        navigation.navigate("Profile");
      })
      .catch((e) => {
        alert(e.response.data.message);
      })

      .finally(() => {});
  };

  const isValid = () => {
    let isValid = true;
    if (!group.name) {
      setErrors((s) => ({ ...s, groupName: ERROR_MANDATORY }));
      isValid = false;
    }

    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  const handleChange = (newName) => {
    setErrors({});
    setGroup({ ...group, name: newName });
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
      <Text style={styles.sectionTitle}>Create New Group</Text>
      <TextInput
        style={styles.inputSpace}
        label="Group Name"
        value={group.name}
        onChangeText={handleChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("groupName")}
      >
        {errors["groupName"]}
      </HelperText>
      <Button mode="contained" onPress={createNewGroup}>
        Confirm
      </Button>
      {/* <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Cancel
      </Button> */}
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
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
export default CreateNewGroupScreen;
