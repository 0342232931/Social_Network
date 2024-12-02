import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalContact.module.css';
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { useState } from 'react';
import { updateUser } from '../../../../redux/apiRequest';

function ModalContact() {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [hometown, setHometown] = useState("");

    const handleSubmitFormContact = (e) => {
        e.preventDefault();

        const request = {
            email: email,
            password: user?.password,
            firstName: user?.firstName,
            lastname: user?.lastName,
            dob: user?.dob,
            address: user?.address,
            hometown: hometown,
            university: user?.university,
            highSchool: user?.highSchool,
            phoneNumber: phoneNumber,
            job: user?.job,
        }

        try {
            updateUser(user?.id, request, dispatch, axiosJwt);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="modal fade" id="modal_contact" tabIndex="-1" aria-labelledby="modal_contact" aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${styles.container}`}>
                    <form onSubmit={handleSubmitFormContact}>
                        <div className="modal-header">
                            <h5 className={`modal-title ${styles.title}`} id="modal_contact">Chỉnh sửa chi tiết</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/phone.png' alt='education' className={styles.icon}/>
                                    <p className={styles.title_input}>Điện Thoại</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/mail.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Email</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/location.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Địa Chỉ Thường Trú</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.hometown} onChange={e => setHometown(e.target.value)} />
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