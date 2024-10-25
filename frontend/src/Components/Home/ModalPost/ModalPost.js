import styles from './ModalPost.module.css';
import { useState } from 'react';

function ModalPost() {

    const [imgs, setImgs] = useState([]);

    function handleOnclikFile(e) {
        setImgs(e.target.files);     
    }

    function handleUploadImgs() {

        return [...imgs].map( (img) => (
            <div key={Math.random()}>
                <img src={URL.createObjectURL(img)} alt='...' className={styles.img_style} />
            </div>
        ))
        
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className={`modal fade`} id="modal_post" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog`}>
                <div className={`modal-content ${styles.container}`}>
                    <form onSubmit={handleSubmitForm}>
                        <div className="modal-header">
                            <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Tạo bài viết</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.user_info}>
                                <img src='/img/game-controller.png' alt='...' className={styles.avatar}/>
                                <p className={styles.username}>User name</p>
                            </div>
                            <textarea placeholder='Bạn đang nghĩ gì?' className={styles.textarea_style}></textarea>
                            <div className='d-flex'>
                                {handleUploadImgs()}
                            </div>
                            <div className={styles.add_imgs}>
                                <p>Thêm vào bài viết của bạn</p>
                                <label htmlFor='uploadImgs'>
                                    <img src='/img/post/gallery.png' alt='...' className={styles.icon} />
                                </label>
                                <input type="file" id='uploadImgs' name="photo" className={styles.display_none} multiple accept="image/*" onChange={handleOnclikFile} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className={`btn btn-secondary ${styles.btn_upload}`} data-bs-dismiss="modal">Đăng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalPost;