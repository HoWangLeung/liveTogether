import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, Icon, Modal, Portal } from "react-native-paper";
import commonStyles from "../../utils/CommonStyle";
import { useDispatch } from "react-redux";
import { setPopUpModal } from "../../redux/actions";

export default function PopUpModal({ config }) {
  console.log("rednered");
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(
      setPopUpModal({
        visible: false,
        type: config.type,
        message: config.message,
        description:config.description
      })
    );
  };
  return (
    <Portal>
      <Modal
        visible={config.visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <Icon
          source={config.type === "success" ? "check-circle" : "alert-circle"}
          color={config.type === "success" ? "green" : "red"}
          size={60}
        />
        <Text style={styles.message}>{config.message}</Text>
        {config.description && (
          <Text style={styles.description}>{config.description}</Text>
        )}
        <Button style={{ marginTop: 0 }} onPress={hideModal}>
          OK
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  root: {},
  sectionTitle: commonStyles.sectionTitle,
  textSpace: commonStyles.textSpace,
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 30,
    alignItems: "center",
    // height: 120,
    // alignSelf: "center",
    borderRadius: 20,
  },
  message: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 600,
    fontSize: 20,
  },
  description:{
    marginTop:10,
    marginBottom:5,
    fontSize: 10
  }
});
