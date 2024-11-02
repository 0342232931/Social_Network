import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

async function refreshToken(token) {
      let refreshRequest = {
        token: token
      };
      
      const res = await axios.post("http://localhost:8080/auth/refresh", refreshRequest);      
      return res.data;
  }

export const createAxios = (currentUser, dispatch, stateSuccess) => {
    let newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) => {
          let currentTime = new Date();
          const decodedToken = jwtDecode(currentUser?.result.token);
          config.headers.Authorization = `Bearer ${currentUser.result.token}`;
          if (decodedToken.exp < currentTime.getTime()/1000){
            const data = await refreshToken(currentUser.result.token);
            const refreshUser = {
              ...data,
              result: {
                token: data.result.token,
                ...data.result,
                
              }
            }            
            dispatch(stateSuccess(refreshUser));
            config.headers.Authorization = `Bearer ${data.result.token}`;
          }
          return config;
        }, (err) => {
          return Promise.reject(err);
        }
      )
      return newInstance;
}