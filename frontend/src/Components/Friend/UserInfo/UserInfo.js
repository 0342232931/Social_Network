import styles from './UserInfo.module.css';
import InfomationFriend from '../../User/FriendInfo/InfomationFriend/InfomationFriend';
import AllFriend from '../../User/MyInfo/AllFriend/AllFriend';
import Image from '../../User/MyInfo/Image/Image';
import Post from '../../Post/PostForm';
import { Link } from 'react-router-dom';

function UserInfo () {

    return (
                <div className={styles.me_container}>
                    <div className={styles.me}>
                        <div className={styles.avatar_container}>
                            <img className={styles.avatar} src='/img/partners.png' alt='my avatar' />
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
                                <Image/>
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
    )
}

export default UserInfo;