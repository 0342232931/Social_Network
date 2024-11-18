import styles from './ChatRoom.module.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import { useEffect, useRef, useState } from 'react';
import ChatComponent from './ChatComponent/ChatComponent';
import ListUser from './ListUser/ListUser';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function ChatRoom () {
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const axiosJwt = createAxios(data, dispatch, loginSuccess);
    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);

    const [friends, setFriends] = useState(null);
    const [chatUsers, setChatUsers] = useState(null);
    const [dataUsers, setDataUsers] = useState(null);
    const stompClient = useRef(null);

    const getAllFriend = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/relations/get-friends-by-user-id/' + userId);
            if (response != null) {
                console.log("get friend success");
                setFriends(response.data?.result);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getAllFriend(user?.id, axiosJwt);

        const socket = new SockJS("http://localhost:8080/ws");
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect(
            {Authorization: `Bearer ${token}`},
            () => {
                console.log("Connected to WebSocket");

                stompClient.current.subscribe('/user/topic/caller-users', onReceivedMessage);
            }
        )

        // Đóng kết nối khi component un mount
        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        }

    }, [token])

    const onReceivedMessage = (message) => {
        const usersData = JSON.parse(message.body);
        setChatUsers((prev) => [...prev, usersData]);
    }

    const loadChatUsers = (userDetailId) => {

        const getUsersRequest = {
            userDetailId: userDetailId,
        }

        stompClient.current.send(
            "/app/user.sendMessage",
            {
                Authorization: `Bearer ${token}`,
            },
            JSON.stringify(getUsersRequest),
        );
    }

    const handleRenderChatUsers = () => {
        loadChatUsers(user?.id);
        setDataUsers(chatUsers);
    }

    const handleRenderfriends = () => {
        setDataUsers(friends);
    }

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.menu_container}>
                    <img alt='...' className={styles.icon} src='/img/Messenger/chat.png' onClick={handleRenderChatUsers} /><br />
                    <img alt='...' className={styles.icon} src='/img/Messenger/phone-book.png' onClick={handleRenderfriends} />
                </div>
                <div className={styles.list_container}>
                    <ListUser friends={dataUsers}/>
                </div>
                <div className={styles.content_container}>
                    {/* <span className={styles.nothing_chat_selected}><img className={styles.icon_nothing_chat_selected} src='/img/partners.png' /><p className={styles.text}>Hãy bắt đầu trò chuyện!!</p></span> */}
                    <ChatComponent />
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;