import styles from './FriendInfo.module.css'
import NavBar from '../../NavBar/NavBar';
import Post from '../../Post/PostForm';
import { Link } from 'react-router-dom';
import AllFriend from '../MyInfo/AllFriend/AllFriend';
import Image from "../MyInfo/Image/Image";
import InfomationFriend from './InfomationFriend/InfomationFriend';

function FriendInfo () {

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.user}>
                <div className={styles.information}>
                    <div className={styles.about}>
                        <h3 className={styles.text_header}>Giới Thiệu</h3>
                        <p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Đại học Kinh Doanh và Công Nghệ Hà Nội</p>
                        <p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Trung học Phổ Thông A Duy Tiên</p>
                        <p className={styles.text}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến Từ Hà Nam</p>
                        <p className={styles.text_footer}><img src='/img/clock.png' alt='phone'className={styles.icon}/> Tham gia vào tháng 3 năm 2019</p>
                    </div>
                    <div className={styles.information_child}>
                        <h3 className={styles.text_header}>Liên Hệ</h3> 
                        <p className={styles.text}><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> 0342232931</p>
                        <p className={styles.text}><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> trinhhaison2004@gmail.com</p>
                        <p className={styles.text_footer}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Yên Sở - Hoàng Mai - Hà Nội</p>  
                    </div>
                    <div className={styles.information_child}>
                        <div className={styles.img_header}>
                            <h3 className={styles.text_header}>Bạn bè</h3>
                                <Link to="#"><p className={styles.all_friend} >Xem tất cả</p></Link>
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
                            <h2 className={styles.text}>Friend name</h2>
                            <span className={styles.text}>727 người bạn</span>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Bài viết</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Thông tin</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Bạn bè</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="image-tab" data-bs-toggle="tab" data-bs-target="#image-tab-pane" type="button" role="tab" aria-controls="image-tab-pane" aria-selected="false">Ảnh</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="video-tab" data-bs-toggle="tab" data-bs-target="#video-tab-pane" type="button" role="tab" aria-controls="video-tab-pane" aria-selected="false">Video</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="reels-tab" data-bs-toggle="tab" data-bs-target="#reels-tab-pane" type="button" role="tab" aria-controls="reels-tab-pane" aria-selected="false">Reels</button>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Xem thêm</Link>
                                <ul className="dropdown-menu">
                                    <li><Link to="#" className="dropdown-item" >Check in</Link></li>
                                    <li><Link to="#" className="dropdown-item" >Bài viết đã thích</Link></li>
                                    <li><Link to="#" className="dropdown-item" >Sự kiện</Link></li>
                                    <li><Link to="#" className="dropdown-item" >Quản lý các phần</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className={styles.post_container}>
                                    <Post atr="1"/>
                                    <Post atr="2"/>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                <InfomationFriend />
                            </div>
                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                                <AllFriend />
                            </div>
                            <div className="tab-pane fade" id="image-tab-pane" role="tabpanel" aria-labelledby="image-tab" tabIndex="0">
                                {/* <Image/> */}
                            </div>
                            <div className="tab-pane fade" id="video-tab-pane" role="tabpanel" aria-labelledby="video-tab" tabIndex="0">
                                <h3 className={styles.update_function}>Chức năng đang được cập nhật</h3>
                            </div>
                            <div className="tab-pane fade" id="reels-tab-pane" role="tabpanel" aria-labelledby="reels-tab" tabIndex="0">
                                <h3 className={styles.update_function}>Chức năng đang được cập nhật</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendInfo;