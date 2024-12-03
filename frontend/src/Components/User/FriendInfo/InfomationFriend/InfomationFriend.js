import styles from './InfomationFriend.module.css';
import Image from '../../MyInfo/Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { useEffect, useState } from 'react';

function InfomationFriend({userId}) {
    
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const [user, setUser]  = useState({});
    // Call Api get User
    const getUserInfo = async(userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/users/" + userId);
            if (res != null) {
                setUser(res.data?.result);
            } else {
                console.log("get user fail");
                
            }
            
        } catch (error) {
            console.log(error.message);
            
        }
    }

    useEffect(() => {
        getUserInfo(userId, axiosJwt);
    }, [userId]);
    
    const renderAboutContainer = () => {
        if (user?.job == null && user?.university == null && user?.highSchool == null && user?.address == null && user?.dob == null) {
            return (
                <div className={styles.about_container}>
                    <h3 className={styles.title}>Giới thiệu</h3>
                    <div className={styles.about_item}>    
                        <p className={styles.text}>Chưa có thông tin</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.about_container}>
                    <h3 className={styles.title}>Giới thiệu</h3>
                    <div className={styles.about_item}>    
                        {user?.job == null ? (<></>) : (<p><img src='/img/myinfo/briefcase.png' alt='phone'className={styles.icon}/> Làm việc tại {user?.job}</p>)}
                        {user?.university == null ? (<></>) : (<p><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> {user?.university}</p>)}
                        {user?.highSchool == null ? (<></>) : (<p><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> {user?.highSchool}</p>)}
                        {user?.address == null ? (<></>) : (<p><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến từ {user?.address}</p>)}
                        {user?.dob == null ? (<></>) : (<p><img src='/img/myinfo/cake.png' alt='phone'className={styles.icon}/> Ngày sinh {user?.dob}</p>)}
                     <p><img src='/img/clock.png' alt='phone'className={styles.icon}/> Tham gia vào tháng 3 năm 2019</p>
                    </div>
                </div>
            )
        }
    }

    const renderContact  = () => {
        if (user?.phoneNumber == null && user?.email == null && user?.hometown == null) {
            return (
                <div className={styles.about_container}>
                    <h3 className={styles.title}>Liên hệ</h3>
                    <div className={styles.about_item}>    
                        <p>Chưa có thông tin</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.about_container}>
                    <h3 className={styles.title}>Liên hệ</h3>
                    <div className={styles.about_item}>    
                        {user?.phoneNumber == null ? (<></>) : (<p><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> {user?.phoneNumber}</p>)}
                        {user?.email == null ? (<></>) : (<p><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> {user?.email}</p>)}
                        {user?.hometown == null ? (<></>) : (<p><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> {user?.hometown}</p>)}
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className={styles.container}>
                {renderAboutContainer()}
                {renderContact()}
            </div> 
            <Image userId={userId}/>
        </div>
    )
}

export default InfomationFriend;