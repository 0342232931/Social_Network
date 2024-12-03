import styles from './FriendRequest.module.css';
import NavBar from '../../NavBar/NavBar';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function FriendRequest() {
    
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);
    const stompClient = useRef();

    const [addFriendRequest, setAddFriendRequest] = useState([]);
    const [request, setRequest] = useState(null);

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

    const handleSelectuser = (currentRequest) => {
        if(currentRequest !== null)
            setRequest(currentRequest);
    }

    const handleRenderAddFriendRequest = () => {
        if (addFriendRequest.length > 0){
            return addFriendRequest.map((request) => {
                return (
                    <div key={request?.id} onClick={() => handleSelectuser(request)} className={styles.request_item}>
                        <img src={request?.avatarUrl != null ? request?.avatarUrl : '/img/user.png'} alt='...' className={styles.avatar_request_item} />
                        <div>
                            <h4 className={styles.friend_name_accept} >{`${request?.sender.firstName} ${request?.sender.lastName}`}</h4>
                            <div className={styles.btn_accept}>
                                <button type='button' className={`btn btn-primary ${styles.btn}`} onClick={() => handleSubmitAddFriend(request?.sender.id, request?.id)}>Xác nhận</button>
                                <button type='button' className={`btn btn-secondary ${styles.btn}`} onClick={() => handleDeleteAddFriendRequets(request?.id)}>Xóa</button>
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

    const handleRenderUserInfo = () => {
        if (request != null) 
            return <UserInfo request={request} />
        return <div></div>
    }


    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.request_container}>
                    <h4 className={styles.title_request_container} >Lời mời kết bạn</h4>
                    {handleRenderAddFriendRequest()}
                </div>
                {handleRenderUserInfo()}
            </div>
        </div>
    )
}

export default FriendRequest;