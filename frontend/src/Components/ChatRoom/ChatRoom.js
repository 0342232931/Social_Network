import styles from './ChatRoom.module.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import { useEffect, useState } from 'react';
import ChatComponent from './ChatComponent/ChatComponent';
import ListUser from './ListUser/ListUser';

function ChatRoom () {
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const axiosJwt = createAxios(data, dispatch, loginSuccess);
    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);

    const [friends, setFriends] = useState([]);

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
    }, [])

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.menu_container}>
                    <img alt='...' className={styles.icon} src='/img/Messenger/chat.png' /><br />
                    <img alt='...' className={styles.icon} src='/img/Messenger/phone-book.png' />
                </div>
                <div className={styles.list_container}>
                    <ListUser />
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