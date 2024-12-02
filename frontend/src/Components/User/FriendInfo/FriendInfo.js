import styles from './FriendInfo.module.css'
import NavBar from '../../NavBar/NavBar';
import Post from '../../Post/PostForm';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AllFriend from '../MyInfo/AllFriend/AllFriend';
import Image from "../MyInfo/Image/Image";
import InfomationFriend from './InfomationFriend/InfomationFriend';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function FriendInfo () {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const userDetail = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [user, setInfo] = useState();
    const [avatar, setAvatar] = useState(null);
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [bio, setBio] = useState(null);
    const stompClient = useRef();

    const getInfoUser = async (axiosJwt, userId) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/users/" + userId);
            setInfo(res.data?.result)
            console.log("user: ");
            console.log(res.data?.result);
            
        } catch (error) {
            console.log(error);
        }
    }

    const getAvatarUser = async (axiosJwt, userId) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);

            const img = res.data?.result;

            setAvatar(`data:image/${img.fileType};base64,${img.data}`);
        } catch (error) {
            console.log(error);
            
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

    // Call Api get friends
    const getFriends = async(userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/relations/get-friends-by-user-id/" + userId);
            setFriends(res.data?.result);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Call Api get Bio
    const getBio = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/abouts/get-by-user/' + userId);
            setBio(response.data?.result.description);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        if (id === userDetail?.id) 
            navigate('/my-info')
        
        getInfoUser(axiosJwt, id);
        getAvatarUser(axiosJwt, id);
        getPost(id, axiosJwt);
        getFriends(id, axiosJwt);
        getBio(id, axiosJwt);

        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect(
            {},
            () => {
                stompClient.current.subscribe(`/user/${id}/friend`, (response) => {
                    const result = JSON.parse(response.body);
                    if (result?.user1.id === id) {
                        setFriends((prev) => [...prev, result?.user2]);
                    } else {
                        setFriends((prev) => [...prev, result.user1]);
                    }
                })
            },
            (error) => {
                console.log("Connection to WS failed");
                console.log(error);
                
            }
        )

    }, [id]);

    const renderAbout = () => {
        if (user?.job == null && user?.university == null && user?.highSchool == null && user?.address == null && user?.dob == null) {
            return (
                <div className={styles.about}>
                    <h3 className={styles.text_header}>Giới Thiệu</h3>
                    <p className={styles.text}>Chưa có thông tin</p>
                    
                </div>
            )
        } else {
            return (
                <div className={styles.about}>
                    <h3 className={styles.text_header}>Giới Thiệu</h3>
                    {user?.job == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/briefcase.png' alt='phone'className={styles.icon}/> Làm việc tại {user?.job}</p>)}
                    {user?.university == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> {user?.university}</p>)}
                    {user?.highSchool == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> {user?.highSchool}</p>)}
                    {user?.address == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến từ {user?.address}</p>)}
                    {user?.dob == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/cake.png' alt='phone'className={styles.icon}/> Ngày sinh {user?.dob}</p>)}
                    <p className={styles.text_footer}><img src='/img/clock.png' alt='phone'className={styles.icon}/> Tham gia vào tháng 3 năm 2019</p>
                </div>
            )
        }
    }

    const renderContact  = () => {
        if (user?.phoneNumber == null && user?.email == null && user?.hometown == null) {
            return (
                <div className={styles.information_child}>
                    <h3 className={styles.text_header}>Liên Hệ</h3> 
                    <p className={styles.text}> Chưa có thông tin</p> 
                </div>
            )
        } else {
            return (
                <div className={styles.information_child}>
                    <h3 className={styles.text_header}>Liên Hệ</h3> 
                    {user?.phoneNumber == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> {user?.phoneNumber}</p>)}
                    {user?.email == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> {user?.email}</p>)}
                    {user?.hometown == null ? (<></>) : (<p className={styles.text}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> {user?.hometown}</p>)}
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
        if (bio === null) {
            return (
                <span className={styles.display_none}></span>
            )
        } else {
            return <span className={styles.text_bio}>{bio}</span>
        }
    }

    const handleOnClickAddFriend = () => {
        
        const request = {
            content: "đã gửi cho bạn lời mời kết bạn",
            senderUsername: userDetail?.username,
            receiverUsername: user?.username,
            type: "ADD_FRIEND",
        }

        stompClient.current.send(
            "/app/user.sendNotification",
            {},
            JSON.stringify(request)
        )
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
                            <img className={styles.avatar} src={avatar != null ? avatar : '/img/user.png'} alt='my avatar' />
                        </div>
                        <div className={styles.name_container}>
                            <h2 className={styles.text}>{`${user?.firstName} ${user?.lastName}`}</h2>
                            <span className={styles.text}>{friends.length > 0 ? `${friends.length} người bạn` : "Chưa có bạn bè"}</span><br />
                            {renderBio()}
                        </div>
                        <div className={styles.button_add_friend}>
                            <button type="button" className={`${styles.btn_add}`} onClick={() => handleOnClickAddFriend()}>
                                <img src='/img/myinfo/a.png' alt='icon' className={styles.icon} style={{marginBottom : "3px"}}/>
                                Thêm bạn bè
                            </button>
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
                                <InfomationFriend userId={user?.id}/>
                            </div>
                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                                <AllFriend friends={friends}/>
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
        </div>
    )
}

export default FriendInfo;