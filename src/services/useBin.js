import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const BASE_URL="test"

function useBin() {
  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [])
  );

  const editBin = async (payload) => {
    try {
      let token = await AsyncStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios
        .put(`${BASE_URL}/liveTogether/api/bins/${payload.id}`, payload, config)
        .then((res) => {
          return res.data;
        })
        .catch((e) => {});
    } catch (error) {}
  };

  const fetchBins = async (payload) => {
    if (!payload.groupId) {
      return;
    }
    try {
      let token = await AsyncStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return (
        axios
          .get(`${BASE_URL}/liveTogether/api/bins/${payload.groupId}`)
          // .then(res=> res.json())
          .then((result) => {
            return result.data;
          })
          .catch((e) => {})
      );
    } catch (error) {}
  };

  const updateBinRemoval = async (binId, payload) => {
    try {
      let token = await AsyncStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return (
        axios
          .put(`${BASE_URL}/liveTogether/api/bins/${binId}`, payload,config)
          // .then(res=> res.json())
          .then((result) => {
            return result.data;
          })
          .catch((e) => {
            console.log(e);
          })
      );
    } catch (error) {}
  };

  const saveLog = async (newLog) => {};

  return {
    editBin,
    fetchBins,
    updateBinRemoval,
  };
}

export default useBin;
