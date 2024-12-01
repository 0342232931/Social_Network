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

    const [friends, setFriends] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [receiver, setReceiver] = useState(null);
    const stompClient = useRef(null);

    const getAllFriend = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/relations/get-friends-by-user-id/' + userId);

            let users = response.data?.result;

            const updatedUsers = await Promise.all(
                users?.map(async (user) => {
                    try {
                        const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + user?.id);
                        const img = res.data?.result;
                        return {...user, avatarUrl: `data:image/${img.fileType};base64,${img?.data}`};
                    } catch (error) {
                        console.log(error);
                        return {...user, avatarUrl: null}
                    }
                })
            );  
            setFriends(updatedUsers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllFriend(user?.id, axiosJwt);

        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect(
            {},
            () => {
                console.log("Connected to WebSocket");

                stompClient.current.subscribe(`/user/${user?.id}/caller-users`, onReceivedMessage);
                handleRenderChatUsers();
                
            },
            (error) => {
                console.log(error);
                
            }
        )        

        // Đóng kết nối khi component un mount
        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        }
        
    }, [token,isStart])

    const onReceivedMessage = (message) => {
        const usersData = JSON.parse(message.body);
        setChatUsers(usersData);
        setDataUsers(usersData);
    }

    const loadChatUsers = (userDetailId) => {

        const getUsersRequest = {
            userDetailId: userDetailId,
        }

        stompClient.current.send(
            "/app/user.loadUsers",
            {},
            JSON.stringify(getUsersRequest),
        );
    }

    const handleRenderChatUsers = () => {
        loadChatUsers(user?.id);
    }

    const handleRenderfriends = () => {
        setDataUsers(friends);
    }

    const handleStartChat = () => {
        if (isStart) {
            return (<ChatComponent receiver={receiver} loadChatUsers={loadChatUsers} chatUsers={chatUsers}/>)
        }
        return (<span className={styles.nothing_chat_selected}><img className={styles.icon_nothing_chat_selected} src='/img/partners.png' /><p className={styles.text}>Hãy bắt đầu trò chuyện!!</p></span>)   
    }

    const onSelectUser = (user) => {
        setIsStart(true);
        setReceiver(user);
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
                    <ListUser dataUsers={dataUsers} onSelectUser={onSelectUser} />
                </div>
                <div className={styles.content_container}>
                    {handleStartChat()}
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;