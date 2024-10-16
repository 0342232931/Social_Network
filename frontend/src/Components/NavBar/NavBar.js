import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";


function NavBar(){

  const user = useSelector((state) => state.auth.login.currentUser?.result.userResponse)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.tag_link}>
        <Link to="/" className={styles.navbar_home} >Home</Link>
        <Link to="#" className={styles.navbar_chat}><i className="fab fa-facebook-messenger"></i></Link>
        <Link to="#" className={styles.navbar_notification}><i class="fas fa-bell"></i></Link>
        <Link to="#" className={styles.navbar_info}>My Info</Link>
      </div>
    </nav>
  )
};

export default NavBar;
