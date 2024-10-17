import styles from "./Post.module.css";

function Post(){

    return (
        <div className={styles.container}>
            <div className={styles.header_container}>
                <img className={styles.avatar} src="https://th.bing.com/th/id/OIP.mlrLAYZ6zAd3uigeyf0fnAHaED?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt=""/>
                <h3 className={styles.username}><b>Trinh Hai Son</b></h3>
            </div>
            <div className={styles.line}></div>
            <span className={styles.content}>Content</span>
            <div className={styles.img_container}>
                <img className={styles.img_post} src="https://th.bing.com/th/id/OIP.mlrLAYZ6zAd3uigeyf0fnAHaED?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt=""/>
            </div>
            <div className={styles.data}>
                    <span className={styles.data_child}>Likes: 100</span>
                    <span className={styles.data_child}>Comments: 50</span>
                </div>
            <div className={styles.line}></div>
            <div className={styles.footer_container}>
                <p className={styles.margin_left}><img className={styles.interact} src="https://i.pinimg.com/736x/87/0e/0c/870e0c4a9cfeb6753b4cc55aae75017b.jpg" alt="Love"/> Love</p>
                <p className={styles.line_col}></p>
                <p className={styles.text_color}><img className={styles.interact} src="https://th.bing.com/th/id/R.3dccc725a944d4176c522a426e71d4f3?rik=OqEBQyNPdxZpEQ&pid=ImgRaw&r=0" alt="comment"/> Comments</p>
                <p className={styles.line_col}></p>
                <p className={styles.margin_right}><img className={styles.interact} alt="share" src="https://www.freepnglogos.com/uploads/share-png/arrow-invite-join-share-sharing-icon-15.png" /> Share</p>
            </div>
        </div>
    )
}

export default Post;