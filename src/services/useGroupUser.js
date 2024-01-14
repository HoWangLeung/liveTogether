import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Utils from "../utils/Utils";
// const BASE_URL="test"

function useGroupUser() {
  const exitGroup = async (userId, code) => {
    try {
      let config = await Utils.getAccessTokenConfig();

      const response = await axios.post(
        `${BASE_URL}/api/userGroups/exit/${userId}/${code}`,
        {},
        config
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async (userId) => {
    
      let config = await Utils.getAccessTokenConfig();

      const response = await axios.post(
        `${BASE_URL}/api/userGroups/deleteAccount/${userId}`,
        {},
        config
      );
      return response;
    
  };

  const changeGroupAndUserInfo = async (payload) => {
    let config = await Utils.getAccessTokenConfig();

    const response = await axios.put(
      `${BASE_URL}/api/userGroups/changeGroupAndUserInfo`,
      payload,
      config
    );
    return response;
  };

  return {
    exitGroup,
    deleteAccount,
    changeGroupAndUserInfo,
  };
}

export default useGroupUser;
