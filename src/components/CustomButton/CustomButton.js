import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const CustomButton = ({ text, onPress, style }) => {
  return (
    <Button style={style}
     onPress={onPress}>
      {text}
    </Button>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B71F3",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "blue",
  },
  container_SECONDARY: {
    borderColor: "#3871F3",
    borderWidth: 2,
  },
  container_TERTIARY: {
    backgroundColor: "",
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY: {
    color: "red",
  },
  text_TERTIARY: {
    color: "gray",
  },
});
export default CustomButton;
