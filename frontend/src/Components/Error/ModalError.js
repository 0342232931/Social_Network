import styles from './ModalError.module.css';

function ModalError({ message }) {
    return (
        <div className={styles.notification}>
            <div className={styles.notification_header}>
                <h3 className={styles.notification_title}>New notification</h3>
                <i className={`fa fa-times ${styles.notification_close}`}></i>
            </div>
            <div className={styles.notification_container}>
                <div className={styles.notification_media}>
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" className={styles.notification_user_avatar} />
                    <i className={`fa fa-thumbs-up ${styles.notification_reaction}`}></i>
                </div>
                <div className={styles.notification_content}>
                    <p className={styles.notification_text}>
                    <strong>evondev</strong>, <strong>Trần Anh Tuấn</strong> and 154 others react to your post in <strong>Cộng đồng Frontend Việt Nam</strong>
                    </p>
                    <span className={styles.notification_timer}>a few seconds ago</span>
                </div>
                <span className={styles.notification_status}></span>
            </div>
        </div>
    )
}

export default ModalError;