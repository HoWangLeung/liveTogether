import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
 import {BASE_URL} from "@env"
// const BASE_URL="test"

function useLog() {
 
  const [data, setData] = useState([]);

  useFocusEffect( React.useCallback(() => {
    fetchLog();

    return () =>  {

    };
  }, []));

  const fetchLog = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/liveTogether/api/logs`)
      const logData = response.data
      setData(logData);
    } catch (error) {
      
    }
  };

  const saveLog = async (newLog) => {
    
  };

  return {
    data,
    getAllLogs: fetchLog,
    saveLog,
  };
}

export default useLog;