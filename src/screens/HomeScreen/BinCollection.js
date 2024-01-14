import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  Text,
  Surface,
  Modal,
  TextInput,
  Portal,
} from "react-native-paper";
import CustomCardContent from "../../components/CustomCardContent/CustomCardContent";
import { BASE_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";
import useBin from "../../services/useBin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import commonStyles from "../../utils/CommonStyle";
import { useDispatch, useSelector } from 'react-redux';
import { setPopUpModal } from "../../redux/actions";
import CustomTaskCard from "../../components/CustomCardContent/CustomTaskCard";
import useTasks from "../../services/useTasks";
import { SUCCESS } from "../../utils/Constants";
import Utils from "../../utils/Utils";
// const BASE_URL="test"
const BinCollection = ({ bins, setBins, groupInfo }) => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const { fetchBinTasksAndDispatch, completeTask } = useTasks();
  const navigation = useNavigation();
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();

  let [modal, setModal] = useState({
    isOpen: false,
  });
  let [currentData, setCurrentData] = useState({
    type: "",
  });
  let { editBin, fetchBins } = useBin();
  let [interval, setInterval] = useState(14);

  const onDonePressed = async (e, i) => {
    const task = bins[i];
    const taskId = task.id;
    let userId = userDetail.id;
    console.log(taskId, userId);
    completeTask(taskId, userId).then(() => {
      fetchBinTasksAndDispatch(userDetail.group.id).then((res) => {
        setBins(res.data);
        Utils.showPopUp(
          dispatch,
          SUCCESS,
          true,
          "Successfully Completed",
          `${userDetail.username} has been awarded ${task.score} points`
        );
      });
    });
  };

  const hideModal = () => {
    setModal((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  const onEditPressed = (e, i) => {
    navigation.navigate("EditBinCollectionScreen", {
      bin: bins[i],
    });
  };

  const onConfirmPressed = (e) => {
    let payload = {
      id: currentData.id,
      date: date,
      interval: interval,
    };
    editBin(payload)
      .then((d) => {
        setModal((state) => ({
          ...state,
          isOpen: false,
        }));
      })
      .then(() => {
        fetchBins({
          groupId: groupInfo.id,
        })
          .then((d) => {
            setBins([...d]);
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };

  const getContent = () => {
    return (
      <View>
        <Text style={styles.titleLarge} variant="titleLarge">
          Council Bin Collection
        </Text>
        <View style={[styles.container]}>
          {bins &&
            bins.map((item, i) => (
              <CustomTaskCard
              groupInfo={groupInfo}
              onEditPressed={(e) => onEditPressed(e, i)}
              onDonePressed={onDonePressed}
              key={item.id}
              i={i}
              item={item}
              type="binCollection"
            />
            ))}
        </View>
      </View>
    );
  };

  return <View>{getContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  box: {
    // width: 50,
    //height: 100,
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
  titleLarge: commonStyles.titleLarge,
});
export default BinCollection;
