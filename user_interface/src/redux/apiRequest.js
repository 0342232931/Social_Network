import axios from "axios";
import { loginFailed, loginStart, loginSuccess, 
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

export const getAllUsers = async (token, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("http://localhost:8080//users", {
            headers: {
                token: token
            }
        });
        dispatch(getUsersSuccess(res.data));
        
    } catch (err) {
        dispatch(getUsersFalied());
    }
}