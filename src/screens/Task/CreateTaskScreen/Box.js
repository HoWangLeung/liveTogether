import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MARGIN, SIZE } from "./utils";
import { Avatar } from "react-native-paper";

const Box = ({ text,avatarColor }) => {
  const backgroundColor = "white";
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Avatar.Text
        style={{
          backgroundColor:  avatarColor ?  avatarColor : "#F44336",
        }}
        size={65}
        label={text}
      />
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    width: SIZE - MARGIN ,
    height: SIZE - MARGIN,
    margin: MARGIN,
    borderRadius: 50,
    // backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#cde9e4",
  },
});
