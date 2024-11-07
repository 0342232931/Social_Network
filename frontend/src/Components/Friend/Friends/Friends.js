import styles from './Friends.module.css';
import NavBar from '../../NavBar/NavBar';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { useEffect, useState } from 'react';

function Friends() {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);
    
    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const [friends, setFriends] = useState([])
    const [propKey, setPropKey] = useState(null)

    const getFriends = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/relations/get-friends-by-user-id/' + userId);
            if (response != null) {
                console.log("get friends success");
                setFriends(response.data?.result);
            } else {
                console.log("get friends fail");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const renderFriend = () => {
        return friends.map((friend) => {
            const url = getAvatarFriend(friend);
            return (
                <Link key={friend?.id} onClick={setPropKey(friend)} className={styles.request_item}>
                    <img src={url != null ? url : '/img/logo.png'} alt='...' className={styles.avatar_request_item} />
                    <h4 className={styles.friend_name_accept} >{`${friend?.firstName} ${friend?.lastName}`}</h4>
                </Link>
            )
        })
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

    useEffect(() => {
        getFriends(user?.id, axiosJwt);
        renderUserInfo();
    }, [friends]);
    
    const renderUserInfo = () => {
        if (propKey === null) 
            return (<span className={styles.text_center_info}>Hãy chọn 1 người bạn mà bạn muốn xem thông tin</span>)
        return (<UserInfo user={propKey} />)
    }

    const renderNullFriend = () => {
        return (
            <span className={styles.text_center}>Chưa có bạn bè</span>
        )
    }

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.request_container}>
                    <h4 className={styles.title_request_container} >Danh sách bạn bè</h4>
                    {friends.length > 0 ? renderFriend() : renderNullFriend()}
                </div>
                <div className={styles.info_container}>
                    {renderUserInfo()}
                </div>
            </div>  
        </div>
    )
}

export default Friends;