import styles from './MyInfo.module.css'
import NavBar from '../../NavBar/NavBar';
import Post from '../../Post/PostForm'

function MyInfo () {
    console.log(styles);
    
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.user}>
                <div className={styles.information}>
                    <div className={styles.about}>
                        <h3 className={styles.text_header}>Giới Thiệu</h3>
                        <p className={styles.text}>🏫 Trường Đại học Kinh Doanh và Công Nghệ Hà Nội</p>
                        <p className={styles.text}>🏫 Trường Trung học Phổ Thông A Duy Tiên</p>
                        <p className={styles.text}>🗺️ Đến Từ Hà Nam</p>
                        <p className={styles.text_footer}>⏲️ Tham gia vào tháng 3 năm 2019</p>
                    </div>
                    <div className={styles.contact}>
                        <h3 className={styles.text}>Liên Hệ</h3>
                    </div>
                    <div className={styles.friends}>
                        <h3 className={styles.text}>Bạn Bè</h3>
                    </div>
                    <div className={styles.my_image}>
                        <h3 className={styles.text}>Ảnh</h3>
                    </div>
                </div>
                <div className={styles.line_col}></div>
                <div className={styles.me_container}>
                    <div className={styles.me}>
                        <div className={styles.avatar_container}>
                            <img className={styles.avatar} src='https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062' alt='my avatar' />
                        </div>
                        <div className={styles.name_container}>
                            <h2 className={styles.text}>Trịnh Hải Sơn</h2>
                            <span className={styles.text}>727 người bạn</span>
                        </div>
                        <div className={styles.button_config}>
                            <button type="button" className="btn btn-secondary">Chỉnh sửa trang cá nhân</button>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.post_container}>
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyInfo;