import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  Text,
  Surface,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import CustomCardContent from "../../components/CustomCardContent/CustomCardContent";
import WasteDisposal from "./WasteDisposal";
import BinCollection from "./BinCollection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";
import { useLogin } from "../../services/LoginProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import InvitationModal from "../../components/Modal/InvitationModal";
import { useDispatch, useSelector } from "react-redux";
import groupReducer from "../../redux/groupReducer";
import { setInvitationModal } from "../../redux/actions";
import useGroup from "../../services/useGroup";
// const BASE_URL="test"
const HomeScreen = () => {
  const dispatch = useDispatch();
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [bins, setBins] = useState([]);
  const { isLoggedIn, setIsLoggedIn, userDetail, setUserDetail } = useLogin();
  const navigation = useNavigation();
  const { isOpen } = useSelector((state) => state.userReducer);

  const { groupInfo } = useGroup(userDetail.id);

  useFocusEffect(
    React.useCallback(() => {
      if (!groupInfo || !groupInfo.id) {
        return;
      }
      axios
        .get(`${BASE_URL}/liveTogether/api/bins/${groupInfo.id}`)
        // .then(res=> res.json())
        .then((result) => {
          setBins(result.data);
          setIsLoading(false);
        })
        .catch((e) => {});

      return () => {};
    }, [groupInfo])
  );

  useEffect(() => {
    if (groupInfo && groupInfo.group && groupInfo.group.code) {
      setUserDetail((state) => ({
        ...state,
        group: {
          ...state.group,
          id: groupInfo.group.id,
        },
      }));
    }
    return () => {};
  }, [groupInfo]);

  const onDonePressed = (e, i) => {
    let binId = data[i].id;

    axios
      .post(`${BASE_URL}/liveTogether/api/bins/${binId}`)
      // .then(res=> res.json())
      .then((result) => {
        setBins(result.data);
      })
      .catch((e) => {});
  };
  const showModal = () => {
    dispatch(setInvitationModal(true));
  };
  const hideModal = () => {
    dispatch(setInvitationModal(false));
  };
  const getContent = () => {
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };
  const createNewGroup = () => {
    //CreateNewGroupScreen
    navigation.navigate("CreateNewGroupScreen");
  };

  const getScreen = () => {

    if (isLoggedIn && (!userDetail.group || userDetail.group == null)) {
      return (
        <View style={{ height: "100%" }}>
          <View style={styles.container}>
            <Button onPress={createNewGroup}>
              Create a Group for your address
            </Button>
            <Text>Or</Text>
            <Button
              onPress={() => navigation.navigate("JoinExistingGroupScreen")}
            >
              Join an existing Group
            </Button>
          </View>
        </View>
      );
    }

    return (
      <>
        <View style={styles.box1}>
          <WasteDisposal groupInfo={groupInfo} bins={bins} setBins={setBins} />
        </View>

        <View style={styles.box2}>
          <BinCollection groupInfo={groupInfo} bins={bins} setBins={setBins} />
        </View>
        <Modal
          theme={{
            colors: {
              backdrop: "transparent",
            },
          }}
          visible={isOpen.isOpen}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            height: "30%",
            alignSelf: "center",
            borderRadius: "10%",
          }}
        >
          <ScrollView>
            <Text>
              You have successfully created a new group. Now send the code to
              your friend and ask them to Join your group.
            </Text>
            {groupInfo && groupInfo.group && (
              <Text>{groupInfo.group.code}</Text>
            )}
            <Button onPress={hideModal}>OK</Button>
          </ScrollView>
        </Modal>
      </>
    );
  };

  return (
    <ScrollView>
      {/* First Page (Red) */}
      {getScreen()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 600,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
  box1: {
    width: "100%",
    height: 450,
    backgroundColor: "white",
  },
  box2: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
  },
  box3: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  logo: {},
  listButton: {
    float: "right",
  },
  listItemView: {},
  listItem: {
    backgroundColor: "blue",
    borderRadius: "20",
  },
});
export default HomeScreen;
