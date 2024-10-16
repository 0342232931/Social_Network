import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import styles from "./loginpage.module.css";
import { useState } from "react";
import classNames from "classnames";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className={styles.container}>
		<div className={styles.background}>
			<div className={styles.shape}></div>
			<div className={styles.shape}></div>
		</div>
		<form className={styles.form_login}>
			<h3 className={styles.h3_field}>Login Here</h3>

			<label className={styles.label_field} for="username">Username</label>
			<input className={styles.input_field} type="text" placeholder="Email or Phone" id="username" />

			<label className={styles.label_field} for="password">Password</label>
			<input className={styles.input_field} type="password" placeholder="Password" id="password" />

			<button className={styles.button_field} >Log In</button>
			<div className={styles.social}>
			<div className={styles.go} ><i className={classNames('fab' ,'fa-google')}></i>  Google</div>
			<div className={styles.fb} ><i className={classNames('fab','fa-facebook')}></i>  Facebook</div>
			</div>
		</form>
	</div>
  );
}

export default LoginPage;
