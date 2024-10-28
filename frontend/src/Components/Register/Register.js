import { registerUser } from "../../redux/apiRequest";
import styles from "./register.module.css";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

function Register() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

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
    <div className={styles.container}>
      <div className={styles.center}>
        <h1 className={styles.h1_field}><b>Register</b></h1>
        <form onSubmit={handleRegister} className={styles.form_register}>
          <div className={styles.txt_field}>
            <input className={styles.input_field} type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
            <span></span>
            <label className={styles.label_field}>Username</label>
          </div>
          <div className={styles.txt_field}>
            <input className={styles.input_field} type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <span></span>
            <label className={styles.label_field}>Email</label>
          </div>
          <div className={styles.txt_field}>
            <input className={styles.input_field} type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
            <span></span>
            <label className={styles.label_field}>Password</label>
          </div>
          <div className={styles.txt_field}>
            <input className={styles.input_field} type="password" name="cpassword" onChange={(e) => setCfPassword(e.target.value)}/>
            <span></span>
            <label className={styles.label_field}>Confirm Password</label>
          </div>
          <button name="submit" type="Submit" className={styles.submit_register}>Sign Up</button>
          <div className={styles.signup_link}>
            <Link to={"/login"}>Have an Account ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
