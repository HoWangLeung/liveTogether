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
     
     
          <Modal
            visible={visible.isOpen}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "pink",
              padding: 20,
              height:'100%',
              alignSelf: "center",
            }}
          >
            <ScrollView>
              <Text>Example Modal. Click outside this area to dismiss.</Text>
              <Button onPress={hideModal}>OK</Button>
            </ScrollView>
          </Modal>
   
    
  );
};

export default InvitationModal;
