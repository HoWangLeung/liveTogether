import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import HomeScreen from "../HomeScreen/HomeScreen";
import commonStyles from "../../utils/CommonStyle";
import { useState } from "react";
import useBin from "../../services/useBin";

export default function EditWasteDisposalScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const bin = route.params.bin;
  const [newDisplayName, setNewDisplayName] = useState(
    bin ? bin.displayName : ""
  );
  const binService = useBin();
  const onConfirmPressed = () => {
    let payload = {
      displayName: newDisplayName,
    };

    binService
      .updateBinRemoval(bin.id, payload)
      .then(() => {
        navigation.navigate("Main", { screen: "Home" });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  return (
    <View style={styles.root}>
      <Button
        labelStyle={{ fontSize: 16 }}
        style={{ marginRight: "auto" }}
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      >
        Back
      </Button>

      <Text style={styles.sectionTitle}>General</Text>
      <TextInput
        required
        style={[styles.inputSpace]}
        label="Display Name"
        value={newDisplayName}
        onChangeText={(newDisplayName) => setNewDisplayName(newDisplayName)}
      />
      <Button onPress={onConfirmPressed} mode="contained">
        Confirm
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
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
});
