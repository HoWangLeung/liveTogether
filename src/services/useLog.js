import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import { useLogin } from "./LoginProvider";
import { useSelector } from "react-redux";
// const BASE_URL="test"

function useLog() {
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (userDetail.group) {
        setLoading(true);
        fetchLog(userDetail.group.id).then(()=>{
           setLoading(false)
        })
      }

      return () => {};
    }, [])
  );

  const fetchLog = async (groupId) => {
    const response = await axios.get(
      `${BASE_URL}/liveTogether/api/logs/${groupId}`
    );
    const logData = response.data;
    setData(logData);
    return logData;
  };

  const saveLog = async (newLog) => {};

  return {
    data,
    getAllLogs: fetchLog,
    saveLog,
    loading,
    setLoading,
  };
}

export default useLog;
