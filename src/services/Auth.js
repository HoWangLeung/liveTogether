import { StyleSheet, Text, View } from "react-native";
import React from "react";

import axios from "axios";
import { BASE_URL } from "@env";
// const BASE_URL="test"

const Auth = {
  login: async (username, password) => {
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
  getUserProfile: async (token) => {
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
      `${BASE_URL}/api/auth/liveTogether/signup?exchangeName=&routingKey=`,
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
      `${BASE_URL}/api/auth/liveTogether/confirmResetPassword/${payload.email}`,{
        email:payload.email,
        oldPassword:payload.oldPassword,
        newPassword:payload.newPassword1
      }
    );
    if (res.data) {
      return res.data;
    }
  },
};

export default Auth;
