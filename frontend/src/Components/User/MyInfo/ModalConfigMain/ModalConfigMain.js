import styles from './ModalConfigMain.module.css';

function ModalConfigMain() {

    return (
        <div className="modal fade" id="modal_config_main" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${styles.container}`}>
                    <div className="modal-header">
                        <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Chỉnh sửa thông tin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        asdvlndsga
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary">Lưu Thay Đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfigMain;