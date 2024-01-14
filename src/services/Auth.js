import { StyleSheet, Text, View } from "react-native";
import React from "react";

import axios from "axios";
import { BASE_URL } from "@env";
import Utils from "../utils/Utils";
import { useDispatch } from "react-redux";
import { setLoginDetail } from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const BASE_URL="test"

const Auth = {
  login: async (username, password) => {
    const token = await AsyncStorage.getItem("accessToken");
    
    try {
      let url = `${BASE_URL}/api/auth/liveTogether/signin`;

      const res = await axios.post(url, {
        email: username,
        password: password,
      });

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      // Handle network or other errors

      throw error;
    }
  },

  getUserProfile: async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${BASE_URL}/api/user/profile`, config);

      if (res.data) {
      

        return res.data;
      }
    } catch (error) {
      // Handle network or other errors

      throw error;
    }
  },
  signUp: async (payload) => {
    const res = await axios.post(
      `${BASE_URL}/api/auth/liveTogether/signup?exchangeName=topic-exchange&routingKey=queue.registration`,
      payload
    );
    if (res.data) {
      return res.data;
    }
  },
  requestResetPassword: async (payload) => {
    const res = await axios.post(
      `${BASE_URL}/api/auth/liveTogether/resetPassword/${payload.email}`
    );
    if (res.data) {
      return res.data;
    }
  },
  verifyResetPasswordCode: async (payload) => {
    const res = await axios.post(
      `${BASE_URL}/api/auth/liveTogether/verifyResetPasswordCode/${payload.email}/${payload.code}`
    );
    if (res.data) {
      return res.data;
    }
  },
  confirmResetPassword: async (payload) => {
    const res = await axios.post(
      `${BASE_URL}/api/auth/liveTogether/confirmResetPassword/${payload.email}`,
      {
        email: payload.email,
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword1,
      }
    );
    if (res.data) {
      return res.data;
    }
  },
  verifyRegistration: async (token) => {
    const res = await axios.post(
      `${BASE_URL}/api/auth/liveTogether/confirmRegistration?token=${token}`
    );
    if (res.data) {
      return res.data;
    }
  },
  updatePassword: async (payload) => {
    const config = await Utils.getAccessTokenConfig();
    const res = await axios.put(
      `${BASE_URL}/api/auth/liveTogether/updatePassword`,
      payload,
      config
    );
    if (res.data) {
      return res.data;
    }
  },
  resendRegistrationVerification: async(email)=>{
    const res = await axios.post(
      `${BASE_URL}/api/auth/liveTogether/resendRegistration?email=${email}&exchangeName=topic-exchange&routingKey=queue.registrationResend`
    );
    if (res.data) {
      return res.data;
    }
  }
};

export default Auth;
