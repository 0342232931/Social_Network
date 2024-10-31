import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

async function refreshToken(token) {
    try{
      let tokenRefresh = {
        token: token
      };

      const res = await axios.post("http://localhost:8080/auth/refresh", tokenRefresh);
      return res.data;
    } catch (err) {
      console.log(err);
      
    }
  }

export const createAxios = (currentUser, dispatch, stateSuccess) => {
    const newInstance = axios.create();
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
                ...data.result,
                token: data.result.token
              }
            }
            console.log("data : " + data);
            console.log("refreshToken : Success");
            
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