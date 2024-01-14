import { View, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Button, Text, Card, Surface, Avatar, Modal } from "react-native-paper";
import Utils from "../../utils/Utils";
import { BIN_COLLECTION } from "../../utils/Constants";
import { useSelector } from "react-redux";
import Animated from "react-native-reanimated";

import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedRef,
  useReducedMotion,
  Easing,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import useTasks from "../../services/useTasks";
const CustomTaskCard = ({
  item,
  onDonePressed,
  onEditPressed,
  i,
  type,
  groupInfo,
}) => {
  let v = 55;
  const height = useSharedValue(v);
  height.value = v;
  if(type === "binCollection"){
    height.value = v+20
  }
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const animatedRef = useAnimatedRef();
  const { fetchTasksAndDispatch } = useTasks();
  const getUser = (type, item) => {
    if (!groupInfo || !groupInfo.users) {
      return "";
    }

    let user;
    switch (type) {
      default:
        user = groupInfo.users.find((d) => d.id === item.currentId);
        return user;
    }
  };

  const formatName = (username) => {
    if (!username) {
      return "";
    }
    const maxLength = 8;
    if (username.length > maxLength) {
      const truncated = username.substring(0, maxLength) + "...";
      return truncated;
    } else {
      return username;
    }
  };

  const handleClick = () => {
    if (height.value > 100) {
      height.value = withTiming(height.value - 150, {
        duration: 300,
        // easing: Easing.inOut(Easing.quad),
      });
    } else {
      height.value = withTiming(height.value + 150, {
        duration: 300,
        // easing: Easing.inOut(Easing.quad),
      });
    }
  };

 

  const animatedStyles = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Pressable onPress={handleClick}>
      <GestureHandlerRootView>
        <Animated.View style={[styles.cardContainer, animatedStyles]}>
          <View style={styles.cardContent}>
            <View style={{ flexDirection: "row", flexBasis: "auto" }}>
              <Avatar.Icon
                size={45}
                icon="delete"
                color={item.color}
                style={{ backgroundColor: "white", marginRight: 5 }}
              />
            </View>
            <View style={{ flexDirection: "row", flexBasis: 200 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 500 }}>{item.displayName}</Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text>{`${formatName(
                    getUser(type, item).username
                  )} 's turn`}</Text>
                </View>
                {type === "binCollection" && (
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text>{`${Utils.formatDate(
                      item.dueDate,
                      "DD-MM-YYYY"
                    )}`}</Text>
                  </View>
                )}
              </View>
            </View>

            <View>
              <Button onPress={(e) => onEditPressed(e, i)}> Edit</Button>
            </View>

            <Button onPress={(e) => onDonePressed(e, i)}>
              {getUser(type, item).id === userDetail.id ? "Done" : "Assist"}
            </Button>

            {/* <Button onPress={(e) => handleClick(e, i)}>Expand</Button> */}
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},

  cardContainer: {
    marginBottom: 10,
    marginTop: 10,
    // height: 80,
    paddingTop: 5,
    // alignItems: "space",
    justifyContent: "flex-start",
    borderRadius: "20px",
    backgroundColor: "#F1F6F9",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 5,
  },
});

export default CustomTaskCard;
