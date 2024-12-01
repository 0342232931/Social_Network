import styles from './ModalContact.module.css';

function ModalContact() {

    return (
        <div className="modal fade" id="modal_contact" tabIndex="-1" aria-labelledby="modal_contact" aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${styles.container}`}>
                    <form>
                        <div className="modal-header">
                            <h5 className={`modal-title ${styles.title}`} id="modal_contact">Chỉnh sửa chi tiết</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/phone.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Điện Thoại</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" />
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/mail.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Email</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" />
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/location.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Địa Chỉ Thường Trú</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" className="btn btn-primary">Lưu Thay Đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalContact;