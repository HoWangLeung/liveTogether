import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from 'moment';
 
import axios from "axios";
 

const Utils = {
  
  formatDate: (date, format) => {
    const parsedDate = moment(date, "YYYY-MM-DDTHH:mm:ss");
    let formattedDate;

    if (format) {
      formattedDate = parsedDate.format(format);
    } else {
      formattedDate = parsedDate.format("DD-MMM-YYYY");
    }

    return formattedDate;
  },
  
};

export default Utils;
