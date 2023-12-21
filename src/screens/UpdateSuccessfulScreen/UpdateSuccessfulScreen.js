import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function UpdateSuccessfulScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Success</Text>
      <Button
        labelStyle={{ fontSize: 16 }}
        style={{ marginRight: "auto" }}
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      >
        OK
      </Button>
    </View>
  );
}
