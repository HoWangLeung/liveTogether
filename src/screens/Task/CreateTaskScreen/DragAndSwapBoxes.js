import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MARGIN, getOrder, getPosition } from "./utils";

const DragAndSwapBoxes = ({ children, positions, id, setRes }) => {
  const [text, setText] = useState("sdf");
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPostions = getPosition(newOrder);
      translateX.value = withTiming(newPostions.x);
      translateY.value = withTiming(newPostions.y);
    }
  );

  const handleEnd = (value) => {
    
    runOnJS(setRes)(value);
  };

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder
        );
        if (idToSwap) {
          const newPostions = JSON.parse(JSON.stringify(positions.value));
          newPostions[id] = newOrder;
          newPostions[idToSwap] = oldOrder;
          positions.value = newPostions;
        }
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x);
      translateY.value = withTiming(destination.y);
      
    },
    onFinish: () => {
      isGestureActive.value = false;
      runOnJS(handleEnd)(positions._value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: "absolute",
      // backgroundColor: "orange",
      margin: 0,
      zIndex,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale },
      ],
      width: 100,
      height: 100,
    };
  });
  return (
    <View style={styles.container}>
      <GestureHandlerRootView >
        <Animated.View style={animatedStyle}>
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View>{children}</Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    
  },
  circle: {
    height: 70,
    width: 70,
    backgroundColor: "#b58df1",
    borderRadius: 500,
    cursor: "grab",
  },
});
export default DragAndSwapBoxes;
