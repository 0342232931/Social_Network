import styles from './AllFriend.module.css';

function AllFriend() {
    
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Bạn bè</h3>
            <div className={styles.friend_list}>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                    <h4 className={styles.friend_name}>Friend Name</h4>
                </div>
                
            </div>
        </div>
    )
}

export default AllFriend;