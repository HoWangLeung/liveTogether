import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {
  Avatar,
  Text,
  Button,
  Modal,
  PaperProvider,
  Portal,
  Surface,
  Chip,
} from "react-native-paper";
import { useLogin } from "../../services/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react/cjs/react.production.min";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import InvitationModal from "../../components/Modal/InvitationModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupInfo,
  setInvitationModal,
  setLoginDetail,
  setPopUpDialog,
  setPopUpModal,
} from "../../redux/actions";
import useGroup from "../../services/useGroup";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import Auth from "../../services/Auth";
import useGroupUser from "../../services/useGroupUser";
import commonStyles from "../../utils/CommonStyle";
import PopUpModal from "../../components/Modal/PopUpModal";
import SignInScreen from "../SignInScreen/SignInScreen";
import PopUpDialog from "../../components/Modal/PopUpDialog";

const ProfileScreen = () => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.userReducer);

  const [icon, setIcon] = useState("content-copy");

  const userGroupService = useGroupUser();

  const popUpModalConfig = useSelector(
    (state) => state.profileScreenReducer.popUpModalConfig
  );

  const popUpDialogConfig = useSelector(
    (state) => state.profileScreenReducer.popUpDialogConfig
  );

  const { groupInfo } = useSelector((state) => {
    return state.groupReducer;
  });

  const showModal = () => {
    dispatch(setInvitationModal(true));
  };
  const hideModal = () => {
    dispatch(setInvitationModal(false));
    setTimeout(function () {
      setIcon("content-copy");
    }, 300);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     Auth.getUserProfile();

  //     return () => {};
  //   }, [])
  // );
  const signOut = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    if (token) {
      await AsyncStorage.removeItem("accessToken");
      dispatch(
        setLoginDetail({
          isLoggedIn: false,
          userDetail: {},
        })
      );
      dispatch(setGroupInfo({}));
      navigation.navigate("SignIn", { screen: "SignIn" });
    }
    console.clear();
  };
  const getAvatarLabel = (userDetail) => {
    if (userDetail && userDetail.email && userDetail.email[0]) {
      return userDetail.email[0].toUpperCase();
    }
    return "NO";
  };

  const onPressLeaveGroup = () => {
    dispatch(
      setPopUpDialog({
        visible: true,
        message: "Are you sure you want to leave the group?",
        type: "warning",
        onDonePressed: confirmLeaveGroup,
      })
    );
  };

  const confirmLeaveGroup = () => {
    userGroupService
      .exitGroup(userDetail.id, groupInfo.code)
      .then(() => {
        dispatch(
          setPopUpDialog({
            visible: false,
            message: "Are you sure you want to leave the group?",
            type: "warning",
            onDonePressed: confirmLeaveGroup,
          })
        );
        signOut();
        dispatch(
          setPopUpModal({
            visible: true,
            message: "You have left the group.",
            type: "success",
          })
        );
      })

      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const handleDeleteAccount = () => {
    dispatch(
      setPopUpDialog({
        visible: true,
        message: "Are you sure you want to delete your account?",
        type: "warning",
        onDonePressed: confirmDeleteAccount,
      })
    );
  };

  const confirmDeleteAccount = () => {
    userGroupService
      .deleteAccount(userDetail.id)
      .then(() => {
        signOut();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const handleEditGroupAndUser = () => {
    navigation.navigate("EditGroupAndUserScreen");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePasswordScreen");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>About You</Text>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Avatar.Text
            style={{
              backgroundColor: userDetail.avatarColor
                ? userDetail.avatarColor
                : "#F44336",
            }}
            size={150}
            label={getAvatarLabel(userDetail)}
          />
        </View>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Text style={{ margin: 5 }}>{userDetail.username}</Text>
          <Text style={{ margin: 5 }}>{userDetail.email}</Text>
          <Text style={{ margin: 5 }}>
            {userDetail.group ? userDetail.group.name : "No Group"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>General</Text>
        <Button style={{ marginTop: 10 }} onPress={handleEditGroupAndUser}>
          Edit General Information
        </Button>

        <Button style={{ marginTop: 10 }} onPress={handleChangePassword}>
          Change Password
        </Button>

        <PopUpModal config={popUpModalConfig} />
        <PopUpDialog config={popUpDialogConfig} />
        <Button
          style={{ marginTop: 10 }}
          textColor="red"
          onPress={handleDeleteAccount}
        >
          Delete Account
        </Button>
        {groupInfo.id && <Text style={styles.sectionTitle}>Members</Text>}
        {groupInfo && groupInfo.users && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
              flexWrap: "wrap",
            }}
          >
            {groupInfo.users.map((user) => {
              return (
                <View
                  key={user.id}
                  style={{ alignItems: "center", margin: 10, flexBasis: "20%" }}
                >
                  <Avatar.Text
                    style={{
                      backgroundColor: user.avatarColor
                        ? user.avatarColor
                        : "#F44336",
                    }}
                    size={40}
                    label={user.email[0].toUpperCase()}
                  />
                </View>
              );
            })}
          </View>
        )}
        {groupInfo.id && (
          <Text style={styles.sectionTitle}>Group Management</Text>
        )}

        <Portal>
          <Modal
            visible={isOpen.isOpen}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              // height: 120,
              alignSelf: "center",
              borderRadius: 20,
            }}
          >
            <View>
              <Text style={styles.textSpace}>
                Share the code with your friends.
              </Text>
              <Text style={styles.textSpace}>
                They can use the code to join the group after downloading the
                app.
              </Text>
              <Chip
                style={styles.textSpace}
                closeIcon={icon}
                onClose={async () => {
                  await Clipboard.setStringAsync(groupInfo.code);

                  setIcon("check-circle");
                }}
              >
                {groupInfo.code}
              </Chip>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Button mode="contained" onPress={hideModal}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        {groupInfo && groupInfo.id && (
          <>
            <Button
              style={{ marginTop: 10 }}
              onPress={() => dispatch(setInvitationModal(true))}
            >
              Invite To the Group
            </Button>
            <Button
              textColor="red"
              style={{ marginTop: 0 }}
              onPress={onPressLeaveGroup}
            >
              Leave Group
            </Button>
          </>
        )}

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Button mode="contained" title="Log out" onPress={signOut}>
            Log out
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  sectionTitle: commonStyles.sectionTitle,
  textSpace: commonStyles.textSpace,
});
