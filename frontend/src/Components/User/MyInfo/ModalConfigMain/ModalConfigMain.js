import styles from './ModalConfigMain.module.css';
import ModalAbout from '../ModalAbout/ModalAbout';
import ModalContact from '../ModalContact/ModalContact';
import {useEffect, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';

function ModalConfigMain({userId}) {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const [bio, setBio] = useState();
    const [src, setSrc] = useState('/img/high-five.png');
    const [file, setFile] = useState(null)

    const handlUploadImg = (e) => {
        
        let crurentImg = e.target.files[0]; 
        console.log(crurentImg);
        if(crurentImg) {
            setFile(crurentImg);
            const src = URL.createObjectURL(crurentImg);
            setSrc(src);
        }
        
    }

    const handleSaveAvatar = async(e) => {
        e.preventDefault();
                
        if (file === null) {
            console.log("file null");
            return;            
        };
        
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64data = reader.result.split(',')[1];
            const payload = {
                fileName: file.name,
                fileType: file.type,
                data: base64data,
            };
            
            try {
                await axiosJwt.post("http://localhost:8080/avatar/" + userId, payload);
                                
            } catch (error) {                
                console.log(error);
                
            }
        }
        reader.readAsDataURL(file);
    }

    const getAvatar = async (userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);
            
            const img = res.data?.result;

            setSrc(`data:image/${img?.fileType};base64,${img?.data}`)
        } catch (error) {
            console.log("error: " + error);
            
        }
    }

    useEffect(() => {
        getAvatar(userId, axiosJwt);
    }, [])

    const handleSaveHistory = async (e) => {
        e.preventDefault();
        const request = {
            description: bio,
            userId: userId,
        }
        try {
            const res = await axiosJwt.post('http://localhost:8080/abouts',request)
            if(res.status === 200) {
                console.log('Success');
            } else {
                console.log('Fail');
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="modal fade" id="modal_config_main" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${styles.container}`}>
                    <div className="modal-header">
                        <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Chỉnh sửa thông tin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.avatar}>
                            <form onSubmit={handleSaveAvatar}>
                                <div className='d-flex'>
                                    <h4 className={styles.margin_right}>Ảnh đại diện</h4>
                                    <label htmlFor='uploadImg' className={styles.config_avatar}>Chỉnh sửa</label>
                                    <input type="file" id='uploadImg' name="photo" className={styles.display_none} accept="image/*" onChange={handlUploadImg} />   
                                </div>
                                <img src={src} id='preview' className={styles.img_avatar} alt='img avatar'/>
                                <button type='submit' className={`btn btn-secondary ${styles.btn_save_img}`}>Lưu ảnh</button>
                            </form>
                        </div>
                        <div className={styles.avatar}>
                            <div className='d-flex'>
                                <h4 className={styles.margin_right}>Tiểu sử</h4>
                            </div>
                            <div>
                                <form onSubmit={handleSaveHistory}>
                                    <textarea rows='4' cols='50' onChange={(e) => setBio(e.target.value)} className={styles.history} placeholder='Mô tả về bạn'/> 
                                    <button type='submit' className='btn btn-secondary'>Lưu thay đổi</button>
                                </form>
                            </div> 
                        </div>
                        <div className={styles.avatar}>
                            <div className='d-flex'>
                                <h4 className={styles.margin_right}>Chỉnh sửa phần giới thiệu</h4>
                                <p className={styles.config_about} data-bs-toggle="modal" data-bs-target="#modal_about">Chỉnh sửa</p>
                            </div>
                            <div>
                                <p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Đại học Kinh Doanh và Công Nghệ Hà Nội</p>
                                <p className={styles.text}><img src='/img/myinfo/education-cap.png' alt='phone'className={styles.icon}/> Trường Trung học Phổ Thông A Duy Tiên</p>
                                <p className={styles.text_footer}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Đến Từ Hà Nam</p>
                            </div> 
                        </div>
                        <div className={styles.avatar}>
                            <div className='d-flex'>
                                <h4 className={styles.margin_right}>Chỉnh sửa phần liên hệ</h4>
                                <p className={styles.config_contact} data-bs-toggle="modal" data-bs-target="#modal_contact">Chỉnh sửa</p>
                            </div>
                            <div>
                                <p className={styles.text}><img src='/img/myinfo/phone.png' alt='phone'className={styles.icon}/> 0342232931</p>
                                <p className={styles.text}><img src='/img/myinfo/mail.png' alt='phone'className={styles.icon}/> trinhhaison2004@gmail.com</p>
                                <p className={styles.text_footer}><img src='/img/myinfo/location.png' alt='phone'className={styles.icon}/> Yên Sở - Hoàng Mai - Hà Nội</p>  
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
            <ModalAbout />
            <ModalContact />
        </div>
    )
}

export default ModalConfigMain;