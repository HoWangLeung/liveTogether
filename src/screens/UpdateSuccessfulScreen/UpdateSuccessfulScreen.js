import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import commonStyles from "../../utils/CommonStyle";

export default function UpdateSuccessfulScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Text style={styles.title} >Success</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("SignIn", { screen: "SignIn" })}
      >
        OK
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  inputSpace: commonStyles.inputSpace,
  helperText: commonStyles.helperText,
  title:commonStyles.title
});
