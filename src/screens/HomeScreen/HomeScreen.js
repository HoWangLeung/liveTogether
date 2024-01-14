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
import Animated from "react-native-reanimated";
import {
  FadeIn,
 
} from "react-native-reanimated";
import {
  setGroupInfo,
  setInvitationModal,
  setLoginDetail,
} from "../../redux/actions";
import useGroup from "../../services/useGroup";
import PopUpModal from "../../components/Modal/PopUpModal";
import useTasks from "../../services/useTasks";
import LoadingScreen from "../Common/LoadingScreen";
// const BASE_URL="test"
const HomeScreen = () => {
  const dispatch = useDispatch();
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [bins, setBins] = useState([]);

  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const { isOpen } = useSelector((state) => state.userReducer);
  const groupService = useGroup();

  const { groupInfo } = useSelector((state) => {
    return state.groupReducer;
  });

  const popUpModalConfig = useSelector(
    (state) => state.profileScreenReducer.popUpModalConfig
  );
  const [loading, setLoading] = useState(false);
  const { fetchBinTasksAndDispatch } = useTasks();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      if (!userDetail.id) {
        return;
      }
      groupService.fetchGroup(userDetail.id).then((groupInfo) => {
        dispatch(setGroupInfo(groupInfo));
      });

      if (!userDetail.group || !userDetail.group.id) {
        return;
      }
      fetchBinTasksAndDispatch(userDetail.group.id).then((result) => {
        setBins(result.data);
        setLoading(false);
      });

      return () => {};
    }, [userDetail])
  );

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

  const createNewGroup = () => {
    //CreateNewGroupScreen
    navigation.navigate("CreateNewGroupScreen");
  };

  const getScreen = () => {
    if (loading) {
      return <LoadingScreen />;
    }

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
      <Animated.View
        entering={FadeIn}
      >
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
      </Animated.View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        {getScreen()}
        <PopUpModal config={popUpModalConfig} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
  },
  box1: {
    width: "100%",
    height: "auto",
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
