import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator,MD2Colors } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoadingScreen() {
  const insets = useSafeAreaInsets();
  return (

      <ActivityIndicator size="large" animating={true} color={MD2Colors.red800} />

  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  container: {
    height: "100%",
  },
});
