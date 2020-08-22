import React from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface Props {
  setUser: React.Dispatch<
    React.SetStateAction<{
      // id: string;
      // username: string;
      // email: string;
      // password: string;
    }>
  >;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckAuthStatus = ({ setUser, setIsAuth }: Props) => {
  axios({
    method: "GET",
    url: "/auth/me",
  }).then((res) => {
    if (AsyncStorage.getItem("jwt")) {
      const decoded = jwt_decode(AsyncStorage.getItem("jwt"));
      setUser(decoded);
      setIsAuth(true);
    }
  });
};