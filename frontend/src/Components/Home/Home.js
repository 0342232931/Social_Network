import styles from './Home.module.css';
import Navbar from "../NavBar/NavBar";
import Post from "../Post/PostForm";
import { Link, useNavigate } from 'react-router-dom';
import ModalPost from './ModalPost/ModalPost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

function HomePage () {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);
    const url = useState("/img/user.png");
    const [imgData, setImgData] = useState(null);
    const [friends, setFriends] = useState([]);
    const [post, setPost] = useState([]);

    // Call api get Avatar User
    const getAvatarUser = async (userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);
            
            const img = res.data?.result.data;

            setImgData(`data:image/png;base64,${img}`)
        } catch (error) {
            console.log("error: " + error);
            
        }

    }

    // Get Friends
    const getFriends = async (userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get('http://localhost:8080/relations/get-friends-by-user-id/' + userId);

            setFriends(res.data.result);
        } catch (error) {
            console.log("err: " + error);
            
        }
    }

    // Get Posts
    const getPost = async (userId, axiosJwt) => {
         try {
            const res = await axiosJwt.get('http://localhost:8080/posts/get-new-post-by-user-auth' + userId);

            setPost(res.data.result);
         } catch (error) {
            console.log("err: " + error);
            
         }
    }

    // Render Friends
    const renderFriends = () => {
        if (friends.length > 0){
            return friends.map((friend) => {
                return (
                    <Link key={friend.id} to='/friend-info' className={styles.textdecoration_none}>
                        <div className={styles.friend_element}>
                            <img className={styles.avatar_friend} src='/img/user.png' alt='avatar friend'/>
                            <span className={styles.friend_name}><b>{friend?.firstName == null && friend?.lastName == null ? friend?.username : `${friend?.firstName} ${friend?.lastName}` }</b></span>
                        </div>
                    </Link>
                )
            })
        } else {
            return (
                <div>
                    <h3 className={styles.friend_name}>Bạn không có bạn bè nào</h3>
                </div>
            )
        }
    }

    // Render Posts
    const renderPosts = () => {
        if (!post.length > 0) {
            return(
                <div>
                    <h3 className={styles.friend_name}>Không có bài viết mới nào được tạo</h3>
                </div>
            )
        }
        return post.map((post) => {
            return (
                <Post key={post?.id} postId={post?.id} content={post?.content} createAt={post?.createAt} user={post?.user}/>
            )
        })
   
    }

    // Check User is authenticated
    useEffect(() => {
        if(!data){
            navigate('/login');
        }else {
            getAvatarUser(user?.id, axiosJwt);
            getFriends(user?.id, axiosJwt);
            getPost(user?.id, axiosJwt);
        }
    }, [data, user?.id, axiosJwt, imgData])

   
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.line}></div>
            <div className={styles.content}>
                <div className={styles.util}>
                    <div className={styles.my_info}>
                        <Link className={styles.link} to="/my-info">
                            <img className={styles.avatar_friend} src={imgData == null ? url : imgData} alt='my avatar'/>
                            <h3 className={styles.friend_name}>{user?.firstName == null && user?.lastName == null ? user?.username : `${user?.firstName} ${user?.lastName}` }</h3>
                        </Link>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.util_element}>
                        <button type='button' className={styles.btn_modal} data-bs-toggle="modal" data-bs-target="#modal_post">
                            <img className={styles.avatar_friend} src='/img/add.png' alt='my avatar'/>
                            <h3 className={styles.friend_name}>Đăng Bài Viết</h3>
                        </button>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="/friend-page" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/high-five.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Bạn Bè</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/partners.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Nhóm</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/clock.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Kỉ Niệm</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/bookmark.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Đã Lưu</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/video-chat.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Video</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/video.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Reels</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/payment-card-icon.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Bảng Feed</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/market.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Marketplace</h3>
                        </Link>
                    </div>
                    <div className={styles.util_element}>
                        <Link to="#" className={styles.link}>
                            <img className={styles.avatar_friend} src="/img/game-controller.png" alt='my avatar'/>
                            <h3 className={styles.friend_name}>Chơi Game</h3>
                        </Link>
                    </div>
                </div>
                <div className={styles.post_content}>
                    {renderPosts()}
                </div>
                <div className={styles.list_friend}>
                    <div className={styles.ads}>
                        <h3 className={styles.ads_header}>Được Tài Trợ</h3>
                        <div className={styles.ads_element}>
                            <img className={styles.img_ads} src='https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062' alt='Pepsi'/>
                            <p className={styles.title}>Đã quá pepsi ơi!!</p>
                        </div>
                        <div className={styles.ads_element}>
                            <img className={styles.img_ads} src="https://th.bing.com/th/id/OIP.2G92TvAtxNvFnKoDztsc8AHaKM?pid=ImgDet&w=184&h=253&c=7&dpr=1.3" alt="MC Donald's"/>
                            <span className={styles.title}>McDonald'👉 Fast Beaty</span>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.friends}>
                        <h3 className={styles.friends_header}>Nguời Liên Hệ</h3>
                        {renderFriends()}
                    </div>
                </div>
            </div>
            <ModalPost />
        </div>
    )
}

export default HomePage;