import axios from "axios";
import { loginFailed, loginStart, loginSuccess, 
    logoutFailed, 
    logoutStart, 
    logoutSuccess, 
    registerFailed, registerStart, registerSuccess } from "./authSlice";


export const loginUser = async(user, dispatch, navigate) => {  // test login api successfully
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:8080/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err){
        console.log("err" + err);
        
        dispatch(loginFailed());
    }
} 
 
export const registerUser = async (user, dispatch, navigate) => {  //test register api successfully
    dispatch(registerStart());
    try{
        await axios.post("http://localhost:8080/users", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (err){
        dispatch(registerFailed());
    }
}

export const logoutUser = async(request, dispatch , navigate) => {
    dispatch(logoutStart());
    try{
        await axios.post("http://localhost:8080/auth/logout", request);
        dispatch(logoutSuccess());
        navigate("/login")
    } catch (err) {
        console.log("msg err: " + err);
        
        dispatch(logoutFailed());
    }
}