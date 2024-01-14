import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setPopUpModal } from "../redux/actions";



const Utils = {
  formatDate: (date, format) => {
    const parsedDate = moment(date, 'YYYY-MM-DDTHH:mm:ss');
    if(format){
      return parsedDate.format(format);
    }
    const formattedDate = parsedDate.format('DD-MM-YYYY HH:mm');
    return formattedDate;
  },
  getAccessTokenConfig: async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return config;
  },
  removeError: (field, errors, setErrors) => {
    if (errors[field]) {
      setErrors({});
    }
  },
  setErrorMessage: (field, message, setErrors) => {
    setErrors((s) => ({
      ...s,
      [field]: message,
    }));
  },
  isObjEmpty:(obj)=>{
    let isEmpty = Object.keys(obj).length==0;
    return isEmpty
  },
  showPopUp:(dispatch,type,visible, message,description)=>{
 
    dispatch(
      setPopUpModal({
        visible: visible,
        message: message,
        type: type,
        description:description,
      })
    );
  }

 
};

export default Utils;
