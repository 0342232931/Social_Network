import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";

function NavBar(){ 

  const user = useSelector((state) => state.auth.login.currentUser?.result.userResponse)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar_container}>
        <section className={styles.serch_form}>
          <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
        </section>
        <section className={styles.tag}>
          <Link to="/" className={styles.element_children} >Home</Link>
          <Link to="#" className={styles.element_children}><i className="fab fa-facebook-messenger"></i></Link>
          <Link to="#" className={styles.element_children}><i className="fas fa-bell"></i></Link>
          <Link to="/my_info" className={styles.element_children}>My Info</Link>
        </section>
    </nav>
  )
};

export default NavBar;
