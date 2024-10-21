import styles from './PopupAbout.module.css';

function PopupAbout() {

    const popup_about = document.getElementById("popup_about");

    const handleAboutClose = () => {
        popup_about.style.display = 'none';
    }

    return (
        <div id="popup_about" className={styles.popup}>
            <div className={styles.popup_content_about}>
                <span onClick={handleAboutClose} id="close_popup_about" className={styles.close}>&times;</span>
                <p>Đây là nội dung của popup!</p>
            </div>
        </div>
    )
}

export default PopupAbout;