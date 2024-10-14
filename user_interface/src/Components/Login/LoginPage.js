import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import "./loginpage.css"
import { useState } from "react";

function LoginPage(){

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password
        }
        loginUser(newUser, dispatch, navigate)
    }

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleLogin}>
                <h3>Login Here</h3>
        
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" onChange={e => setUsername(e.target.value)} />
        
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)} />
        
                <button type="submit">Log In</button>
                <div className="social">
                <div className="go"><i className="fab fa-google"></i>  Google</div>
                <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form>
      </div>
    );
}

export default LoginPage;