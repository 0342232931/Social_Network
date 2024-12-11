import axios from "axios";
import { loginFailed, loginStart, loginSuccess, 
    logoutFailed, 
    logoutStart, 
    logoutSuccess, 
    registerFailed, registerStart, registerSuccess } from "./authSlice";
import { getAvatarFailed, getAvatarStart, getAvatarSuccess } from "./userSlice";


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

export const updateUser = async (userId, request, dispatch, axiosJwt, token) => { 
    dispatch(registerStart());
    try{
        const res = await axiosJwt.put("http://localhost:8080/users/" + userId, request);
        
        const userResponse = res.data?.result;

        const data = {
            code: 0,
            result: {
                token: token,
                userResponse: {
                    ...userResponse
                },
                authenticated: true,
            }
        }

        dispatch(loginSuccess(data));
    } catch (err){
        dispatch(loginFailed());
    }
}

export const updateUserRegister = async (userId, request, dispatch, axiosJwt, navigate, token) => { 
    dispatch(registerStart());
    try{
        const response = await axiosJwt.put("http://localhost:8080/users/" + userId, request);

        const userResponse = response.data?.result;

        const data = {
            code: 0,
            result: {
                token: token,
                userResponse: {
                    ...userResponse
                },
                authenticated: true,
            }
        }

        dispatch(loginSuccess(data));

        navigate("/")

    } catch (err){
        dispatch(loginFailed());
    }
}

export const logoutUser = async(request, dispatch , navigate) => {
    dispatch(logoutStart());
    try{
        await axios.post("http://localhost:8080/auth/logout", request);
        navigate("/login")
        dispatch(logoutSuccess());

    } catch (err) {
        console.log("msg err: " + err);
        
        dispatch(logoutFailed());
    }
}

export const getAvatarUser = async(userId, dispatch, axiosJwt) => {
    dispatch(getAvatarStart());
    try {
        const res = await axiosJwt.get('http://localhost:8080/avatar/get-by-user-id/' + userId)
        dispatch(getAvatarSuccess(res.data));
    } catch (error) {
        console.log("Error getting: " + error);
        dispatch(getAvatarFailed());
    }
}