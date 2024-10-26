import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import styles from "./loginpage.module.css";
import { useState } from "react";

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
		<form className={styles.form_login} onSubmit={handleLogin}>
			<img src="/img/logo.png" alt="..." className={styles.logo} />

			<label className={styles.label_field} htmlFor="username">Username</label>
			<input className={styles.input_field} type="text" placeholder="Email or Phone" id="username" onChange={(e) => setUsername(e.target.value)}/>

			<label className={styles.label_field} htmlFor="password">Password</label>
			<input className={styles.input_field} type="password" placeholder="Password" id="password"  onChange={(e) => setPassword(e.target.value)}/>

			<button className={styles.button_field} type="submit">Đăng Nhập</button>
			<div className={styles.social}>
			<div className={styles.go} ><img src="/img/login/chrome.png" alt="..." className={styles.icon} />  Google</div>
			<div className={styles.fb} ><img src="/img/login/facebook.png" alt="..." className={styles.icon} />  Facebook</div>
			</div>
		</form>
	</div>
  );
}

export default LoginPage;
