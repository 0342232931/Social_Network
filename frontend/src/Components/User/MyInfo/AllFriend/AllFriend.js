import { useDispatch, useSelector } from 'react-redux';
import styles from './AllFriend.module.css';
import { Link } from 'react-router-dom'
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { useEffect, useState } from 'react';

function AllFriend({friends}) {

    const data = useSelector((state) => state.auth.login?.currentUser)
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const [listFriend, setListFriend] = useState([])

    useEffect(() => {
        setListFriend(friends);
    }, [friends])

    const renderFriend = () => {
        return listFriend.map((friend) => {
            const url = getAvatarFriend(friend);
            return (
                <Link key={friend?.id} to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src={url === null ? "/img/high-five.png" : url} alt="User avatar" />
                    <h4 className={styles.friend_name}>{`${friend?.firstName} ${friend?.lastName}`}</h4>
                </Link>
            )
        });
    }

    const getAvatarFriend = async (friend) => {
        try {
            const response = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + friend?.id);
            const img = response.data;
            if (img != null) {
                console.log("get avatar for friend success");
                
                return `data:image/${img?.fileType};base64,${img?.data}`
            } else {
                console.log("get avatar for friend failed");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const renderFriendNull = () => {
        return (
            <span className={styles.not_friend}>Bạn chưa có bạn bè</span>
        )
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Bạn bè</h3>
            <div className={styles.friend_list}>
                { listFriend.length > 0 ? renderFriend() : renderFriendNull() }
            </div>
        </div>
    )
}

export default AllFriend;