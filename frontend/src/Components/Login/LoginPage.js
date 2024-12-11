import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import styles from "./loginpage.module.css";
import { useEffect, useState } from "react";
import { logoutSuccess } from "../../redux/authSlice";

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector(state => state?.auth?.login?.currentUser?.result.token);

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

  useEffect(() => {
	if (token != null) {
		
		const request = {
			token : token,
		}

		logoutUser(request, dispatch, navigate);

	}
  }, [])

  return (
    <div className={styles.container}>
		<div className={styles.background}>
			<div className={styles.shape}></div>
			<div className={styles.shape}></div>
		</div>
		<form className={styles.form_login} onSubmit={handleLogin}>
			<img src="/img/logo.png" alt="..." className={styles.logo} />
			<label className={styles.label_field} htmlFor="username">Tài khoản</label>
			<input className={styles.input_field} type="text" placeholder="Tài khoản" id="username" onChange={(e) => setUsername(e.target.value)}/>
			<label className={styles.label_field} htmlFor="password">Mật khẩu</label>
			<input className={styles.input_field} type="password" placeholder="Mật khẩu" id="password"  onChange={(e) => setPassword(e.target.value)}/>
			<button className={styles.button_field} type="submit">Đăng Nhập</button>
			<Link to="/register" className={styles.navigate_register}>Bạn chưa có tài khoản?</Link>
			<div className={styles.social}>
				<div className={styles.go} ><img src="/img/login/chrome.png" alt="..." className={styles.icon} />  Google</div>
				<div className={styles.fb} ><img src="/img/login/facebook.png" alt="..." className={styles.icon} />  Facebook</div>
			</div>
		</form>
	</div>
  );
}

export default LoginPage;
