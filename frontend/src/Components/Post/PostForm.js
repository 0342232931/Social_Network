import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";

function Post({...props}){

    const postId = props.postId;
    const user = props.user;
    const content = props.content;
    const createAt = props.createAt;

    const dispatch = useDispatch();

    const data = useSelector((state) => state.auth.login?.currentUser);
    const [imgString, setImgString] = useState([]);
    const [imgObj, setImgObj] = useState([])
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    

    // Call Api get image from post by post id
    const getImage = async (postId, axiosJwt) => {
        try {
            const res = await axiosJwt.get('http://localhost:8080/images/get-images-post/' + postId);

            setImgString(res.data.body);
            
            imgString.map((img) => {
                setImgObj(
                    ...imgObj,
                    URL.createObjectURL(img)
                )
            })

        } catch (error) {
            console.log("error: " + error);
            
        }
    }

    const handleRenderButton = () => {
        for( let i = 0; i < imgObj.length; i++) {
            return (
                <button type="button" data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`}></button>
            )
        }
        
    }

    useEffect(() => {
        getImage(postId, axiosJwt);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header_container}>
                <img className={styles.avatar} src="https://th.bing.com/th/id/OIP.mlrLAYZ6zAd3uigeyf0fnAHaED?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt=""/>
                <div className={styles.header_info_post}>
                    <h3 className={styles.username}><b>{`${user?.firstName} ${user?.lastName}`}</b></h3>
                    <p className={styles.time}>{`${createAt}`}</p>
                </div>
            </div>
            <span className={styles.content}>{content}</span>
            <div className={styles.img_container}>
                <div id={`carouselExampleIndicators${postId}`} className="carousel slide">
                    <div className="carousel-indicators">
                        {handleRenderButton()}
                    </div>
                    <div className="carousel-inner">
                        {imgObj.map(img => {
                            return (
                                <div className="carousel-item active" key={Math.random()}>
                                    <img src={img} className={`d-block w-100 ${styles.img_post}`} alt="..." />
                                </div>
                            )
                        })}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${postId}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${postId}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className={styles.data}>
                    <span className={styles.data_child}>Likes: 100</span>
                    <span className={styles.data_child}>Comments: 50</span>
                </div>
            <div className={styles.line}></div>
            <div className={styles.footer_container}>
                <p className={styles.margin_left}><img className={styles.interact} src="/img/post/heart.png" alt="Love"/>  Like</p>
                <p><img className={styles.interact} src="/img/post/comment.png" alt="comment"/>  Bình luận</p>
                <p className={styles.margin_right}><img className={styles.interact} src="/img/post/send.png" alt="share" />  Chia sẻ</p>
            </div>
        </div>
    )
}

export default Post;