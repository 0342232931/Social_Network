import styles from "./ModalPostComment.module.css";

const ModalPostComment = () => {


    const comments = ["Nice Bro", "I know that", "Yes I am", "Haha It's good", "Wow, you is the best", "You very well", "Great", "So strong", "I think that is not the greatest","You know School Boy? I think him can be win. Lala lala lalalala lalala", "You are Winner"];

    return (
        <div className={`modal fade ${styles.container}`} id={`modal_post_comment`} tabIndex="-1" aria-labelledby={`modal_post_comment`} aria-hidden="true">
            <div className={`modal-dialog`}>
                <div className={`modal-content ${styles.background_custom}`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modal_post_comment" style={{color: "aliceblue"}}>Bình luận</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${styles.comment_body}`}>
                        {
                            comments.map((comment) => {
                                return (
                                    <div key={comment} className={styles.comment_container}>
                                        <img src="/img/user.png" alt="..." className={styles.avatar} />
                                        <div className={styles.comment_content_container}>
                                            <p className={styles.username}>John Cameron</p>
                                            <p className={styles.comment_content}>{comment}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="modal-footer">
                        <input type="text" className={styles.comment_input} placeholder="Bạn hãy viết gì đó!"/>
                        <button type="button" className="btn btn-secondary">Đăng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPostComment;