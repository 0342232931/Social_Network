import styles from './Home.module.css';
import Navbar from "../NavBar/NavBar";
import Post from "../Post/PostForm";
import { Link, useNavigate } from 'react-router-dom';
import ModalPost from './ModalPost/ModalPost';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import throttle from "lodash/throttle";

function HomePage () {    
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);
    const [imgData, setImgData] = useState(null);
    const [friends, setFriends] = useState([]);

    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();
    const lastPostElementRef = useRef();

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
            const res = await axiosJwt.get('http://localhost:8080/get-friends-by-user-id/' + userId);

            const result = res.data?.result;

            const updatedUsers = await Promise.all(
                result?.map(async (re) => {
                    try {
                        const response = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + re?.id);
                        const img = response.data?.result;
                        return {...re, avatarUrl: `data:image/${img.fileType};base64,${img?.data}`};
                    } catch (error) {
                        console.log(error);
                        return {...re, avatarUrl: null}
                    }
                })
            );  

            setFriends(updatedUsers);
        } catch (error) {
            console.log("err: " + error);
            
        }
    }

    // Render Friends
    const renderFriends = () => {
        if (friends.length > 0){
            return friends.map((friend) => {
                return (
                    <Link key={friend.id} to={`/friend-info?id=${friend?.id}`} className={styles.textdecoration_none}>
                        <div className={styles.friend_element}>
                        <img className={styles.avatar_friend} src={friend?.avatarUrl != null ? friend?.avatarUrl : '/img/user.png'} alt='avatar friend'/>
                            <span className={styles.friend_name}><b>{friend?.firstName == null && friend?.lastName == null ? friend?.username : `${friend?.firstName} ${friend?.lastName}` }</b></span>
                        </div>
                    </Link>
                )
            })
        } else {
            return (
                <div>
                    <h3 className={styles.not_element}>Bạn chưa có bạn bè</h3>
                </div>
            )
        }
    }
    const memoizedFriends = useMemo(() => renderFriends(), [friends]);

    // Render Posts
    const renderPosts = () => {
        if (!post?.length > 0) {
            return (
                <div>
                    <h3 className={styles.not_element}>----- Không có bài viết mới nào được tạo -----</h3>
                </div>
            );
        }
        return post?.map((post) => (
            <Post key={post?.id} post={post} />
        ));
    }
    const memoizedPosts = useMemo(() => renderPosts(), [post]);

    // Get Posts
    const getPost = async (userId, axiosJwt, page) => {
        console.log("get post in page: " + page);
        console.log("total pages: " + totalPages);
        
        setLoading(true);
         try {
            const response = await axiosJwt.get("http://localhost:8080/posts/get-friend-posts/" + userId, 
                {
                    params: {
                        page: page,
                        size: 3,
                    }
                }
            )
            setPost((prev) => [...prev, ...response.data?.result.data]);    
            setTotalPages(response.data?.result.totalPage);
            setHasMore(response.data?.result.data?.length > 0);
            setLoading(false);
         } catch (error) {
            console.log(error);
            setLoading(false);
            
         }
    }

    // Check User is authenticated
    useEffect(() => {
        if(!data){
            navigate('/login');
        } else if ((user?.firstName === null || user?.firstName === "") || (user?.lastName === null || user?.firstName === "")) {
            navigate("/update-info")
        } else {
            getAvatarUser(user?.id, axiosJwt);
            getFriends(user?.id, axiosJwt);
        }
    }, [data])

    useEffect(() => {
        getPost(user?.id, axiosJwt, page)
    }, [page])

    // useEffect(() => {
    //     if (!hasMore) return;
    
    //     if (observer.current) observer.current.disconnect();
    //     observer.current = new IntersectionObserver((entries) => {
    //       if (entries[0].isIntersecting) {
    //         if (page < totalPages) {
    //           setPage((prevPage) => prevPage + 1);
    //         }
    //       }
    //     });
    //     if (lastPostElementRef.current) {
    //       observer.current.observe(lastPostElementRef.current);
    //     }
    
    //     setHasMore(false);
    //   }, [hasMore]);

    const handleScroll = useCallback(
        throttle(() => {
            const container = document.querySelector('#post_content');
            if (
                container.scrollTop + container.clientHeight >=
                container.scrollHeight - 10
            ) {
                if (hasMore && page < totalPages) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        }, 1500),
        [hasMore]
    );
    
    // Gắn sự kiện cuộn cho container
    useEffect(() => {
        const container = document.querySelector('#post_content');
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.line}></div>
            <div className={styles.content} >
                <div className={styles.util}>
                    <div className={styles.my_info}>
                        <Link className={styles.link} to="/my-info">
                            <img className={styles.avatar_friend} src={imgData == null ? "/img/user.png" : imgData} alt='my avatar'/>
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
                <div className={styles.post_content} id='post_content' /*onScroll={handleScroll}*/ >
                    {memoizedPosts}
                    {!hasMore && <p style={{ textAlign: "center", color: 'rgb(154, 150, 150)', fontStyle: "italic", marginTop: "10px" }}>--------------Đã tải hết bài viết--------------</p>}
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
                        {memoizedFriends}
                    </div>
                </div>
            </div>
            <ModalPost />
        </div>
    )
}

export default HomePage;