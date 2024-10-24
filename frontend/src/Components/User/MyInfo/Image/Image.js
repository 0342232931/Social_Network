import styles from './Image.module.css';

function Image() {
    
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Ảnh của bạn</h3>
            <div className={styles.friend_list}>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                <div className={styles.friend_item}>
                    <img className={styles.friend_avatar} src="/img/high-five.png" alt="User avatar" />
                </div>
                
            </div>
        </div>
    )
}

export default Image;