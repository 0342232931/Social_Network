import styles from './ListUser.module.css';

function ListUser(){

    const listUser = ["Trịnh Hải Sơn", "Trịnh Hải Lâm", "Trịnh Tâm Đắc", "Phạm Vũ Tú", "Nguyễn Quốc Huy", "Đặng Tuấn Anh", "An Mạnh Hùng", "Nguyễn Hoài Nam", "Trần Thế Lân", "Lê Khánh Hòa", "Vũ Hoàng Đức", "Trương Việt Hùng", "Lê Ngọc An", "Nguyễn Đức Chính", "Trần Công Hải Anh"];

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <img src='/img/Messenger/chat-bubble.png' alt='...' className={styles.navbar_img}/>
                <h3 className={styles.navbar_title}>Danh sách đoạn chat</h3>
            </div>
            <div className={styles.users_container}>
                {
                    listUser.map((username) => {
                        return (
                            <div className={styles.user_element}>
                                <img src='/img/user.png' alt='...' className={styles.user_img}/>
                                <h4 className={styles.user_name}>{username}</h4>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default ListUser;