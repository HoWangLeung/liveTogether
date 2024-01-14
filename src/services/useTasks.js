import React from "react";
import { useDispatch } from "react-redux";
import Auth from "./Auth";
import { setLoginDetail, setTasks } from "../redux/actions";
import Utils from "../utils/Utils";
import axios from "axios";
import { BASE_URL } from "@env";

export default function useTasks() {
  const dispatch = useDispatch();
  const basePath = "/liveTogether/api/task";
  const fetchTasksAndDispatch = async (groupId) => {
    let config = await Utils.getAccessTokenConfig();

    const response = await axios.get(
      `${BASE_URL}/liveTogether/api/task/${groupId}`,

      config
    );
    dispatch(setTasks(response.data));
    return response;
  };

  const fetchBinTasksAndDispatch = async (groupId) => {
    let config = await Utils.getAccessTokenConfig();

    const response = await axios.get(
      `${BASE_URL}/liveTogether/api/task/bins/${groupId}`,

      config
    );
   // dispatch(setTasks(response.data));
    return response;
  };
  const completeTask = async (taskId, userId) => {
    let config = await Utils.getAccessTokenConfig();
    const response = await axios.post(
      `${BASE_URL}${basePath}/${taskId}/complete?completedBy=${userId}`,{},
      config
    );
    return response;
  };
  const createTask = async (payload) => {
    let config = await Utils.getAccessTokenConfig();
    const response = await axios.post(
      `${BASE_URL}${basePath}/create`,
      payload.task,
      config
    );
    return response;
  };

  const editTask = async (payload) => {
    let config = await Utils.getAccessTokenConfig();
    const response = await axios.put(
      `${BASE_URL}${basePath}/${payload.task.id}`,
      payload.task,
      config
    );
    return response;
  };

  const deleteTask = async (payload) => {
    let config = await Utils.getAccessTokenConfig();
    const response = await axios.delete(
      `${BASE_URL}${basePath}/create`,
      payload,
      config
    );
    return response;
  };

  return { fetchTasksAndDispatch,fetchBinTasksAndDispatch,completeTask,createTask,editTask, deleteTask};
}
