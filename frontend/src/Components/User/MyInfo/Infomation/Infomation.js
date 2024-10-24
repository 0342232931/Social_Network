import styles from './Infomation.module.css';
import Image from '../Image/Image';

function Infomation() {
    
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.about_container}>
                    <h3 className={styles.title}>Giới thiệu</h3>
                    <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_about">
                        <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                        Chỉnh sửa chi tiết
                    </button>
                    <div className={styles.about_item}>    
                        <p><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Đại học Kinh Doanh và Công Nghệ Hà Nội</p>
                        <p><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Trung học Phổ Thông A Duy Tiên</p>
                        <p><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến Từ Hà Nam</p>
                        <p><img src='/img/clock.png' alt='phone'className={styles.icon}/> Tham gia vào tháng 3 năm 2019</p>
                    </div>
                </div>
                <div className={styles.about_container}>
                    <h3 className={styles.title}>Liên hệ</h3>
                    <button type="button" className={`btn btn-secondary ${styles.button_config_infomation}`} data-bs-toggle="modal" data-bs-target="#modal_contact">
                        <img src='/img/myinfo/write.png' alt='icon' className={styles.icon} />
                        Chỉnh sửa chi tiết
                    </button>
                    <div className={styles.about_item}>    
                        <p><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> 0342232931</p>
                        <p><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> trinhhaison2004@gmail.com</p>
                        <p><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Yên Sở - Hoàng Mai - Hà Nội</p>
                    </div>
                </div>
            </div> 
            <Image />
        </div>
    )
}

export default Infomation;