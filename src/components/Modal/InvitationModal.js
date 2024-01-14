import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  Button,
  Modal,
  PaperProvider,
  Portal,
  Surface,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { setInvitationModal } from "../../redux/actions";

const InvitationModal = ({ visible }) => {
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(setInvitationModal(true));
  };
  const hideModal = () => {
    dispatch(setInvitationModal(false));
  };

  return (
    <Portal>
      <Modal
        visible={visible.isOpen}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 30,
          alignItems: "center",
          // height: 120,
          // alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <ScrollView>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Button onPress={hideModal}>OK</Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default InvitationModal;
