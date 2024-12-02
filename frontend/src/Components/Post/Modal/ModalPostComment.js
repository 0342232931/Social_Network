import { useEffect, useRef, useState } from "react";
import styles from "./ModalPostComment.module.css";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { json } from "react-router-dom";

const ModalPostComment = ({postId}) => {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);

    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const stomClient = useRef();

    useEffect(() => {

        getAllComments(axiosJwt, postId);

        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stomClient.current = Stomp.over(socket);

        stomClient.current.connect(
            {},
            () => {
                console.log("Connected to WebSocket");
                stomClient.current.subscribe(`/user/${postId}/comments`, (comment) => {
                    const data = JSON.parse(comment.body);
                    setComments((prev) => [...prev, data]);
                })
            },
            (error) => {
                console.log("Connection failed");
                console.log(error);
            }
        )
    },[postId]);

    const getAllComments = async(axiosJwt, postId) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/get-by-post-id/" + postId);
            setComments(res.data?.result);
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleSendComment = () => {
        if (commentInput.trim() === '')
            return;

        const request = {
            content: commentInput,
            userId: user?.id,
            postId: postId,
        };

        stomClient.current.send(
            "/app/user.sendComment",
            {},
            JSON.stringify(request)
        );

        setCommentInput('');
    }

    return (
        <div className={`modal fade ${styles.container}`} id={`modal_post_comment${postId}`} tabIndex="-1" aria-labelledby={`modal_post_comment${postId}`} aria-hidden="true">
            <div className={`modal-dialog`}>
                <div className={`modal-content ${styles.background_custom}`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`modal_post_comment${postId}`} style={{color: "aliceblue"}}>Bình luận</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${styles.comment_body}`}>
                        {
                            comments.map((comment) => {
                                return (
                                    <div key={comment?.id} className={styles.comment_container}>
                                        <img src={comment?.avatarUser.data != null ? `data:image/${comment?.avatarUser?.fileType};base64,${comment?.avatarUser?.data}` : "/img/user.png"} alt="..." className={styles.avatar} />
                                        <div className={styles.comment_content_container}>
                                            <p className={styles.username}>{`${comment?.user.firstName} ${comment?.user.lastName}`}</p>
                                            <p className={styles.comment_content}>{comment?.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="modal-footer">
                        <input type="text" className={styles.comment_input} onChange={e => setCommentInput(e.target.value)} placeholder="Bạn hãy viết gì đó!"/>
                        <button type="button" className="btn btn-secondary" onClick={handleSendComment}>Đăng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPostComment;