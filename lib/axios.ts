
// import { getUserClient } from "@/actions/auth.actions";
// import { auth } from "@/auth";
// import { auth } from "@/auth";
// import { getUserClient, handleSignout } from "@/actions/auth.actions";
import axios from "axios";
// import { getSession } from "next-auth/react";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL 
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token: string = '';
    // if(localStorage.getItem("token")){
    //   access_token = localStorage.getItem("token")
    // }
    const isServer = typeof window === 'undefined'
    if (isServer) {
      // const userObj = await getUserClient();
      // if(userObj?.success){
      //   const token = userObj?.data?.token
      //   if (token) {
      //     access_token = token || ''
      //   }
      // }
    } else {
      // const userObj = await getUserClient();
      // if(userObj?.success){
      //   const token = userObj?.data?.token
      //   if (token) {
      //     access_token = token || ''
      //   }
      // }
    }
    if (access_token) {
      if (!config.headers["authorization"]) {
        config.headers.authorization = `Bearer ${access_token}`;
      } else {
        config.headers.authorization = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    console.log("Axios Response Error : ",error?.response?.status)
    // if(error?.response?.status === 401){
    //   await handleSignout()
    //   // Redirect to login page
    //   window.location.href = "/";
    // }
    // console.log('axios error:', error);
    console.log("Axios Response Data : ", error?.response?.data)
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;