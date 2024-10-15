import axios from "axios";
import { loginFailed, loginStart, loginSuccess, 
    logoutFailed, 
    logoutStart, 
    logoutSuccess, 
    registerFailed, registerStart, registerSuccess } from "./authSlice";
import { getUsersFalied, getUsersStart, getUsersSuccess } from "./userSlice";


export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:8080/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err){
        dispatch(loginFailed());
    }
} 
 
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try{
        await axios.post("http://localhost:8080/users", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (err){
        dispatch(registerFailed());
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("http://localhost:8080/users", {
            headers: {
                token : accessToken
            }
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFalied());
    }
}

export const logoutUsers = async(request, dispatch , navigate, axiosJWT) => {
    dispatch(logoutStart());
    let strRequest = request.toString();
    try{
        await axiosJWT.post("http://localhost:8080/auth/logout", strRequest);
        dispatch(logoutSuccess());
        navigate("/login")
    } catch (err) {
        console.log("msg err: " + err);
        
        dispatch(logoutFailed());
    }
}