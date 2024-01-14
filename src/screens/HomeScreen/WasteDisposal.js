import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Button, Card, Text, Surface } from "react-native-paper";
import CustomCardContent from "../../components/CustomCardContent/CustomCardContent";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import commonStyles from "../../utils/CommonStyle";
import useBin from "../../services/useBin";
import { useDispatch, useSelector } from "react-redux";
import { setPopUpModal } from "../../redux/actions";
import CustomTaskCard from "../../components/CustomCardContent/CustomTaskCard";
import useTasks from "../../services/useTasks";
import Utils from "../../utils/Utils";
import { SUCCESS } from "../../utils/Constants";

const WasteDisposal = ({ bins, setBins, groupInfo }) => {
  const navigation = useNavigation();
  const binService = useBin();
  const dispatch = useDispatch();

  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const { fetchBinTasksAndDispatch, completeTask } = useTasks();
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

  const onEditPressed = (e, i) => {
    navigation.navigate("EditWasteDisposalScreen", {
      bin: bins[i],
    });
  };

  const getContent = () => {
    return (
      <View>
        <Text style={styles.titleLarge} variant="titleLarge">
          Taking out Rubbish
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
                type="bin"
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
export default WasteDisposal;
