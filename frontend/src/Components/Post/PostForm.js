import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import ModalPostComment from "./Modal/ModalPostComment";

function Post({post}){
        
    const dispatch = useDispatch();

    const data = useSelector((state) => state.auth.login?.currentUser);
    const [imgObj, setImgObj] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [comments, setComments] = useState([]);
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

    useEffect(() => {
        getAvatar(post?.user.id, axiosJwt);
        getImagesForPost(post?.id, axiosJwt);
    }, [])

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
                    <span className={styles.data_child}>Likes: 100</span>
                    <span className={styles.data_child}>Comments: 50</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.footer_container}>
                <p className={styles.margin_left}><img className={styles.interact} src="/img/post/heart.png" alt="Love"/>  Like</p>
                <button type="button" className={styles.btn_modal} data-bs-toggle="modal" data-bs-target={`#modal_post_comment`}>
                                <p><img className={styles.interact} src="/img/post/comment.png" alt="comment"/>  Bình luận</p></button>
                <p className={styles.margin_right}><img className={styles.interact} src="/img/post/send.png" alt="share" />  Chia sẻ</p>
            </div>
            <ModalPostComment />
        </div>
    )
}

export default Post;