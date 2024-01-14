import { View, Text, StyleSheet } from "react-native";
import React from "react";
import commonStyles from "../../utils/CommonStyle";
import { HelperText, TextInput } from "react-native-paper";

export function CustomInput({
  handleChange,
  hasError,
  value,
  visible,
  errors,
  label,
  helperText,
  name
}) {

  return (
    <>
      <TextInput
        style={styles.inputSpace}
        label={label}
        value={String(value)}
        mode="outlined"
        name={name}
        onChangeText={(text)=>handleChange(name.toLowerCase(),text)}
      />
      <HelperText style={styles.helperText} type="error" visible={visible}>
        {helperText}
      </HelperText>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
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
  helperText: commonStyles.helperText,
});
