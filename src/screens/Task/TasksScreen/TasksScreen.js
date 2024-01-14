import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTasks from "../../../services/useTasks";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomTaskCard from "../../../components/CustomCardContent/CustomTaskCard";
import PopUpModal from "../../../components/Modal/PopUpModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Utils from "../../../utils/Utils";
import { SUCCESS } from "../../../utils/Constants";

export default function TasksScreen() {
  const dispatch = useDispatch();
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const { groupInfo } = useSelector((state) => {
    return state.groupReducer;
  });
  const { tasks } = useSelector((state) => state.taskReducer);
  const { fetchTasksAndDispatch, completeTask, deleteTask } = useTasks();
  const popUpModalConfig = useSelector(
    (state) => state.profileScreenReducer.popUpModalConfig
  );

  const navigation = useNavigation();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (userDetail.group) {
  //       fetchTasksAndDispatch(userDetail.group.id);
  //     }

  //     return () => {};
  //   }, [])
  // );

  useFocusEffect(
    React.useCallback(() => {
      if (userDetail.group.id) {
        fetchTasksAndDispatch(userDetail.group.id).catch((e) => {});
      }
    }, [])
  );

  const onDonePressed = (e, i) => {
    const task = tasks[i];
    const taskId = task.id;
    let userId = userDetail.id;
    console.log(taskId, userId);
    completeTask(taskId, userId).then(() => {
      fetchTasksAndDispatch(userDetail.group.id).then(() => {
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
    let task = tasks[i];
    navigation.navigate("CreateTaskScreen", {
      isEdit: true,
      task: task,
    });
  };
  const createTask = () => {
    navigation.navigate("CreateTaskScreen", {
      isEdit: false,
      task: null,
    });
  };
  return (
    <ScrollView>
      <View style={[styles.container]}>
        <CustomButton
          style={{
            marginLeft: "auto",
            marginTop: 10,
            marginRight: 5,
          }}
          text={"Create Task"}
          onPress={createTask}
        />
        {tasks &&
          tasks.map((item, i) => {
            return (
              <CustomTaskCard
                groupInfo={groupInfo}
                onEditPressed={(e) => onEditPressed(e, i)}
                onDonePressed={onDonePressed}
                key={item.id}
                i={i}
                item={item}
                type="task"
              />
            );
          })}
      </View>
      <PopUpModal config={popUpModalConfig} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 600,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
  box: {
    width: "100%",
    height: 450,
    backgroundColor: "white",
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
