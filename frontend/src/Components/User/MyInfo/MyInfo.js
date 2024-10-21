import styles from './MyInfo.module.css'
import NavBar from '../../NavBar/NavBar';
import Post from '../../Post/PostForm'
import { Link } from 'react-router-dom';
import ModalAbout from './ModalAbout/ModalAbout';
import ModalContact from './ModalContact/ModalContact';
import ModalConfigMain from './ModalConfigMain/ModalConfigMain';

function MyInfo () {

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.user}>
                <div className={styles.information}>
                    <div className={styles.about}>
                        <h3 className={styles.text_header}>Giới Thiệu</h3>
                        <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_about">
                            <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                            Chỉnh sửa chi tiết</button>
                        <p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Đại học Kinh Doanh và Công Nghệ Hà Nội</p>
                        <p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Trung học Phổ Thông A Duy Tiên</p>
                        <p className={styles.text}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến Từ Hà Nam</p>
                        <p className={styles.text_footer}><img src='/img/clock.png' alt='phone'className={styles.icon}/> Tham gia vào tháng 3 năm 2019</p>
                    </div>
                    <div className={styles.information_child}>
                        <h3 className={styles.text_header}>Liên Hệ</h3>
                        <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_contact">
                            <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                            Chỉnh sửa chi tiết</button>  
                        <p className={styles.text}><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> 0342232931</p>
                        <p className={styles.text}><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> trinhhaison2004@gmail.com</p>
                        <p className={styles.text_footer}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Yên Sở - Hoàng Mai - Hà Nội</p>  
                    </div>
                    <div className={styles.information_child}>
                        <div className={styles.img_header}>
                            <h3 className={styles.text_header}>Bạn bè</h3>
                                <Link to="#"><p className={styles.all_friend}>Xem tất cả</p></Link>
                            </div>
                        </div>
                    <div className={styles.information_child}>
                        <div className={styles.img_header}>
                            <h3 className={styles.text_header}>Ảnh</h3>
                            <Link to="#"><p className={styles.all_img}>Xem tất cả</p></Link>
                        </div>
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
                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal_config_main">
                                <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                                Chỉnh sửa trang cá nhân</button>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.post_container}>
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>
            <ModalAbout />
            <ModalContact />
            <ModalConfigMain />
        </div>
    )
}

export default MyInfo;