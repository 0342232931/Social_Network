import { registerUser } from "../../redux/apiRequest";
import "./register.css";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Register() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password
    };
    registerUser(newUser, dispatch, navigate);
  }

  return (
    <div className="container">
      <div className="center">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="txt_field">
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
            <span></span>
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input type="password" name="cpassword" />
            <span></span>
            <label>Confirm Password</label>
          </div>
          <input name="submit" type="Submit" value="Sign Up" />
          <div className="signup_link">
            Have an Account ?
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
