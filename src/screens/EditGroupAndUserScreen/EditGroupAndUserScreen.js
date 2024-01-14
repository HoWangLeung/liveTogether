import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../utils/CommonStyle";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../services/LoginProvider";
import Utils from "../../utils/Utils";
import { ERROR_MANDATORY } from "../../utils/Constants";
import useGroupUser from "../../services/useGroupUser";
import { setPopUpModal } from "../../redux/actions";
import useAuth from "../../services/useAuth";

const EditGroupAndUserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const { groupInfo } = useSelector((state) => {
    return state.groupReducer;
  });
  const [username, setUsername] = useState(
    userDetail ? userDetail.username : "default"
  );
  const [group, setGroup] = useState({ name: groupInfo?groupInfo.name:"default" });
  const [errors, setErrors] = useState({});

  const {fetchUserProfileAndDispatch} = useAuth();

  const {} = useAuth()

  const groupUserService = useGroupUser();

  const handleSubmit = () => {
    if (!isValid()) {
      return;
    }
    group.app = "liveTogether";

    let payload = {
      groupName: group.name,
      username: username,
    };
    groupUserService
      .changeGroupAndUserInfo(payload)
      .then((res) => {
        fetchUserProfileAndDispatch();
        
        navigation.navigate("Profile");
        dispatch(
          setPopUpModal({
            visible: true,
            message: "Update successful",
            type: "success",
          })
        );
      })
      .catch((e) => {
        alert(e.response.data.message);
      })
      .finally(() => {});
  };

  const isValid = () => {
    let isValid = true;
    if (groupInfo && groupInfo.id && !group.name) {
      setErrors((s) => ({ ...s, groupName: ERROR_MANDATORY }));
      isValid = false;
    }
    if (!username) {
      setErrors((s) => ({ ...s, username: ERROR_MANDATORY }));
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

  const handleGroupNameChange = (newValue) => {
    Utils.removeError("groupName", errors, setErrors);
    setGroup({ ...group, name: newValue });
  };
  const handleUserNameChange = (newValue) => {
    Utils.removeError("username", errors, setErrors);
    setUsername(newValue);
  };

  return (
    <View style={styles.root}>
      <Button
        labelStyle={{ fontSize: 16 }}
        style={{ marginRight: "auto" }}
        onPress={() => navigation.navigate("Profile")}
      >
        Back
      </Button>
      <Text style={styles.title}>Edit Information</Text>
      {groupInfo && groupInfo.id && (
        <>
          <Text style={styles.sectionTitle}>Group</Text>
          <TextInput
            style={styles.inputSpace}
            label="Group Name"
            value={group.name}
            onChangeText={handleGroupNameChange}
          />
          <HelperText
            style={styles.helperText}
            type="error"
            visible={hasErrors("groupName")}
          >
            {errors["groupName"]}
          </HelperText>
        </>
      )}

      <Text style={styles.sectionTitle}>User</Text>
      <TextInput
        style={styles.inputSpace}
        label="Username"
        value={username}
        onChangeText={handleUserNameChange}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={hasErrors("username")}
      >
        {errors["username"]}
      </HelperText>

      <Button mode="contained" onPress={handleSubmit}>
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
  title: commonStyles.title,
});
export default EditGroupAndUserScreen;
