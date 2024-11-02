import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";
import { logoutUser } from '../../redux/apiRequest'
import { useEffect, useState } from "react";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";

function NavBar(){ 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.auth.login?.currentUser);
  const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
  let axiosJwt = createAxios(data, dispatch, loginSuccess);

  const [url, setUrl] = useState("/img/user.png")

  const getAvatarUser = async (userId, axiosJwt) => {
    try {
      const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);
      
      const img = res.data?.result.data;

      setUrl(`data:image/png;base64,${img}`)
  } catch (error) {
      console.log("error: " + error);
      
  }
}

  useEffect(() => {
      if(!data) {
        navigate('/login')
      } else {
        getAvatarUser(user?.id, axiosJwt)
      }
  }, [])

  const token = useSelector((state) => state.auth.login?.currentUser?.result.token)

  const request = {
    token: token
  }

  const handleLogout = () => {
    logoutUser(request, dispatch, navigate)
  }
  
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
          <div className={`dropdown ${styles.element_children}`}>
            <div data-bs-toggle="dropdown" aria-expanded="false">
              <img className={`dropdown-item ${styles.avatar}`} alt="info" src={url}/>
            </div>
            <ul className={`dropdown-menu ${styles.util_container}`}>
              <li>
                <Link to='/my-info' className={`d-flex dropdown-item ${styles.info_container}`}>
                  <img className={`${styles.avatar_info}`} alt="info" src={url}/>
                  <h4 className={styles.view_info}>Xem trang cá nhân</h4>
                </Link>
              </li>
              <hr />
              <li className={`dropdown-item ${styles.margin_top}`}>
                <div className={`d-flex`}> 
                  <img className={`${styles.icon_info}`} alt="info" src="/img/navbar/settings.png"/>
                  <h4 className={`${styles.logout_txt}`}>Cài đặt</h4>
                </div>
              </li>
              <li className={`dropdown-item ${styles.margin_top}`}>
                <div className={`d-flex`}> 
                  <img className={`${styles.icon_info}`} alt="info" src="/img/navbar/help.png"/>
                  <h4 className={`${styles.logout_txt}`}>Trợ giúp</h4>
                </div>
              </li>
              <li className={`dropdown-item ${styles.margin_top}`}>
                <div className={`d-flex`}> 
                  <img className={`${styles.icon_info}`} alt="info" src="/img/navbar/public-opinion.png"/>
                  <h4 className={`${styles.logout_txt}`}>Phản hồi</h4>
                </div>
              </li>
              <li className={`dropdown-item ${styles.margin_top}`} onClick={handleLogout}>
                <div className={`d-flex`}> 
                  <img className={`${styles.icon_info}`} alt="info" src="/img/navbar/logout.png"/>
                  <h4 className={`${styles.logout_txt}`}>Đăng xuất</h4>
                </div>
              </li>
            </ul>
          </div>
        </section>
    </nav>
  )
};

export default NavBar;