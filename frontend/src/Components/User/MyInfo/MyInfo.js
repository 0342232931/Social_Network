import styles from './MyInfo.module.css'
import NavBar from '../../NavBar/NavBar';
import Post from '../../Post/PostForm'
import { Link } from 'react-router-dom';
import ModalAbout from './ModalAbout/ModalAbout';
import ModalContact from './ModalContact/ModalContact';
import ModalConfigMain from './ModalConfigMain/ModalConfigMain';
import AllFriend from './AllFriend/AllFriend';
import Image from './Image/Image';
import Infomation from './Infomation/Infomation';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect, useState } from 'react';

function MyInfo () {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);

    const [bio, setBio] = useState('');
    const [url, setUrl] = useState('/img/user.png');
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);

    const getAvatar = async (userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);
            
            const img = res.data?.result;

            setUrl(`data:image/${img?.fileType};base64,${img?.data}`)
        } catch (error) {
            console.log("error: " + error);
            
        }
    }

    const getPost = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get("http://localhost:8080/posts/get-by-user-id/" + userId)
            if (response != null) {
                setPosts(response.data?.result);

            } else {
                console.log("get posts failed");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const getBio = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/abouts/get-by-user/' + userId);
            if (response != null) {
                setBio(response.data?.result.description);
                console.log("get bio sueccess");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const getFriends = async(userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/get-friends-by-user-id/' + userId);
            if (response != null) {
                console.log("get friends success");
                setFriends(response.data?.result);
            } else {
                console.log("get friends fail");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getAvatar(user?.id, axiosJwt);
        getPost(user?.id, axiosJwt);
        getBio(user?.id, axiosJwt);
        getFriends(user?.id, axiosJwt);
    }, [])

    const renderAbout = () => {
        if (user?.job === "" && user?.university === "" && user?.highSchool === "" && user?.address === "" && user?.dob === null) {
            return (
                <div className={styles.about}>
                    <h3 className={styles.text_header}>Giới Thiệu</h3>
                    <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_about">
                        <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                            Chỉnh sửa chi tiết</button>
                    <p className={styles.text_none_content}>--------Chưa có thông tin--------</p>
                    
                </div>
            )
        } else {
            return (
                <div className={styles.about}>
                    <h3 className={styles.text_header}>Giới Thiệu</h3>
                    <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_about">
                        <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                        Chỉnh sửa chi tiết</button>
                    {user?.job === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/briefcase.png' alt='phone'className={styles.icon}/> Làm việc tại {user?.job}</p>)}
                    {user?.university === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> {user?.university}</p>)}
                    {user?.highSchool === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> {user?.highSchool}</p>)}
                    {user?.address === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến từ {user?.address}</p>)}
                    {user?.dob === null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/cake.png' alt='phone'className={styles.icon}/> Ngày sinh {user?.dob}</p>)}
                    <p className={styles.text_footer}><img src='/img/clock.png' alt='phone'className={styles.icon}/> Tham gia vào tháng 3 năm 2019</p>
                </div>
            )
        }
    }

    const renderContact  = () => {
        if (user?.phoneNumber === "" && user?.email === "" && user?.hometown === "") {
            return (
                <div className={styles.information_child}>
                    <h3 className={styles.text_header}>Liên Hệ</h3>
                    <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_contact">
                        <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                        Chỉnh sửa chi tiết</button>  
                    <p className={styles.text_none_content}>--------Chưa có thông tin--------</p>
                </div>
            )
        } else {
            return (
                <div className={styles.information_child}>
                    <h3 className={styles.text_header}>Liên Hệ</h3>
                    <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_contact">
                        <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                        Chỉnh sửa chi tiết</button>  
                    {user?.phoneNumber === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> {user?.phoneNumber}</p>)}
                    {user?.email === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> {user?.email}</p>)}
                    {user?.hometown === "" ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> {user?.hometown}</p>)}
                </div>
            )
        }
    }

    const handleRenderPost = () => {
        
        return posts.map((post) => {
            return (
                <Post key={post?.id} post={post} />
            )
        })
    }

    const renderBio = () => {
        if (bio === '') {
            return (
                <span className={styles.display_none}></span>
            )
        } else {
            return <span className={styles.text_bio}>{bio}</span>
        }
    }

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.user}>
                <div className={styles.information}>
                    {renderAbout()}
                    {renderContact()}
                </div>
                <div className={styles.line_col}></div>
                <div className={styles.me_container}>
                    <div className={styles.me}>
                        <div className={styles.avatar_container}>
                            <img className={styles.avatar} src={url} alt='my avatar' />
                        </div>
                        <div className={styles.name_container}>
                            <h2 className={styles.text}>{`${user?.firstName} ${user?.lastName}`}</h2>
                            <span className={styles.text}>{`${friends.length} người bạn`}</span><br/>
                            {renderBio()}
                        </div>
                        <div className={styles.button_config}>
                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal_config_main">
                                <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                                Chỉnh sửa trang cá nhân</button>
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
                                    {handleRenderPost()}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                <Infomation userId={user?.id}/>
                            </div>
                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                                <AllFriend friends={friends} />
                            </div>
                            <div className="tab-pane fade" id="image-tab-pane" role="tabpanel" aria-labelledby="image-tab" tabIndex="0">
                                <Image userId={user?.id}/>
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
            <ModalAbout />
            <ModalContact />
            <ModalConfigMain userId={user?.id}/>
        </div>
    )
}

export default MyInfo;