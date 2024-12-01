import { useDispatch, useSelector } from 'react-redux';
import styles from './ListUser.module.css';
import { createAxios } from '../../../createInstance';
import { useEffect, useState } from 'react';
import { loginSuccess } from '../../../redux/authSlice';

function ListUser({dataUsers, onSelectUser}){
    
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const [userReponse, setUserReponse] = useState([]);
    const [keyword , setKeyword] = useState('');

    useEffect(() => {
        if (dataUsers != null) {
            userSetAvatar(axiosJwt);
        }
        
    }, [dataUsers])

    const userSetAvatar = async (axiosJwt) => {
        const usersSetAvatarChild = await Promise.all(
            dataUsers?.map(async (user) => {
                try {
                    const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + user?.id);
                    const img = res.data?.result;
                    return {...user, avatarUrl: `data:image/${img.fileType};base64,${img?.data}`};
                } catch (error) {
                    console.log(error);
                    return {...user, avatarUrl: null}
                }
            })
        );  
        setUserReponse(usersSetAvatarChild);
    }

    const searchUsers = async (axiosJwt, keyword) => {
        try {
            
            const res = await axiosJwt.get("http://localhost:8080/users/search-user/" + keyword)
            
            let users = res.data?.result;

            const updatedUsers = await Promise.all(
                users?.map(async (user) => {
                    try {
                        const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + user?.id);
                        const img = res.data?.result;
                        return {...user, avatarUrl: `data:image/${img.fileType};base64,${img?.data}`};
                    } catch (error) {
                        console.log(error);
                        return {...user, avatarUrl: null}
                    }
                })
            );  
            setKeyword('');
            setUserReponse(updatedUsers);

        } catch (error) {
            console.log(error);
        }
    }

    const handleClickSeacrchUsers = () => {
        searchUsers(axiosJwt, keyword);
    }

    const handleSelectUser = (user) => {
        onSelectUser(user);
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <img src='/img/Messenger/chat-bubble.png' alt='...' className={styles.navbar_img}/>
                <h3 className={styles.navbar_title}>Danh sách đoạn chat</h3>
            </div>
            <div className={styles.search_container}>
                <input className={styles.search_input} type='text' placeholder="Tìm kiếm" onChange={e => setKeyword(e.target.value)}/>
                <div className={styles.btn_search_container} onClick={handleClickSeacrchUsers}>
                    <img src='/img/Messenger/search.png' alt='...' className={styles.search_icon}/>
                </div>
            </div>
            <div className={styles.users_container}>
                {
                    userReponse.map((user) => {
                        return (
                            <div key={user?.id} className={styles.user_element} onClick={() => handleSelectUser(user)}>
                                <img src={user?.avatarUrl != null ? user?.avatarUrl : `/img/user.png`} alt='...' className={styles.user_img}/>
                                <h4 className={styles.user_name}>{`${user?.firstName} ${user?.lastName}`}</h4>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ListUser;