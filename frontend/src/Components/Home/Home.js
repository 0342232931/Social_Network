import styles from './Home.module.css';
import Navbar from "../NavBar/NavBar";
import Post from "../Post/PostForm";
import { Link } from 'react-router-dom';

function HomePage () {

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.line}></div>
            <div className={styles.content}>
                <div className={styles.util}>
                    <div className={styles.my_info}>
                        <Link className={styles.link} to="/my_info">
                            <img className={styles.avatar_friend} src='https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062' alt='my avatar'/>
                            <h3 className={styles.friend_name}>Trinh Hai Son</h3>
                        </Link>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src='/img/add.png' alt='my avatar'/>
                        <h3 className={styles.friend_name}>Đăng Bài Viết</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/high-five.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Bạn Bè</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/partners.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Nhóm</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/clock.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Kỉ Niệm</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/bookmark.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Đã Lưu</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/video-chat.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Video</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/video.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Reels</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/payment-card-icon.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Bảng Feed</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/market.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Marketplace</h3>
                    </div>
                    <div className={styles.util_element}>
                        <img className={styles.avatar_friend} src="/img/game-controller.png" alt='my avatar'/>
                        <h3 className={styles.friend_name}>Chơi Game</h3>
                    </div>
                </div>
                <div className={styles.post_content}>
                    <Post />
                    <Post />
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
                        <div className={styles.friend_element}>
                            <img className={styles.avatar_friend} src='https://th.bing.com/th/id/OIP.2G92TvAtxNvFnKoDztsc8AHaKM?pid=ImgDet&w=184&h=253&c=7&dpr=1.3' alt='avatar friend'/>
                            <span className={styles.friend_name}><b>Trinh Hai Son</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;