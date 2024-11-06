import { useDispatch, useSelector } from 'react-redux';
import styles from './Image.module.css';
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { useEffect, useState } from 'react';

function Image({userId}) {
    
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth.login?.currentUser);
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const [avatars, setAvatars] = useState([]);
    const [images, setImages] = useState([]);

    const getAvatars = async (userId, axiosJwt) => {
        
        try {
            const response = await axiosJwt.get('http://localhost:8080/avatar/get-all-avatar/' + userId)

            if (response.data != null) {
                setAvatars(response.data?.result);
                
            } else {
                console.log("failed");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    
    }

    const getImages = async (userId, axiosJwt) => {
        try {
            const response = await axiosJwt.get('http://localhost:8080/images/get-images-by-user-id/' + userId)

            if (response.data != null) {
                setImages(response.data?.result);
                
            } else {
                console.log("failed");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    
    }

    useEffect(() => {
        getAvatars(userId, axiosJwt);
        getImages(userId, axiosJwt);
    }, [userId])

    const renderAvatar = () => {
        if (avatars != null) {
            
            return (
                <div className={styles.friend_list}>
                    {
                        avatars.map((avatar) => {
                            const url = `data:image/${avatar.fileType};base64,${avatar.data}`
                            return (
                                <div key={avatar?.id} className={styles.friend_item}>
                                    <img className={styles.friend_avatar} src={ url === null || url === undefined ? "/img/high-five.png" : url } alt="User avatar" />
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <span className={styles.notification}>Không có ảnh nào</span>
            )
        }
    }

    const renderImages = () => {
        if (images != null) {

            return (
                <div className={styles.friend_list}>
                    {
                        images.map((image) => {
                            const url = `data:image/${image.fileType};base64,${image.data}`
                            return (
                                <div key={image?.id} className={styles.friend_item}>
                                    <img className={styles.friend_avatar} src={ url === null || url === undefined ? "/img/high-five.png" : url } alt="User avatar" />
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <span className={styles.notification}>Không có ảnh nào</span>
            )
        }
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Avatar</h3>
            {renderAvatar()}
            <h3 className={styles.title}>Ảnh bài viết</h3>
            {renderImages()}
        </div>
    )
}

export default Image;