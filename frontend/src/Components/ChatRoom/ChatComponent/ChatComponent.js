import React, { useState, useEffect, useRef } from 'react';
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import styles from './ChatComponent.module.css';
import { useSelector } from 'react-redux';

const ChatComponent = ({receiver}) => {
    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const stompClient = useRef(null);

    // Kết nối khi component được mount
    useEffect(() => {
        // const socket = new SockJS('http://localhost:8080/ws'); // Kết nối đến endpoint
        // stompClient.current = Stomp.over(socket);

        // loadMessages(receiver?.username);

        // stompClient.current.connect(
        //     {Authorization: `Bearer ${token}`},  // Thêm token vào header
        //     () => {
        //         console.log('Connected to WebSocket');
                
        //         // Đăng ký nhận tin nhắn từ server qua channel /queue/messages
        //         stompClient.current.subcribe("/user/queue/messages", onReceivedMessage);
        //     },
        //     (error) => {
        //         console.log("Websocket connection error: " + error);
                
        //     }
        // );

        // // Đóng kết nối khi component un mount
        // return () => {
        //     if (stompClient.current) {
        //         stompClient.current.disconnect();
        //     }
        // }
    }, [token, receiver]);

    // Gọi API lấy danh sách tin nhắn giữa currentUser và receiver
    const loadMessages = (receiverUsername) => {
        // if (!receiverUsername.trim()) {
        // alert("Receiver username cannot be empty!");
        // return;
        // }

        // const requestPayload = {
        // senderUsername: user?.username,
        // receiverUsername: receiverUsername,
        // };

        // stompClient.current.send(
        // "/app/user.loadMessages", // Destination trên server
        // {
        //     Authorization: `Bearer ${token}`,
        // },
        // JSON.stringify(requestPayload)
        // );

        // // Lắng nghe phản hồi từ server tại channel `/user/topic/caller`
        // stompClient.current.subscribe("/user/topic/caller", (message) => {
        // const response = JSON.parse(message.body);
        // setMessages(response.messages); // Cập nhật danh sách tin nhắn từ API
        // });

    };


    const onReceivedMessage = (message) => {
        // const messageData = JSON.parse(message.body);
        // setMessages((prevMessages) => [...prevMessages, messageData]);
    }

    const sendMessage = () => {

        // if (!messageInput.trim()) {
        //     alert("Message input cannot be empty!")
        //     return;   
        // }

        // const messagePayload = {
        //     senderUsername: user?.username,
        //     receiverUsername: receiver?.username,
        //     content: messageInput,
        // }

        // stompClient.current.send(
        //     "/app/user.sendMessage",
        //     {
        //         Authorization: `Bearer ${token}`,
        //     },
        //     JSON.stringify(messagePayload),
        // );

        // setMessageInput("");
    }
    
    const renderMessages = () => {
        return messages.map((message) => {
            return (
                <>
                    <div key={message?.id} className={message?.sender.username === user?.username ? styles.message_container2 : styles.message_container}>
                        <p className={message?.sender.username === user?.username ? styles.message_username2 : styles.message_username}>{`${message?.receiver.firstName} ${message?.receiver.lastName}`}</p>
                        <p className={message?.sender.username === user?.username ? styles.message_content2 : styles.message_content}>{message?.content}</p>
                    </div> <br />
                </>
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
                <div className={styles.send_container}>
                    <input type='text' className={styles.input_message} placeholder='Trò chuyện tại đây ^^' onChange={e => setMessageInput(e.target.value)}/>
                    <img className={styles.send_icon} src='/img/Messenger/paper-plane.png' alt='...' onClick={sendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;