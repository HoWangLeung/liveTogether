import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export function SignUpSuccessScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Sign Up Success</Text>
      <Button onPress={() => navigation.navigate("SignIn")}>Login Now</Button>
    </View>
  );
}
