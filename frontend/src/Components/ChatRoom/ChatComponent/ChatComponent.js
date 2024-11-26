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

    useEffect(() => {
        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect(
            {},
            () => {
                console.log("connected to Websocket");
                
                stompClient.current.subcribe('/user/queue/messages', (message) => {
                    const payload = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, payload]);
                });

                stompClient.current.subscribe("/user/topic/caller", (response) => {
                    const payload = JSON.parse(response.body);
                    setMessages(payload.messages);
                });

                loadAllMessage();
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
    
    const loadAllMessage = () => {
        const request = {
            senderUsername: user?.username,
            receiverUsername: receiver?.username,
        }

        stompClient.current.send(
            "/app/user.loadMessages",
            {},
            JSON.stringify(request)
        );
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
                <form className={styles.send_container}>
                    <input type='text' className={styles.input_message} placeholder='Trò chuyện tại đây ^^' onChange={e => setMessageInput(e.target.value)}/>
                    <img className={styles.send_icon} src='/img/Messenger/paper-plane.png' alt='...' onClick={sendMessage}/>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;