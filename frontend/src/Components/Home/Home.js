import styles from './Home.module.css';
import Navbar from "../NavBar/NavBar";
import Post from "../Post/PostForm";
import { Link, useNavigate } from 'react-router-dom';
import ModalPost from './ModalPost/ModalPost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function HomePage () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.auth.login.currentUser);
    
    const user = data.result.userResponse;

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.line}></div>
            <div className={styles.content}>
                <div className={styles.util}>
                    <div className={styles.my_info}>
                        <Link className={styles.link} to="/my-info">
                            <img className={styles.avatar_friend} src='https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062' alt='my avatar'/>
                            <h3 className={styles.friend_name}>{user.username}</h3>
                        </Link>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.util_element}>
                        <button type='button' className={styles.btn_modal} data-bs-toggle="modal" data-bs-target="#modal_post">
                            <img className={styles.avatar_friend} src='/img/add.png' alt='my avatar'/>
                            <h3 className={styles.friend_name}>Đăng Bài Viết</h3>
                        </button>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="/friend-page" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/high-five.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Bạn Bè</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/partners.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Nhóm</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/clock.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Kỉ Niệm</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/bookmark.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Đã Lưu</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/video-chat.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Video</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/video.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Reels</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/payment-card-icon.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Bảng Feed</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/market.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Marketplace</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/game-controller.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Chơi Game</h3>
                        </Link>
                    </div>
                </div>
                <div className={styles.post_content}>
                    <Post atr='5'/>
                    <Post atr='9'/>
                </div>
                <div className={styles.list_friend}>
                    <div className={styles.ads}>
                        <h3 className={styles.ads_header}>Được Tài Trợ</h3>
                        <div className={styles.ads_element}>
                            <img className={styles.img_ads} src='https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062' alt='Pepsi'/>
                            <p className={styles.title}>Đã quá pepsi ơi!!</p>
                        </div>
                        <div className={styles.ads_element}>
                            <img className={styles.img_ads} src="https://th.bing.com/th/id/OIP.2G92TvAtxNvFnKoDztsc8AHaKM?pid=ImgDet&w=184&h=253&c=7&dpr=1.3" alt="MC Donald's"/>
                            <span className={styles.title}>McDonald'👉 Fast Beaty</span>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.friends}>
                        <h3 className={styles.friends_header}>Nguời Liên Hệ</h3>
                        <Link to='/friend-info' className={styles.textdecoration_none}>
                            <div className={styles.friend_element}>
                                <img className={styles.avatar_friend} src='https://th.bing.com/th/id/OIP.2G92TvAtxNvFnKoDztsc8AHaKM?pid=ImgDet&w=184&h=253&c=7&dpr=1.3' alt='avatar friend'/>
                                <span className={styles.friend_name}><b>Trinh Hai Son</b></span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <ModalPost />
        </div>
    )
}

export default HomePage;