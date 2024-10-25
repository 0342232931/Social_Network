import styles from './FriendRequest.module.css';
import NavBar from '../../NavBar/NavBar';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';

function FriendRequest() {
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.request_container}>
                    <h4 className={styles.title_request_container} >Lời mời kết bạn</h4>
                    <Link className={styles.request_item}>
                        <img src='/img/logo.png' alt='...' className={styles.avatar_request_item} />
                        <div>
                            <h4 className={styles.friend_name_accept} >Trịnh Hải Sơn</h4>
                            <div className={styles.btn_accept}>
                                <button type='button' className={`btn btn-primary ${styles.btn}`}>Xác nhận</button>
                                <button type='button' className={`btn btn-secondary ${styles.btn}`}>Xóa</button>
                            </div>
                        </div>
                    </Link>
                    <Link className={styles.request_item}>
                        <img src='/img/logo.png' alt='...' className={styles.avatar_request_item} />
                        <div>
                            <h4 className={styles.friend_name_accept} >Trịnh Hải Sơn</h4>
                            <div className={styles.btn_accept}>
                                <button type='button' className={`btn btn-primary ${styles.btn}`}>Xác nhận</button>
                                <button type='button' className={`btn btn-secondary ${styles.btn}`}>Xóa</button>
                            </div>
                        </div>
                    </Link>
                </div>
                <UserInfo />
            </div>
        </div>
    )
}

export default FriendRequest;