import { View, Text } from "react-native";
import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setPopUpDialog } from "../../redux/actions";

export default function PopUpDialog({ config }) {
  const dispatch = useDispatch();
  const { visible, message, type, onDonePressed } = config;
  const hideDialog = () => {
    dispatch(
      setPopUpDialog({
        visible: false,
        type: config.type,
        message: config.message,
        onDonePressed: config.onDonePressed,
      })
    );
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={onDonePressed}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
