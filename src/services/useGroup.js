import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const BASE_URL="test"

function useGroup(userId) {
  const dispatch = useDispatch();
  const [groupInfo, setGroupInfo] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      fetchGroup();
      return () => {};
    }, [])
  );

  const fetchGroup = async () => {
    
    try {
      let token = await AsyncStorage.getItem("accessToken");
      if(!token){
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/userGroups?userId=${userId}`,config
      );
      const groupData = response.data;
      setGroupInfo(groupData);
    } catch (error) {
      
    }
  };

  return {
    groupInfo,
  };
}

export default useGroup;
