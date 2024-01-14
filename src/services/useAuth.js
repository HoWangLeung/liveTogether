import React from "react";
import { useDispatch } from "react-redux";
import Auth from "./Auth";
import { setLoginDetail } from "../redux/actions";

export default function useAuth() {
  const dispatch = useDispatch();

  const fetchUserProfileAndDispatch = () => {
    Auth.getUserProfile()
      .then((data) => {
    
        dispatch(
          setLoginDetail({
            isLoggedIn: true,
            userDetail: data,
          })
        );
        return data
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return {fetchUserProfileAndDispatch};
}
