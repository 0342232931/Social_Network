import styles from './SearchComponent.module.css';
import Navbar from '../NavBar';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect, useState } from 'react';

function SearchComponent() {

    const data = useSelector((state) => state.auth.login?.currentUser?.result.userRepsonse);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const location = useLocation();
    const keyword = location.state?.keyword;

    const [userData, setUserData] = useState([]);

    const users = ['Pele', 'Ronaldinho', 'Ronaldo Delima', 'Leonel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Mohamed Salah', 'Mesult Ozil', 'Kyle Warker', 'Vicicius jr'];

    const searchUsers = async (axiosJwt, keyword) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/search-user/" + keyword)
            if (res != null) {
                console.log("get search user success");
                setUserData(res.data?.result);
            } else {
                console.log(" res null");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        searchUsers(axiosJwt, keyword);
    },[])

    const renderUsers = () => {

        if (userData.length <= 0) {
            return (
                <div className={styles.nothing_result}>---- Không tìm thấy kết quả nào ----</div>
            )
        }
        return userData.map((user) => {
            return (
                <div key={user} className={styles.user_container}>
                    <img src='/img/user.png' className={styles.avatar} alt='...'/>
                    <span className={styles.username}>{user}</span>
                    <div className={styles.decor}><p style={{fontSize: 30}}>...</p></div>
                </div>
            )
        })
    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.util_container}>
                    <div className={styles.header_container}>
                        <span className={styles.header_title}>Kết quả tìm kiếm</span>
                    </div>
                    <span className={styles.title_child}>Bộ lọc</span>
                    <div className={styles.element_container}>
                        <img src='/img/friend/friend.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Mọi người</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/payment-card-icon.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Bài viết</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/post/gallery.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Ảnh</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/video.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Video</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/market.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Marketplace</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/facebook-page.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Trang</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/myinfo/location.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Địa điểm</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/partners.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Nhóm</span>
                    </div>
                    <div className={styles.element_container}>
                        <img src='/img/bookmark.png' alt='...' className={styles.icon}/>
                        <span className={styles.title}>Sự kiện</span>
                    </div>
                </div>
                <div className={styles.content_container}>
                    <div className={styles.content_container_child}>
                        {renderUsers()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent;