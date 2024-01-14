import { StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

const commonStyles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },

  inputSpace: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  sectionTitle: {
    marginRight: "auto",
    fontWeight: 600,
    fontSize: 20,
    marginTop: 10,
  },
  titleLarge: {
    fontWeight: 600,
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  screenBackgroundColor: {
    backgroundColor: "white",
  },
  helperText: { marginTop: -10, marginRight: "auto" },
  textSpace: {
    marginTop: 5,
    marginBottom: 5,
  },
  paragraph:{
    lineHeight: 24,
    
  }
});

export default commonStyles;
