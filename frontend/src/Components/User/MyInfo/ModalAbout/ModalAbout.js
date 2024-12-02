import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalAbout.module.css';
import { useState } from 'react';
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { updateUser } from '../../../../redux/apiRequest';

function ModalAbout() {
    
    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);

    const [job, setJob] = useState('');
    const [university, setUniversity] = useState('');
    const [highSchool, setHighSchool] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const request = {
            email: user?.email,
            password: user?.password,
            firstName: user?.firstName,
            lastname: user?.lastName,
            dob: birthday,
            address: address,
            hometown: user?.hometown,
            university: university,
            highSchool: highSchool,
            phoneNumber: user?.phoneNumber,
            job: job,
        }

        try {
            updateUser(user?.id, request, dispatch, axiosJwt);
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className={`modal fade`} id="modal_about" tabIndex="-1" aria-labelledby="modal_about" aria-hidden="true">
            <div className={`modal-dialog`}>
                <div className={`modal-content ${styles.container}`}>
                    <form onSubmit={handleSubmitForm}>
                        <div className="modal-header">
                            <h5 className={`modal-title ${styles.title}`} id="modal_about">Chỉnh sửa chi tiết</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/briefcase.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Công việc</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.job} onChange={e => setJob(e.target.value)}/>
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/education-cap.png' alt='education' className={styles.icon}/>
                                    <p className={styles.title_input}>Trường Đại Học</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.university} onChange={e => setUniversity(e.target.value)}/>
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/education-cap.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Trường Trung Học</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.highSchool} onChange={e => setHighSchool(e.target.value)}/>
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/location.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Quê Quán</p>
                                </div>
                                <input className="form-control" type="text" aria-label="default input example" value={user?.address} onChange={e => setAddress(e.target.value)}/>
                            </div>
                            <div className={styles.margin_top}>
                                <div className="d-flex">
                                    <img src='/img/myinfo/cake.png' alt='education' className={styles.icon} />
                                    <p className={styles.title_input}>Ngày sinh</p>
                                </div>
                                <input className="form-control" type="date" aria-label="default input example" value={user?.dob} onChange={e => setBirthday(e.target.value)}/>
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

export default ModalAbout;