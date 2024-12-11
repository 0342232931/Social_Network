import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import ModalPostComment from "./Modal/ModalPostComment";
import ModalError from "../Error/ModalError";

function Post({post}){

    const dispatch = useDispatch();

    const data = useSelector((state) => state.auth.login?.currentUser);
    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const [imgObj, setImgObj] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isError, setIsError] = useState(false);
    const [commentQuantity, setCommentQuantity] = useState(0);
    const [interactionQuantity, setInteractionQuantity] = useState(0);
    const avtSrc = "/img/user.png";
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    // Get avatar user
    const getAvatar = async (userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);
            
            const img = res.data?.result.data;

            setAvatar(`data:image/png;base64,${img}`)
        } catch (error) {
            console.log("error: " + error);
            
        }
    }

    const getImagesForPost = async (postId, axiosJwt) => {
        try {
            const res = await axiosJwt.get('http://localhost:8080/images/get-images-by-post-id/' + postId);
            if (res.data != null) 
                setImgObj(res.data?.result)

        } catch (error) {
            console.log(error);
            
        }
    }

    const handleClickLike = async() => {

        const request = {
            interactId: "354178d0-fa74-427c-b",
            postId: post?.id,
            userId: user?.id,
        }

        try {
            const res = await axiosJwt.post("http://localhost:8080/interactions", request);
            if(res != null)
                setInteractionQuantity(interactionQuantity + 1);
        } catch (error) {
            setIsError(true);
        }
    }

    const handleRenderError = () => {
        
        if (isError) {
            return <ModalError />
        }
    }

    const countInteracComment = async (axiosJwt, postId) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/posts/count-interact-comment/" + postId);
            if (res != null) {
                setCommentQuantity(res.data?.result.commentQuantity);
                setInteractionQuantity(res.data?.result.interactQuantity);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        countInteracComment(axiosJwt, post?.id);
        getAvatar(post?.user.id, axiosJwt);
        getImagesForPost(post?.id, axiosJwt);
    }, [post])

    const renderImages = () => {

        let isActive = true;

        const ChangeResultIsActive = () => {
            const result = "active";
            isActive = false;

            return result;
        }

        if (imgObj != null) {
            return(
                <div className="carousel-inner">
                    {
                        imgObj.map((img) => {
                            return (
                                <div className={`carousel-item ${ isActive ? ChangeResultIsActive() : '' }`} key={img.id}>
                                    <img src={`data:image/${img.fileType};base64,${img.data}`} className={`d-block w-100 ${styles.img_post}`} alt="..." />
                                </div>
                            )
                        })
                    }
                </div>
            ) 
        } else {
            <div className={`carousel-inner ${styles.display_none}`}>

            </div>
        }
        
    }

    const hanleRenderCarousel = () => {
        if (imgObj!= null) {
            return(
                <div className={styles.img_container}>
                    <div id={`carouselExampleIndicators${post?.id}`} className="carousel slide">
                        {renderImages()}
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${post?.id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${post?.id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            )
        } else {
            return(
                <div className={styles.display_none}>

                </div>
            )
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header_container}>
                <img className={styles.avatar} src={avatar != null ? avatar : avtSrc} alt="..."/>
                <div className={styles.header_info_post}>
                    <h3 className={styles.username}><b>{`${post?.user.firstName} ${post?.user.lastName}`}</b></h3>
                    <p className={styles.time}>{`${post?.createAt}`}</p>
                </div>
            </div>
            <div className={styles.content_container}>
                <span className={styles.content}>{post?.content}</span>
            </div>
            { hanleRenderCarousel() }
            <div className={styles.data}>
                <span className={styles.data_child}>{`Likes: ${interactionQuantity}`}</span>
                <span className={styles.data_child}>{`Comments: ${commentQuantity}`}</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.footer_container}>
                <p className={styles.margin_left} onClick={handleClickLike}><img className={styles.interact} src="/img/post/heart1.png" alt="Love"/>  Like</p>
                <button type="button" className={styles.btn_modal} data-bs-toggle="modal" data-bs-target={`#modal_post_comment${post?.id}`}>
                                <p><img className={styles.interact} src="/img/post/speech-bubble.png" alt="comment"/>  Bình luận</p></button>
                <p className={styles.margin_right}><img className={styles.interact} src="/img/post/send1.png" alt="share" />  Chia sẻ</p>
            </div>
            <ModalPostComment postId={post?.id} />
            {handleRenderError()}
        </div>
    )
}

export default Post;