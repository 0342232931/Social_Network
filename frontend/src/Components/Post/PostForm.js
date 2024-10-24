import styles from "./Post.module.css";

function Post({atr}){

    return (
        <div className={styles.container}>
            <div className={styles.header_container}>
                <img className={styles.avatar} src="https://th.bing.com/th/id/OIP.mlrLAYZ6zAd3uigeyf0fnAHaED?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt=""/>
                <div className={styles.header_info_post}>
                    <h3 className={styles.username}><b>Trịnh Hải Sơn</b></h3>
                    <p className={styles.time}> 12 tháng 1 năm 2024 </p>
                </div> 
            </div>
            <span className={styles.content}>Content</span>
            <div className={styles.img_container}>
                <div id={`carouselExampleIndicators${atr}`} className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target={`#carouselExampleIndicators${atr}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target={`#carouselExampleIndicators${atr}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/img/clock.png" className={`d-block w-100 ${styles.img_post}`} alt="/img/clock.png" />
                        </div>
                        <div className="carousel-item">
                            <img src="/img/myinfo/location.png" className={`d-block w-100 ${styles.img_post}`} alt="/img/market.png" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${atr}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${atr}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className={styles.data}>
                    <span className={styles.data_child}>Likes: 100</span>
                    <span className={styles.data_child}>Comments: 50</span>
                </div>
            <div className={styles.line}></div>
            <div className={styles.footer_container}>
                <p className={styles.margin_left}><img className={styles.interact} src="/img/post/heart.png" alt="Love"/>  Like</p>
                <p><img className={styles.interact} src="/img/post/comment.png" alt="comment"/>  Bình luận</p>
                <p className={styles.margin_right}><img className={styles.interact} src="/img/post/send.png" alt="share" />  Chia sẻ</p>
            </div>
        </div>
    )
}

export default Post;