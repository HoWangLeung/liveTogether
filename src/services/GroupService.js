import { View, Text } from "react-native";
import React from "react";
import { BASE_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GroupService = {
  addNewGroup: async (payload) => {
    let token = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let url = `${BASE_URL}/api/groups`;
    
    try {
      let res = await axios.post(url, payload, config);
      
      return res;
    } catch (error) {
      
    }
    
    return null;
  },
  addUserToGroup: async (userId, groupId) => {
    let token = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let url = `${BASE_URL}/api/userGroups/join/${userId}/${groupId}`;
    
    try {
      return axios.post(url, {}, config);
    } catch (error) {
      
    }
  },
  joinGroupByCode: ()=>{

  }
};

export default GroupService;
