import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

async function refreshToken(user) {
    try{
      let tokenRefresh = user.token;

      const res = await axios.post("http://localhost:8080/auth/refresh", tokenRefresh);
      return res.data;
    } catch (err) {
      console.log(err);
      
    }
  }

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) => {
          let currentTime = new Date();
          const decodedToken = jwtDecode(user?.token);
          if (decodedToken < currentTime.getTime()/1000){
            const data = await refreshToken(user);
            const refreshUser = {
              ...user,
              token : data.token
            }
            dispatch(stateSuccess(refreshUser));
            config.headers["token"] = "Bearer " + data.token;
          }
          return config;
        }, (err) => {
          return Promise.reject(err);
        }
      )
      return newInstance;
}