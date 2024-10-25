import styles from './Friends.module.css';
import NavBar from '../../NavBar/NavBar';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';

function Friends() {
    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.request_container}>
                    <h4 className={styles.title_request_container} >Lời mời kết bạn</h4>
                    <Link className={styles.request_item}>
                        <img src='/img/logo.png' alt='...' className={styles.avatar_request_item} />
                        <h4 className={styles.friend_name_accept} >Trịnh Hải Sơn</h4>
                    </Link>
                    <Link className={styles.request_item}>
                        <img src='/img/logo.png' alt='...' className={styles.avatar_request_item} />
                        <h4 className={styles.friend_name_accept} >Trịnh Hải Sơn</h4>
                    </Link>
                </div>
                <UserInfo />
            </div>
        </div>
    )
}

export default Friends;