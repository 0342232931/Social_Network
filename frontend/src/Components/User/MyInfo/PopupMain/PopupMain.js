import styles from './PopupMain.module.css';

function PopupMain () {
    
    const popup_main = document.getElementById('popup_main');

    const handleMainClose = () => {
        popup_main.style.display = 'none';
    }

    return (
        <div id="popup_main" className={styles.popup}>
                <div className={styles.popup_content_main}>
                    <span onClick={handleMainClose} id="close_popup_main" className={styles.popup}>&times;</span>
                    <p>Đây là nội dung của popup!</p>
                </div>
        </div>
    )

}
export default PopupMain;