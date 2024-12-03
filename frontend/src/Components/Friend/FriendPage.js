import styles from './FriendPage.module.css';
import Navbar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function FriendPage () {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);
    const stompClient = useRef();

    const [addFriendRequest, setAddFriendRequest] = useState([]);

    const getRequestAddFriend = async (axiosJwt, userId) => {
        try {
            const response = await axiosJwt.get("http://localhost:8080/get-notifications-add-friend-by-id/" + userId);
    
            const addRequests = response.data;
            const update = addRequests?.map((addRequest) => ({
                ...addRequest,
                avatarUrl: `data:image/png;base64,${addRequest?.avatarUrl}`,
            }))

            setAddFriendRequest(update)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getRequestAddFriend(axiosJwt, user?.id);

        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect(
            {},
            () => {
                stompClient.current.subscribe(`/user/${user?.username}/notification-type-add-friend`, (response) => {
                    const payload = JSON.parse(response.body);
                    const result = payload;
                    result.avatarUrl = `data:image/png;base64,${result?.avatarUrl}`;
                    setAddFriendRequest((prev) => [...prev, result]);
                })

                stompClient.current.subscribe(`/user/${user?.id}/notification-add-friend-delete`, (response) => {
                    const payload = JSON.parse(response.body);
                    const updateNotification = payload?.map((notification) => ({
                        ...notification,
                        avatarUrl: `data:image/png;base64,${notification?.avatarUrl}`,
                    }))
                    setAddFriendRequest(updateNotification);
                })
            },
            () => {
                console.log("Connect to WebSocket failed");
                
            }
        )
    },[])

    const handleRenderAddFriendRequest = () => {
        if (addFriendRequest.length > 0){
            return addFriendRequest.map((request) => {
                return (
                    <div key={request?.id} className={`card ${styles.element_child}`}>
                        <img src={request?.avatarUrl != null ? request?.avatarUrl : "/img/user.png"} className={`card-img-top ${styles.img_card}`} alt="..." />
                        <div className="card-body">
                            <h5 className={`card-title ${styles.card_title}`}>{`${request?.sender.firstName} ${request?.sender.lastName}`}</h5>
                            <div className={styles.button_card}>
                                <button className="btn btn-primary" onClick={() => handleSubmitAddFriend(request?.sender.id, request?.id)}>Xác nhận</button>
                                <button className="btn btn-secondary" onClick={() => handleDeleteAddFriendRequets(request?.id)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div></div>
            )
        }
    }

    const handleSubmitAddFriend = (friendId, notificationId) => {
        const request = {
            userId: user?.id,
            friendId: friendId,
        }

        stompClient.current.send(
            "/app/user.add-friend",
            {},
            JSON.stringify(request),
        )

        const request2 = {
            userId: user?.id,
            notificationId: notificationId,
            isAddFriend: "true",
        }

        stompClient.current.send(
            "/app/user.deleteNotification",
            {},
            JSON.stringify(request2),
        )
    }

    const handleDeleteAddFriendRequets = (notificationId) => {
        const request = {
            userId: user?.id,
            notificationId: notificationId,
            isAddFriend: "true",
        }

        stompClient.current.send(
            "/app/user.deleteNotification",
            {},
            JSON.stringify(request),
        )
    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.util}>
                    <h3 className={styles.header}>Bạn bè</h3>
                    <Link to='/friend-page' className={styles.item_component}>
                        <img src='/img/friend/friend.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Trang chủ</h4>
                    </Link>
                    <Link to='/friend-request' className={styles.item_component}>
                        <img src='/img/friend/add-user.png' alt='...' className={styles.icon}/>   
                        <h4 className={styles.header_style}>Lời mời kết bạn</h4>
                    </Link>
                    <Link to='/suggest' className={styles.item_component}>
                        <img src='/img/friend/user-friendly.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Gợi ý</h4>
                    </Link>
                    <Link to='/friends' className={styles.item_component}>
                        <img src='/img/friend/friendlist.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Tất cả bạn bè</h4>
                    </Link>
                    <Link to='#' className={styles.item_component}>
                        <img src='/img/friend/gift.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Sinh nhật</h4>
                    </Link>
                    <Link to='#' className={styles.item_component}>
                        <img src='/img/friend/friendlist.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Danh sách tùy chỉnh</h4>
                    </Link>
                </div>
                <div className={styles.content}>
                    <div className={styles.friend_request_container}>
                        <div className={styles.header_friend_request}>
                            <h4 className={styles.header_title}>Lời mời kết bạn</h4>
                            <Link to='#' className={styles.see_all_request}>Xem tất cả</Link>
                        </div>
                        <div className={styles.container_friend_request}>
                            {handleRenderAddFriendRequest()}
                        </div>      
                    </div>
                    <div className={styles.friend_request_container}>
                        <div className={styles.header_friend_request}>
                            <h4 className={styles.header_title}>Gợi ý</h4>
                            <Link to='#' className={styles.see_all_request}>Xem tất cả</Link>
                        </div>
                        <div className={styles.container_friend_request}>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendPage;