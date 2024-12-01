import React, { useState, useEffect, useRef } from 'react';
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import styles from './ChatComponent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';

const ChatComponent = ({receiver, loadChatUsers, chatUsers}) => {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const stompClient = useRef(null);

    useEffect(() => {
        loadAllMessage(user?.username, receiver?.username);
        
        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect(
            {},
            () => {                
                stompClient.current.subscribe(`/user/${user?.username}/messages`, (message) => {
                    const payload = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, payload]);
         
                    chatUsers?.forEach((chatUser) => {
                        if (((payload?.receiver.id !== chatUser?.id && payload?.sender.id === user?.id) 
                                || (payload?.sender.id !== chatUser?.id && payload?.receiver.id === user?.id)) 
                            && messages.length <= 0){
                            loadChatUsers(user?.id);
                        }
                    });
                    
                });

            },
            (error) => {
                console.log("connection to websocket error: ", error);
            }
        )

        return () => {
            if(stompClient.current){
                stompClient.current.disconnect();
                console.log("Disconnected from websocket");
            }
        }
    }, [receiver, token])
    
    const loadAllMessage = async(senderUsername, receiverUsername) => {
        const request = {
            senderUsername: senderUsername,
            receiverUsername: receiverUsername,
        };

        try {
            const response = await axiosJwt.post("http://localhost:8080/get-messages-by-receiver-sender", request);
            if(response.data?.result){
                setMessages(response.data?.result.messages);
            } else {
                console.log("get messages failed");
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(messageInput.trim() === '') return;

        const request = {
            content: messageInput,
            senderUsername: user?.username,
            receiverUsername: receiver?.username,
        };

        stompClient.current.send(
            "/app/user.sendMessage",
            {},
            JSON.stringify(request)
        );

        setMessageInput('');
    }


    const renderMessages = () => {
        return messages.map((message) => {
            return (
                <div key={message?.id}>
                    <div className={message?.sender.username === user?.username ? styles.message_container2 : styles.message_container}>
                        <p className={message?.sender.username === user?.username ? styles.message_username2 : styles.message_username}>{`${message?.sender.firstName} ${message?.sender.lastName}`}</p>
                        <p className={message?.sender.username === user?.username ? styles.message_content2 : styles.message_content}>{message?.content}</p>
                    </div> <br />
                </div>
            )
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <img src={receiver?.avatarUrl != null ? receiver?.avatarUrl : '/img/user.png'} alt='...' className={styles.avatar} />
                <h3 className={styles.username}>{`${receiver?.firstName} ${receiver?.lastName}`}</h3>
            </div>
            <div className={styles.chat_container}>
                <div className={styles.content_container}>
                    {renderMessages()}
                </div>
                <form className={styles.send_container}>
                    <input type='text' className={styles.input_message} placeholder='Trò chuyện tại đây ^^' onChange={e => setMessageInput(e.target.value)}/>
                    <img className={styles.send_icon} src='/img/Messenger/paper-plane.png' alt='...' onClick={sendMessage}/>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;