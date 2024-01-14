import { CustomInput } from "./../../../components/CustomInput/CustomInput";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../services/useAuth";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
import commonStyles from "../../../utils/CommonStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import DragAndSwapBoxes from "./DragAndSwapBoxes";
import Box from "./Box";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useTasks from "../../../services/useTasks";
import Utils from "../../../utils/Utils";
import { SUCCESS } from "../../../utils/Constants";

const CreateTaskScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [group, setGroup] = useState({ name: "" });
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const [errors, setErrors] = useState({});
  const { fetchUserProfileAndDispatch } = useAuth();
  const {
    fetchTasksAndDispatch,
    completeTask,
    createTask,
    editTask,
    deleteTask,
  } = useTasks();
  const { isEdit } = route.params;

  const { groupInfo } = useSelector((state) => {
    return state.groupReducer;
  });
  let users = [];
  if (groupInfo.users) {
    users = groupInfo.users;
  }
  const styles = getStyles({ users });
  const [boxes, setBoxes] = useState([]);
  const [task, setTask] = useState(
    route.params.task
      ? route.params.task
      : {
          name: "",
          type: "",
          score: "",
          taskSequences: [],
        }
  );
  const [res, setRes] = useState({});

  let r = users.reduce((result, user, index) => {
    result[index] = index;
    return result;
  }, {});
  const positions = useSharedValue(r);

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

  useEffect(() => {
    let newBoxes = [];
    if (newBoxes.length != 0) return;

    if (task.taskSequences.length > 0) {
      task.taskSequences.forEach((seq, index) => {
        let box = {
          id: index,
          position: seq.position,
          text: users
            .find((u) => u.id === seq.userId)
            .username[0].toUpperCase(),
          userId: seq.userId,
          avatarColor: users.find((u) => u.id === seq.userId).avatarColor,
        };
        newBoxes.push(box);
      });
    } else {
      for (const [index, user] of users.entries()) {
        let box = {
          id: index,
          position: index,
          text: user.username[0].toUpperCase(),
          userId: user.id,
          avatarColor: user.avatarColor,
        };
        newBoxes.push(box);
      }
    }

    setBoxes([...newBoxes]);

    let result = {};
    if (task.taskSequences.length > 0) {
      for (const item of newBoxes) {
        result[item.id] = item.position;
      }
    } else {
      for (const item of newBoxes) {
        result[item.id] = item.id;
      }
    }

    positions.value = withTiming(result);

    return () => {};
  }, []);

  const hasErrors = (field) => {
    if (errors[field]) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    return () => {};
  }, [res]);

  useEffect(() => {
    return () => {};
  }, [task]);

  const handleChange = (field, value) => {
    // setErrors({});
    // setGroup({ ...group, name: newValue });
    setTask((s) => ({
      ...s,
      [field]: value,
    }));
  };

  const createNewGroup = () => {
    let taskSequences = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (!user.position) {
        user.position = i;
      }
      let taskSequence = {
        userId: user.id,
        position: Utils.isObjEmpty(res)
          ? user.position
          : res[`${user.position}`],
      };
      taskSequences.push(taskSequence);
    }
    task.taskSequences = taskSequences;

    setTask(task);
    let payload = {
      task: task,
    };
    if (isEdit) {
      console.log("Task",task.taskSequences);
      editTask(payload).then(() => {
        navigation.navigate("Main", { screen: "Task" });
        Utils.showPopUp(dispatch, SUCCESS, true, "Successfully Updated");
      });
    } else {
      createTask(payload).then(() => {
        navigation.navigate("Main", { screen: "Task" });
        Utils.showPopUp(dispatch, SUCCESS, true, "Successfully Created");
      });
    }
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Button
          labelStyle={{ fontSize: 16 }}
          style={{ marginRight: "auto" }}
          onPress={() => navigation.navigate("Main", { screen: "Task" })}
        >
          Back
        </Button>

        <Text style={styles.sectionTitle}>
          {isEdit ? "Edit Task" : "Create New Task"}
        </Text>
        <CustomInput
          errors={errors}
          visible={hasErrors("name")}
          value={task.name}
          handleChange={handleChange}
          hasErrors={hasErrors}
          label={"Name"}
          name={"name"}
        />
        <CustomInput
          errors={errors}
          visible={hasErrors("type")}
          value={task.type}
          handleChange={handleChange}
          hasErrors={hasErrors}
          label={"Location"}
          name={"type"}
        />
        <CustomInput
          errors={errors}
          visible={hasErrors("type")}
          value={task.score}
          handleChange={handleChange}
          hasErrors={hasErrors}
          label={"Score"}
          name={"score"}
        />

        <Text style={styles.sectionTitle}>Sequences (Drag to Re-Order)</Text>

        <View style={styles.wrapper}>
          {boxes.map((item) => (
            <DragAndSwapBoxes
              setRes={setRes}
              key={item.id}
              positions={positions}
              id={item.id}
            >
              <View style={{ position: "relative" }}>
                {/* <Text style={{ position: "absolute", right: 10, bottom: 0 }}>
                  {res[`${item.id}`]}
                </Text> */}
                <Box
                  avatarColor={item.avatarColor}
                  key={item.id}
                  text={item.text}
                />
              </View>
            </DragAndSwapBoxes>
          ))}
        </View>

        <Button mode="contained" onPress={createNewGroup}>
          Confirm
        </Button>
      </View>
    </ScrollView>
  );
};
const getStyles = ({ users }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: 20,
      backgroundColor: "white",
      height: "100%",
      alignItems: "center",
      // backgroundColor: "red",
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
    wrapper: {
      marginTop: 10,
      height: (users.length % 3 == 0 ? users.length : users.length % 3) * 41,
      width: "100%",
      // backgroundColor: "green",
      position: "relative",
    },
  });
export default CreateTaskScreen;
