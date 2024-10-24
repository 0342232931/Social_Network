import styles from './AllFriend.module.css';
import { Link } from 'react-router-dom'

function AllFriend() {
    
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Bạn bè</h3>
            <div className={styles.friend_list}>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
                <Link to="/friend-info" className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </Link>
            </div>
        </div>
    )
}

export default AllFriend;