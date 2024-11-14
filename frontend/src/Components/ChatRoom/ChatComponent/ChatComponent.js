import React, { useState, useEffect, useRef } from 'react';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
import styles from './ChatComponent.module.css';

const ChatComponent = () => {
    // const [messages, setMessages] = useState([]);
    // const [input, setInput] = useState('');
    // const [isConnected, setIsConnected] = useState(false);
    // const stompClient = useRef(null);

    // useEffect(() => {
    //     // Tạo kết nối WebSocket khi component được mount
    //     const socket = new SockJS('http://localhost:8080/ws');  // URL backend WebSocket
    //     stompClient.current = Stomp.over(socket);
        
    //     // Kết nối WebSocket
    //     stompClient.current.connect({}, onConnected, onError);
        
    //     return () => {
    //         // Ngắt kết nối khi component bị unmount
    //         if (stompClient.current) {
    //             stompClient.current.disconnect();
    //         }
    //     };
    // }, []);

    // const onConnected = () => {
    //     setIsConnected(true);
        
    //     // Đăng ký các channel để nhận tin nhắn
    //     stompClient.current.subscribe('/user/queue/messages', onMessageReceived); // Đăng ký channel nhận tin nhắn cá nhân
    //     stompClient.current.subscribe('/topic/broadcast', onBroadcastReceived); // Đăng ký channel broadcast
        
    //     // Gửi thông báo người dùng kết nối
    //     stompClient.current.send('/app/user.onConnected', {}, {});
    // };

    // const onError = (error) => {
    //     console.error('Could not connect to WebSocket server:', error);
    // };

    // const onMessageReceived = (message) => {
    //     const messageData = JSON.parse(message.body);
    //     setMessages((prevMessages) => [...prevMessages, messageData]);
    // };

    // const onBroadcastReceived = (message) => {
    //     const broadcastData = JSON.parse(message.body);
    //     console.log('Broadcast message:', broadcastData); // Xử lý nếu cần hiển thị broadcast message
    // };

    // const sendMessage = () => {
    //     if (input.trim() && stompClient.current) {
    //         const messagePayload = {
    //             content: input,
    //             recipientUsername: 'recipient_username', // Thay bằng tên người nhận thực tế
    //         };
            
    //         stompClient.current.send('/app/user.sendMessage', {}, JSON.stringify(messagePayload));
    //         setInput('');
    //     }
    // };

    // return (
    //     <div>
    //         <h2>WebSocket Chat</h2>
    //         {isConnected ? <p>Connected</p> : <p>Connecting...</p>}
            
    //         <div className="chat-box">
    //             {messages.map((msg, index) => (
    //                 <div key={index}>
    //                     <strong>{msg.senderUser?.username}:</strong> {msg.message?.content}
    //                 </div>
    //             ))}
    //         </div>

    //         <input
    //             type="text"
    //             value={input}
    //             onChange={(e) => setInput(e.target.value)}
    //             placeholder="Type a message..."
    //         />
    //         <button onClick={sendMessage}>Send</button>
    //     </div>
    // );

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <img src='/img/bookmark.png' alt='...' className={styles.avatar} />
                <h3 className={styles.username}>Robert Downey Jr</h3>
            </div>
            <div className={styles.chat_container}>
                <div className={styles.content_container}>
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you 1</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you2</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you3</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you4</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you5</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you6</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you7</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you8</p>
                    </div> <br />
                    <div className={styles.message_container}>
                        <p className={styles.message_username}>Robert Downey Jr</p>
                        <p className={styles.message_content}>Hello, Good morning, Nice to meet you9</p>
                    </div> <br />
                </div>
                <div className={styles.send_container}>
                    <input type='text' className={styles.input_message} placeholder='Trò chuyện tại đây ^^' />
                    <img className={styles.send_icon} src='/img/Messenger/paper-plane.png' alt='...'/>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;