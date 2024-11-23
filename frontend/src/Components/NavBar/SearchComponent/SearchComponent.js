import styles from './SearchComponent.module.css';
import Navbar from '../NavBar';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect, useState } from 'react';

function SearchComponent() {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('id');

    const [userResponse, setUserReponse] = useState([]);

    const searchUsers = async (axiosJwt, keyword) => {
        try {
            
            const res = await axiosJwt.get("http://localhost:8080/users/search-user/" + keyword)
            
            let users = res.data?.result;

            const updatedUsers = await Promise.all(
                users?.map(async (user) => {
                    try {
                        const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + user?.id);
                        const img = res.data?.result;
                        return {...user, avatarUrl: `data:image/${img.fileType};base64,${img?.data}`};
                    } catch (error) {
                        console.log(error);
                        return {...user, avatarUrl: null}
                    }
                })
            );  
            setUserReponse(updatedUsers);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchUsers(axiosJwt, keyword);
    },[keyword])

    const renderUsers = () => {
        
        if (userResponse.length <= 0) {
            return (
                <div className={styles.nothing_result}>---- Không tìm thấy kết quả nào ----</div>
            )
        }
        return userResponse.map((user) => {
            return (
                <Link to={`/friend-info?id=${user?.id}`} key={user?.id} className={styles.user_container}>
                    <img src={user?.avatarUrl != null ? user?.avatarUrl : `/img/user.png` } className={styles.avatar} alt='...'/>
                    <span className={styles.username}>{`${user?.firstName} ${user?.lastName}`}</span>
                    <div className={styles.decor}><p style={{fontSize: 30}}>...</p></div>
                </Link>
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