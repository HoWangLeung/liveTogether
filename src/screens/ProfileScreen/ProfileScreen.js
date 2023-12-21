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
import { useFocusEffect } from "@react-navigation/native";
import InvitationModal from "../../components/Modal/InvitationModal";
import { useDispatch, useSelector } from "react-redux";
import { setGroupInfo, setInvitationModal } from "../../redux/actions";
import useGroup from "../../services/useGroup";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import Auth from "../../services/Auth";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, setIsLoggedIn, userDetail, setUserDetail, fetchUser } =
    useLogin();
  const { isOpen } = useSelector((state) => state.userReducer);

  const { groupInfo } = useGroup(userDetail.id);

  const [icon, setIcon] = useState("content-copy");

  const showModal = () => {
    dispatch(setInvitationModal(true));
  };
  const hideModal = () => {
    dispatch(setInvitationModal(false));
    setTimeout(function () {
      setIcon("content-copy");
    }, 300);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();

      return () => {};
    }, [])
  );
  const signOut = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    if (token) {
      await AsyncStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      setUserDetail({});
      dispatch(setGroupInfo({}));
    }
  };
  const getAvatarLabel = (userDetail) => {
    if (userDetail && userDetail.email && userDetail.email[0]) {
      return userDetail.email[0].toUpperCase();
    }
    return "NO";
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>About You</Text>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Avatar.Text size={150} label={getAvatarLabel(userDetail)} />
        </View>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Text style={{ margin: 5 }}>{userDetail.username}</Text>
          <Text style={{ margin: 5 }}>{userDetail.email}</Text>
          <Text style={{ margin: 5 }}>
            {userDetail.group ? userDetail.group.name : "No Group"}
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Members</Text>
        {groupInfo && groupInfo.users && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            {groupInfo.users.map((user) => {
              return (
                <View
                  key={user.id}
                  style={{ alignItems: "center", margin: 10 }}
                >
                  <Avatar.Text size={40} label={user.email[0].toUpperCase()} />
                </View>
              );
            })}
          </View>
        )}
        <Text style={styles.sectionTitle}>Group Management</Text>

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
              <Text>Share the code to your friends</Text>
              <Text>They can use the code to join the group</Text>

              <Chip
                closeIcon={icon}
                onClose={async () => {
                  console.log("trying ");
                  await Clipboard.setStringAsync(groupInfo.code);
                  console.log("completed");
                  setIcon("check-circle");
                }}
              >
                {groupInfo.code}
              </Chip>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Button
                  style={{ width: 80 }}
                  mode="outlined"
                  onPress={hideModal}
                >
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <Button
          style={{ marginTop: 10 }}
          onPress={() => dispatch(setInvitationModal(true))}
        >
          Invite To the Group
        </Button>

        <Button
          textColor="red"
          style={{ marginTop: 0 }}
          onPress={() => dispatch(setInvitationModal(true))}
        >
          Leave Group
        </Button>

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
  sectionTitle: {
    marginRight: "auto",
    fontWeight: 600,
    fontSize: 20,
    marginTop: 10,
  },
});
