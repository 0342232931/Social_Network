import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";

function NavBar(){ 

  const user = useSelector((state) => state.auth.login.currentUser?.result.userResponse)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar_container}>
        <section className={`d-flex ${styles.serch_form}`}>
          <div className={styles.logo_container}>
            <Link to="/">
              <img src="/img/logo.png" alt="logo" className={styles.logo} />
            </Link>
          </div>
          <div>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </div>
        </section>       
        <section className={styles.tag}>
          <Link to="/" className={styles.element_children} >
            <img className={styles.icon} src="/img/house.png" alt="home"/>
          </Link>
          <Link to="#" className={styles.element_children}>
            <img className={styles.icon} src="/img/notification.png" alt="message"/>
          </Link>
          <Link to="#" className={styles.element_children}>
            <img className={styles.icon} src="/img/notification-bell.png"alt="bell"/>
          </Link>
          <Link to="/my-info" className={styles.element_children}>
            <img className={styles.avatar} alt="info" src="https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062"/>
          </Link>
        </section>
    </nav>
  )
};

export default NavBar;