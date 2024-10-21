import styles from './PopupContact.module.css';

function PopupContact() {

    const popup_contact = document.getElementById('popup_contact');

    const handleContactClose = () => {
        popup_contact.style.display = 'none';
    }

    return (
            <div id="popup_contact" className={styles.popup}>
                <div className={styles.popup_content_contact}>
                    <span onClick={handleContactClose} id="close_popup_contact" className={styles.popup}>&times;</span>
                    <p>Đây là nội dung của popup!</p>
                </div>
            </div>
    )
}

export default PopupContact;